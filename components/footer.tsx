import Link from "next/link"
import { Github } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} MultiApp. All rights reserved.</p>
        </div>
        <div className="flex items-center space-x-6">
          <Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground">
            Documentation
          </Link>
          <Link
            href="https://github.com/yourusername/multi-feature-app"
            className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
          >
            <Github size={16} />
            <span>GitHub</span>
          </Link>
          <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  )
}

