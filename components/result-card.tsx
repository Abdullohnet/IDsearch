import { User, AtSign, Hash, MessageSquare, Clock, Database, AlertCircle, Crown, Globe } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type ResultCardProps = {
  result: {
    username?: string
    displayName?: string
    bio?: string
    profilePhoto?: string
    userId?: string
    type?: string
    isPremium?: boolean
    publicGroups?: string[]
    lastSeen?: string
    source: string
  }
}

export function ResultCard({ result }: ResultCardProps) {
  const getTypeBadge = () => {
    switch (result.type) {
      case "private":
        return (
          <Badge variant="secondary" className="font-mono text-xs">
            User
          </Badge>
        )
      case "channel":
        return (
          <Badge variant="secondary" className="font-mono text-xs border-blue-500/50 text-blue-400">
            Channel
          </Badge>
        )
      case "supergroup":
      case "group":
        return (
          <Badge variant="secondary" className="font-mono text-xs border-green-500/50 text-green-400">
            Group
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <Card className="bg-card border-border glow-green overflow-hidden">
      <CardHeader className="border-b border-border bg-secondary/30">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-mono flex items-center gap-2 text-foreground">
            <Database className="h-4 w-4 text-accent" />
            SCAN RESULTS
          </CardTitle>
          <div className="flex items-center gap-2">
            {getTypeBadge()}
            <Badge variant="outline" className="font-mono text-xs border-accent text-accent">
              PUBLIC DATA
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile Photo */}
          <div className="shrink-0">
            <Avatar className="h-24 w-24 border-2 border-primary/30">
              <AvatarImage
                src={result.profilePhoto || "/placeholder.svg?height=96&width=96&query=user avatar"}
                alt={result.displayName}
              />
              <AvatarFallback className="bg-secondary text-foreground font-mono text-2xl">
                {result.displayName?.[0] || "?"}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Profile Info */}
          <div className="flex-1 space-y-4">
            {/* Name & Username */}
            <div>
              <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                {result.displayName || "Unknown"}
                {result.isPremium && <Crown className="h-4 w-4 text-yellow-500" title="Telegram Premium" />}
              </h3>
              {result.username && (
                <p className="text-muted-foreground font-mono text-sm flex items-center gap-1 mt-1">
                  <AtSign className="h-3 w-3" />
                  {result.username}
                </p>
              )}
            </div>

            {/* Data Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {result.userId && (
                <div className="bg-secondary/50 rounded-md p-3 border border-border">
                  <div className="text-xs text-muted-foreground font-mono flex items-center gap-1 mb-1">
                    <Hash className="h-3 w-3" />
                    {result.type === "channel" || result.type === "supergroup" ? "CHAT ID" : "USER ID"}
                  </div>
                  <div className="text-sm font-mono text-foreground">{result.userId}</div>
                </div>
              )}

              {result.type && (
                <div className="bg-secondary/50 rounded-md p-3 border border-border">
                  <div className="text-xs text-muted-foreground font-mono flex items-center gap-1 mb-1">
                    <Globe className="h-3 w-3" />
                    ENTITY TYPE
                  </div>
                  <div className="text-sm font-mono text-foreground capitalize">{result.type}</div>
                </div>
              )}

              {result.lastSeen && (
                <div className="bg-secondary/50 rounded-md p-3 border border-border">
                  <div className="text-xs text-muted-foreground font-mono flex items-center gap-1 mb-1">
                    <Clock className="h-3 w-3" />
                    LAST SEEN
                  </div>
                  <div className="text-sm font-mono text-foreground">{result.lastSeen}</div>
                </div>
              )}
            </div>

            {/* Bio */}
            {result.bio && (
              <div className="bg-secondary/50 rounded-md p-3 border border-border">
                <div className="text-xs text-muted-foreground font-mono flex items-center gap-1 mb-1">
                  <MessageSquare className="h-3 w-3" />
                  {result.type === "channel" || result.type === "supergroup" ? "DESCRIPTION" : "BIO"}
                </div>
                <div className="text-sm text-foreground whitespace-pre-wrap">{result.bio}</div>
              </div>
            )}

            {/* Public Groups - only for users */}
            {result.publicGroups && result.publicGroups.length > 0 && (
              <div className="bg-secondary/50 rounded-md p-3 border border-border">
                <div className="text-xs text-muted-foreground font-mono flex items-center gap-1 mb-2">
                  <Globe className="h-3 w-3" />
                  PUBLIC GROUP PARTICIPATION
                </div>
                <div className="flex flex-wrap gap-2">
                  {result.publicGroups.map((group, i) => (
                    <Badge key={i} variant="secondary" className="font-mono text-xs">
                      {group}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Source & Disclaimer */}
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-start gap-2 text-xs text-muted-foreground font-mono">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <div>
              <span className="text-foreground">Data Source:</span> {result.source}
              <br />
              <span className="text-yellow-500/80">
                This information is publicly available via the Telegram Bot API. Only data that users have chosen to
                make public is displayed. We do not access private information.
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
