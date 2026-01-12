"use client"

import { useState } from "react"
import { Search, AtSign, Hash, Link2, Loader2, AlertTriangle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResultCard } from "@/components/result-card"
import { NoResultsCard } from "@/components/no-results-card"
import { Alert, AlertDescription } from "@/components/ui/alert"

type SearchType = "username" | "userid" | "link"
type SearchResult = {
  found: boolean
  username?: string
  displayName?: string
  bio?: string
  profilePhoto?: string
  userId?: string
  type?: string
  isPremium?: boolean
  memberCount?: number
  inviteLink?: string
  source: string
  error?: string
  limitation?: string
}

export function SearchSection() {
  const [searchType, setSearchType] = useState<SearchType>("username")
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [result, setResult] = useState<SearchResult | null>(null)
  const [hasSearched, setHasSearched] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  const handleSearch = async () => {
    if (!query.trim()) return

    setIsSearching(true)
    setHasSearched(true)
    setApiError(null)

    try {
      const response = await fetch("/api/telegram/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, type: searchType }),
      })

      const data = await response.json()

      if (!response.ok) {
        setApiError(data.error || "Failed to fetch data")
        setResult(null)
      } else {
        setResult(data)
      }
    } catch (error) {
      setApiError("Network error. Please try again.")
      setResult(null)
    }

    setIsSearching(false)
  }

  const getPlaceholder = () => {
    switch (searchType) {
      case "username":
        return "@username or username"
      case "userid":
        return "User ID (numbers only)"
      case "link":
        return "https://t.me/username"
    }
  }

  const getIcon = () => {
    switch (searchType) {
      case "username":
        return <AtSign className="h-4 w-4" />
      case "userid":
        return <Hash className="h-4 w-4" />
      case "link":
        return <Link2 className="h-4 w-4" />
    }
  }

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Hero Text */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono mb-6">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            SYSTEM ONLINE
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-mono mb-4 text-foreground">
            Public Telegram
            <br />
            <span className="text-primary text-glow">Intelligence Lookup</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto font-mono text-sm">
            Search publicly available Telegram data. Only lawful, ethical, and publicly accessible information is
            displayed.
          </p>
        </div>

        <Alert className="mb-6 border-primary/30 bg-primary/5">
          <Info className="h-4 w-4 text-primary" />
          <AlertDescription className="font-mono text-xs text-muted-foreground">
            <strong className="text-primary">Bot API Limitation:</strong> Can only lookup public channels, groups, and
            bots. Private user profiles require user-level API access. Try searching for public channels like{" "}
            <button
              onClick={() => {
                setQuery("telegram")
                setSearchType("username")
              }}
              className="text-primary underline hover:no-underline"
            >
              @telegram
            </button>{" "}
            or{" "}
            <button
              onClick={() => {
                setQuery("durov")
                setSearchType("username")
              }}
              className="text-primary underline hover:no-underline"
            >
              @durov
            </button>
            .
          </AlertDescription>
        </Alert>

        {/* Search Interface */}
        <div className="bg-card border border-border rounded-lg p-6 glow-cyan relative overflow-hidden scanlines">
          <div className="relative z-10">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-destructive/70" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
                <div className="h-3 w-3 rounded-full bg-accent/70" />
              </div>
              <span className="text-xs text-muted-foreground font-mono ml-2">
                telescope_osint v1.0.0 — query interface
              </span>
            </div>

            {/* Search Type Tabs */}
            <Tabs value={searchType} onValueChange={(v) => setSearchType(v as SearchType)} className="mb-6">
              <TabsList className="bg-secondary/50 border border-border">
                <TabsTrigger
                  value="username"
                  className="font-mono text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <AtSign className="h-3 w-3 mr-1" />
                  Username
                </TabsTrigger>
                <TabsTrigger
                  value="userid"
                  className="font-mono text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Hash className="h-3 w-3 mr-1" />
                  User ID
                </TabsTrigger>
                <TabsTrigger
                  value="link"
                  className="font-mono text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Link2 className="h-3 w-3 mr-1" />
                  Profile Link
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Search Input */}
            <div className="flex gap-3">
              <div className="relative flex-1">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{getIcon()}</div>
                <Input
                  type="text"
                  placeholder={getPlaceholder()}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="pl-10 font-mono bg-input border-border text-foreground placeholder:text-muted-foreground h-12"
                />
              </div>
              <Button
                onClick={handleSearch}
                disabled={isSearching || !query.trim()}
                className="h-12 px-6 font-mono bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isSearching ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    SCAN
                  </>
                )}
              </Button>
            </div>

            {/* Command Line Hint */}
            <div className="mt-4 text-xs text-muted-foreground font-mono">
              <span className="text-accent">$</span> Enter a public Telegram identifier to begin scan
              <span className="cursor-blink text-primary">_</span>
            </div>
          </div>
        </div>

        {/* API Error Alert */}
        {apiError && (
          <Alert variant="destructive" className="mt-6 border-destructive/50 bg-destructive/10">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="font-mono text-sm">{apiError}</AlertDescription>
          </Alert>
        )}

        {/* Results */}
        {hasSearched && !isSearching && !apiError && (
          <div className="mt-8">
            {result?.found ? (
              <ResultCard result={result} />
            ) : (
              <NoResultsCard query={query} limitation={result?.limitation} error={result?.error} />
            )}
          </div>
        )}
      </div>
    </section>
  )
}
