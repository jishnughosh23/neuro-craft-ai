import { useNavigate } from "react-router-dom"
import { AuthForm } from "@/components/auth/AuthForm"
import { useToast } from "@/hooks/use-toast"

interface AuthFormData {
  email: string
  password: string
  name?: string
}

export default function Register() {
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleRegister = async (data: AuthFormData) => {
    try {
      // TODO: Replace with actual API call
      console.log('Registration attempt:', data)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: "Account created successfully!",
        description: "Welcome to NeuroCode Studio! You've received 5 free credits.",
      })
      
      navigate('/dashboard')
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "An error occurred while creating your account. Please try again.",
        variant: "destructive",
      })
    }
  }

  return <AuthForm mode="register" onSubmit={handleRegister} />
}