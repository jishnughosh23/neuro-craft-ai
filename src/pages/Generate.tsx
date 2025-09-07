import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Header } from "@/components/layout/Header"
import { PromptInterface } from "@/components/generation/PromptInterface"
import { useToast } from "@/hooks/use-toast"

// Mock user data - replace with actual auth state
const mockUser = {
  name: "John Doe",
  email: "john@example.com",
  credits: 5
}

export default function Generate() {
  const [isGenerating, setIsGenerating] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleGenerate = async (prompt: string) => {
    if (mockUser.credits === 0) {
      toast({
        title: "No credits remaining",
        description: "Purchase more credits to continue generating websites.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    
    try {
      // TODO: Replace with actual API call to your backend
      console.log('Generating website with prompt:', prompt)
      
      // Simulate AI generation process
      toast({
        title: "Generation started!",
        description: "Your website is being created by AI. This usually takes 30-60 seconds.",
      })
      
      // Simulate API call (replace with actual backend call)
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Simulate successful generation
      toast({
        title: "Website generated successfully!",
        description: "Your new website is ready. Redirecting to dashboard...",
      })
      
      // Redirect to dashboard after successful generation
      setTimeout(() => {
        navigate('/dashboard')
      }, 2000)
      
    } catch (error) {
      console.error('Generation failed:', error)
      toast({
        title: "Generation failed",
        description: "Something went wrong while generating your website. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSignOut = () => {
    // TODO: Implement sign out logic
    console.log('Sign out')
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gradient-background">
      <Header user={mockUser} onSignOut={handleSignOut} />
      
      <main className="container mx-auto px-4 py-8">
        <PromptInterface
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
          credits={mockUser.credits}
        />
      </main>
    </div>
  )
}