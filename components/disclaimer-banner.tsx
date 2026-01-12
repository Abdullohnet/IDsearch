import { Info } from "lucide-react"

export function DisclaimerBanner() {
  return (
    <div className="bg-secondary/50 border-b border-border/50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div className="text-sm text-muted-foreground font-mono">
            <span className="text-foreground font-medium">Legal Notice:</span> This platform only accesses publicly
            available Telegram data. We do not access private APIs, scrape private accounts, or retrieve hidden
            information. All data shown is voluntarily shared by users in public spaces.
          </div>
        </div>
      </div>
    </div>
  )
}
