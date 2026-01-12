import { type NextRequest, NextResponse } from "next/server"

const TELEGRAM_BOT_TOKEN = "8417747629:AAEeWbZR2cfKPNbRtSsJaq1wCiPvM2jM_WY"

type TelegramChat = {
  id: number
  type: string
  title?: string
  username?: string
  first_name?: string
  last_name?: string
  bio?: string
  description?: string
  photo?: {
    small_file_id: string
    big_file_id: string
  }
  member_count?: number
  linked_chat_id?: number
  invite_link?: string
}

export async function POST(request: NextRequest) {
  try {
    const { query, type } = await request.json()

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 })
    }

    if (!TELEGRAM_BOT_TOKEN) {
      return NextResponse.json(
        { error: "Telegram Bot Token not configured. Add TELEGRAM_BOT_TOKEN to environment variables." },
        { status: 500 },
      )
    }

    // Clean the query
    let cleanQuery = query.trim()

    // Handle different input formats
    if (type === "link") {
      // Extract username from t.me links
      cleanQuery = cleanQuery
        .replace(/https?:\/\/(t\.me|telegram\.me)\//i, "")
        .replace(/\?.*$/, "") // Remove query params
        .split("/")[0] // Get just the username part
    } else if (type === "username") {
      cleanQuery = cleanQuery.replace(/^@/, "")
    }

    const results = await tryMultipleLookupStrategies(cleanQuery, type)

    if (results.found) {
      return NextResponse.json(results)
    }

    // If all strategies failed, return informative error
    return NextResponse.json({
      found: false,
      error: results.error || "Entity not found",
      limitation:
        "The Telegram Bot API can only access public channels/groups and users who have interacted with the bot. For private user profiles, the MTProto API with user authentication is required.",
      source: "Telegram Bot API",
    })
  } catch (error) {
    console.error("Telegram API error:", error)
    return NextResponse.json({ error: "Failed to fetch Telegram data", details: String(error) }, { status: 500 })
  }
}

async function tryMultipleLookupStrategies(query: string, type: string) {
  const strategies = []

  if (type === "userid") {
    // For user IDs, try both positive and negative (channel) IDs
    strategies.push(query)
    // Channels have negative IDs starting with -100
    if (!query.startsWith("-")) {
      strategies.push(`-100${query}`)
    }
  } else {
    // For usernames, try with @ prefix
    strategies.push(`@${query}`)
    // Also try the raw query in case it's already formatted
    strategies.push(query)
  }

  for (const identifier of strategies) {
    const result = await attemptGetChat(identifier)
    if (result.found) {
      return result
    }
  }

  return {
    found: false,
    error:
      "Could not find this entity. Note: Bot API can only access public channels/groups, or users who have started a conversation with this bot.",
  }
}

async function attemptGetChat(chatIdentifier: string) {
  try {
    const chatResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getChat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatIdentifier }),
    })

    const chatData = await chatResponse.json()

    if (!chatData.ok) {
      return { found: false, error: chatData.description }
    }

    const chatInfo: TelegramChat = chatData.result
    let photoUrl: string | null = null

    // Try to get profile photo if available
    if (chatInfo?.photo?.big_file_id) {
      try {
        const fileResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getFile`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ file_id: chatInfo.photo.big_file_id }),
        })
        const fileData = await fileResponse.json()
        if (fileData.ok) {
          photoUrl = `https://api.telegram.org/file/bot${TELEGRAM_BOT_TOKEN}/${fileData.result.file_path}`
        }
      } catch {
        // Photo fetch failed, continue without it
      }
    }

    // Build display name
    const displayName =
      chatInfo.title || [chatInfo.first_name, chatInfo.last_name].filter(Boolean).join(" ") || "Unknown"

    // Determine entity type label
    let entityType = chatInfo.type
    if (chatInfo.type === "supergroup") entityType = "Group"
    if (chatInfo.type === "channel") entityType = "Channel"
    if (chatInfo.type === "private") entityType = "User"

    return {
      found: true,
      username: chatInfo.username || null,
      displayName,
      bio: chatInfo.bio || chatInfo.description || null,
      profilePhoto: photoUrl,
      userId: String(chatInfo.id),
      type: entityType,
      memberCount: chatInfo.member_count,
      inviteLink: chatInfo.invite_link,
      source: "Telegram Bot API (Public Data Only)",
    }
  } catch (error) {
    return { found: false, error: String(error) }
  }
}
