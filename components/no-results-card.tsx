import { SearchX, Info, AlertCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

type NoResultsCardProps = {
  query: string
  limitation?: string
  error?: string
}

export function NoResultsCard({ query, limitation, error }: NoResultsCardProps) {
  return (
    <Card className="bg-card border-border">
      <CardContent className="p-8 text-center">
        <SearchX className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-mono font-bold text-foreground mb-2">No Public Data Found</h3>
        <p className="text-muted-foreground font-mono text-sm max-w-md mx-auto mb-4">
          No publicly available information was found for "<span className="text-primary">{query}</span>".
        </p>

        {error && (
          <div className="flex items-start gap-2 text-xs text-destructive font-mono bg-destructive/10 border border-destructive/20 rounded-md p-3 max-w-md mx-auto mb-4">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span className="text-left">{error}</span>
          </div>
        )}

        {limitation && (
          <div className="flex items-start gap-2 text-xs text-yellow-500 font-mono bg-yellow-500/10 border border-yellow-500/20 rounded-md p-3 max-w-md mx-auto mb-4">
            <Info className="h-4 w-4 shrink-0 mt-0.5" />
            <span className="text-left">{limitation}</span>
          </div>
        )}

        <div className="flex items-start gap-2 text-xs text-muted-foreground font-mono bg-secondary/50 rounded-md p-3 max-w-md mx-auto">
          <Info className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
          <span className="text-left">
            <strong className="text-foreground">What works:</strong> Public channels (e.g., @telegram), public groups,
            and bots.
            <br />
            <strong className="text-foreground">What doesn't:</strong> Private user accounts require user-level MTProto
            API authentication, which is not available through the Bot API.
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
