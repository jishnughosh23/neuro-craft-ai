import { Header } from "@/components/layout/Header"
import { HeroSection } from "@/components/landing/HeroSection"

const Index = () => {
  // Mock user data - replace with actual auth state
  const user = null // or user data when logged in

  return (
    <div className="min-h-screen bg-gradient-background">
      <Header user={user} />
      <HeroSection />
    </div>
  );
};

export default Index;
