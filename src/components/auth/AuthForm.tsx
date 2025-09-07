import { useState } from "react"
import { Link } from "react-router-dom"
import { Eye, EyeOff, Mail, Lock, User, Brain } from "lucide-react"
import { NeuralButton } from "@/components/ui/neural-button"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface AuthFormProps {
  mode: 'login' | 'register'
  onSubmit: (data: AuthFormData) => void
  loading?: boolean
}

interface AuthFormData {
  email: string
  password: string
  name?: string
}

export function AuthForm({ mode, onSubmit, loading = false }: AuthFormProps) {
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
    name: mode === 'register' ? '' : undefined
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleInputChange = (field: keyof AuthFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
  }

  const isLogin = mode === 'login'
  const title = isLogin ? 'Welcome Back' : 'Create Account'
  const description = isLogin 
    ? 'Sign in to your NeuroCode Studio account' 
    : 'Join thousands of developers building with AI'
  const submitText = isLogin ? 'Sign In' : 'Create Account'
  const switchText = isLogin ? "Don't have an account?" : 'Already have an account?'
  const switchLink = isLogin ? '/register' : '/login'
  const switchLinkText = isLogin ? 'Sign up' : 'Sign in'

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-background p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      </div>

      <Card className="w-full max-w-md relative z-10 bg-gradient-card border-border/50 shadow-neural">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto p-3 rounded-lg bg-neural shadow-glow w-fit">
            <Brain className="h-8 w-8 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">{title}</CardTitle>
            <CardDescription className="text-muted-foreground mt-2">
              {description}
            </CardDescription>
          </div>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    className="pl-10"
                    value={formData.name || ''}
                    onChange={handleInputChange('name')}
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="pl-10 pr-10"
                  value={formData.password}
                  onChange={handleInputChange('password')}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div className="p-4 rounded-lg bg-neural-subtle border border-primary/20">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <span className="text-primary font-medium">
                    Get 5 free credits upon registration!
                  </span>
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <NeuralButton 
              type="submit" 
              variant="neural" 
              size="lg" 
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Processing...' : submitText}
            </NeuralButton>

            <div className="text-center text-sm text-muted-foreground">
              {switchText}{' '}
              <Link 
                to={switchLink} 
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                {switchLinkText}
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}