import { Shield, Terminal } from "lucide-react"

export function Header() {
  return (
    <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Terminal className="h-8 w-8 text-primary" />
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-accent rounded-full animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-mono tracking-tight text-foreground">
                TeleScope<span className="text-primary">_</span>OSINT
              </h1>
              <p className="text-xs text-muted-foreground font-mono">Public Intelligence Lookup</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <Shield className="h-4 w-4 text-accent" />
            <span>Ethical OSINT Only</span>
          </div>
        </div>
      </div>
    </header>
  )
}
