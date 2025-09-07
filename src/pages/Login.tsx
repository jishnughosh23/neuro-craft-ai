import { useNavigate } from "react-router-dom"
import { AuthForm } from "@/components/auth/AuthForm"
import { useToast } from "@/hooks/use-toast"

interface AuthFormData {
  email: string
  password: string
  name?: string
}

export default function Login() {
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleLogin = async (data: AuthFormData) => {
    try {
      // TODO: Replace with actual API call
      console.log('Login attempt:', data)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: "Welcome back!",
        description: "You have been successfully logged in.",
      })
      
      navigate('/dashboard')
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      })
    }
  }

  return <AuthForm mode="login" onSubmit={handleLogin} />
}