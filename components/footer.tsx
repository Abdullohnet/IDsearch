import { Terminal, Mail, FileText, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 py-8">
        {/* Data Removal Notice */}
        <div className="bg-secondary/50 border border-border rounded-lg p-4 mb-8">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
            <div className="text-sm font-mono">
              <span className="text-foreground font-medium">Data Removal Request:</span>{" "}
              <span className="text-muted-foreground">
                If you find your information displayed here and wish to have it removed, please contact us. We respect
                your privacy rights under GDPR and similar regulations.
              </span>
              <Button variant="link" className="text-primary h-auto p-0 ml-1 font-mono text-sm">
                <Mail className="h-3 w-3 mr-1" />
                Request Removal
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Terminal className="h-5 w-5 text-primary" />
            <span className="font-mono text-sm text-foreground">
              TeleScope<span className="text-primary">_</span>OSINT
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs text-muted-foreground font-mono">
            <a href="#" className="hover:text-foreground transition-colors flex items-center gap-1">
              <FileText className="h-3 w-3" />
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground transition-colors flex items-center gap-1">
              <FileText className="h-3 w-3" />
              Terms of Service
            </a>
            <a href="#" className="hover:text-foreground transition-colors flex items-center gap-1">
              <Mail className="h-3 w-3" />
              Contact
            </a>
          </div>

          <div className="text-xs text-muted-foreground font-mono">
            © 2026 TeleScope OSINT. For educational purposes.
          </div>
        </div>
      </div>
    </footer>
  )
}
