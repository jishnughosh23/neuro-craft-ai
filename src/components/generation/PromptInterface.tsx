import { useState } from "react"
import { Send, Sparkles, Loader2, Lightbulb } from "lucide-react"
import { NeuralButton } from "@/components/ui/neural-button"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface PromptInterfaceProps {
  onGenerate: (prompt: string) => void
  isGenerating?: boolean
  credits: number
}

const promptSuggestions = [
  "A modern portfolio website for a graphic designer",
  "An e-commerce store for handmade jewelry",
  "A landing page for a fitness coaching service",
  "A blog website about sustainable living",
  "A restaurant website with online menu",
  "A tech startup landing page",
]

export function PromptInterface({ onGenerate, isGenerating = false, credits }: PromptInterfaceProps) {
  const [prompt, setPrompt] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (prompt.trim() && credits > 0 && !isGenerating) {
      onGenerate(prompt.trim())
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setPrompt(suggestion)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-neural-subtle border border-primary/20 rounded-full px-4 py-2">
          <Sparkles className="h-4 w-4 text-primary animate-pulse" />
          <span className="text-sm font-medium text-primary">AI Website Generator</span>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold">
          Describe Your Dream Website
        </h1>
        
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Tell our AI what you want to build, and watch it create a stunning website in seconds. 
          Be specific about design, features, and content for best results.
        </p>
      </div>

      {/* Credits Display */}
      <div className="flex justify-center">
        <div className="flex items-center space-x-2 bg-gradient-card border border-border/50 rounded-lg px-4 py-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="text-sm font-medium">
            {credits} {credits === 1 ? 'credit' : 'credits'} remaining
          </span>
        </div>
      </div>

      {/* Main Interface */}
      <Card className="bg-gradient-card border-border/50 shadow-neural">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            <span>Website Prompt</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Textarea
                placeholder="e.g., 'Create a modern portfolio website for a photographer with dark theme, image gallery, contact form, and about section...'"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[120px] resize-none pr-12"
                disabled={isGenerating}
              />
              
              {prompt.length > 0 && (
                <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
                  {prompt.length} characters
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                💡 Tip: Be specific about colors, layout, and features for best results
              </div>
              
              <NeuralButton
                type="submit"
                variant="neural"
                disabled={!prompt.trim() || credits === 0 || isGenerating}
                className="group"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    Generate Website
                    <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </NeuralButton>
            </div>
          </form>

          {/* Prompt Suggestions */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">
              Need inspiration? Try these prompts:
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {promptSuggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="h-auto p-3 text-left justify-start hover:bg-neural-subtle hover:border-primary/20 border border-transparent transition-all"
                  onClick={() => handleSuggestionClick(suggestion)}
                  disabled={isGenerating}
                >
                  <div className="text-sm text-muted-foreground truncate">
                    {suggestion}
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {credits === 0 && (
            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
              <div className="text-sm text-destructive font-medium">
                ⚠️ No credits remaining. Purchase more credits to continue generating websites.
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}