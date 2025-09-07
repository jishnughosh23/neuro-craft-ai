import { ArrowRight, Sparkles, Zap, Code } from "lucide-react"
import { NeuralButton } from "@/components/ui/neural-button"
import { Button } from "@/components/ui/button"
import heroImage from "@/assets/hero-neural.jpg"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-background">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute top-40 right-20 w-48 h-48 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-32 left-1/3 w-24 h-24 bg-primary/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-neural-subtle border border-primary/20 rounded-full px-4 py-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Website Generation</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Build{" "}
            <span className="bg-neural bg-clip-text text-transparent animate-glow">
              Stunning Websites
            </span>{" "}
            with AI
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Transform your ideas into beautiful, functional websites in seconds. 
            Just describe what you want, and our AI will build it for you.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <NeuralButton variant="neural" size="lg" className="group">
              Start Building Free
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </NeuralButton>
            <Button variant="outline" size="lg" className="group">
              Watch Demo
              <Zap className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 max-w-3xl mx-auto">
            <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-lg bg-gradient-card border border-border/50">
              <div className="p-3 rounded-lg bg-neural shadow-glow">
                <Code className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold">AI Generation</h3>
              <p className="text-sm text-muted-foreground">
                Advanced AI creates pixel-perfect websites from your prompts
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-lg bg-gradient-card border border-border/50">
              <div className="p-3 rounded-lg bg-accent shadow-accent">
                <Zap className="h-6 w-6 text-accent-foreground" />
              </div>
              <h3 className="font-semibold">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground">
                Get production-ready websites in under 30 seconds
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-lg bg-gradient-card border border-border/50">
              <div className="p-3 rounded-lg bg-primary shadow-glow">
                <Sparkles className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold">5 Free Credits</h3>
              <p className="text-sm text-muted-foreground">
                Start building immediately with 5 free website generations
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}