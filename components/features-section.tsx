import { Shield, Eye, Database, Scale, Lock, FileWarning } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: Shield,
    title: "Ethical OSINT",
    description: "We only access publicly available information that users have voluntarily shared.",
  },
  {
    icon: Eye,
    title: "Public Data Only",
    description: "No private API access, no scraping of private accounts, no hidden data retrieval.",
  },
  {
    icon: Database,
    title: "Open Source Intel",
    description: "Data sourced from public Telegram profiles, channels, and open groups.",
  },
  {
    icon: Scale,
    title: "GDPR Compliant",
    description: "Designed with privacy regulations in mind. Request data removal anytime.",
  },
  {
    icon: Lock,
    title: "No Hacking",
    description: "We never bypass privacy settings or attempt to access restricted content.",
  },
  {
    icon: FileWarning,
    title: "No Guarantees",
    description: "Data shown may be incomplete or outdated. Always verify independently.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-16 px-4 bg-secondary/20 border-t border-border/50">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold font-mono text-foreground mb-2">
            How We <span className="text-primary">Operate</span>
          </h2>
          <p className="text-muted-foreground font-mono text-sm">Transparency and ethics are core to our platform</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, i) => (
            <Card key={i} className="bg-card border-border hover:border-primary/50 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-mono flex items-center gap-2 text-foreground">
                  <feature.icon className="h-5 w-5 text-primary" />
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground font-mono leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
