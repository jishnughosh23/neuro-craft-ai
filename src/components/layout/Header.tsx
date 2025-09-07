import { useState } from "react"
import { Link } from "react-router-dom"
import { Brain, Menu, X, User, LogOut } from "lucide-react"
import { NeuralButton } from "@/components/ui/neural-button"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface HeaderProps {
  user?: {
    name: string
    email: string
    credits: number
  }
  onSignOut?: () => void
}

export function Header({ user, onSignOut }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="p-1 rounded-lg bg-neural shadow-glow group-hover:animate-glow">
            <Brain className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold bg-neural bg-clip-text text-transparent">
            NeuroCode Studio
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/features" className="text-muted-foreground hover:text-primary transition-colors">
            Features
          </Link>
          <Link to="/pricing" className="text-muted-foreground hover:text-primary transition-colors">
            Pricing
          </Link>
          <Link to="/docs" className="text-muted-foreground hover:text-primary transition-colors">
            Docs
          </Link>
        </nav>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <div className="hidden md:flex items-center space-x-3">
                <div className="px-3 py-1 rounded-full bg-neural-subtle border border-primary/20">
                  <span className="text-sm font-medium text-primary">
                    {user.credits} credits
                  </span>
                </div>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5 text-sm">
                    <div className="font-medium">{user.name}</div>
                    <div className="text-muted-foreground">{user.email}</div>
                  </div>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/register">
                <NeuralButton variant="neural">Get Started</NeuralButton>
              </Link>
            </>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card/95 backdrop-blur-xl">
          <nav className="container mx-auto px-4 py-4 space-y-3">
            <Link
              to="/features"
              className="block py-2 text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              to="/pricing"
              className="block py-2 text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              to="/docs"
              className="block py-2 text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Docs
            </Link>
            {user && (
              <div className="pt-2 border-t border-border">
                <div className="text-sm text-muted-foreground">
                  {user.credits} credits remaining
                </div>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}