import { useState } from "react"
import { Link } from "react-router-dom"
import { Plus, Grid, List, Search, Filter } from "lucide-react"
import { Header } from "@/components/layout/Header"
import { ProjectCard } from "@/components/dashboard/ProjectCard"
import { NeuralButton } from "@/components/ui/neural-button"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock data - replace with actual API calls
const mockUser = {
  name: "John Doe",
  email: "john@example.com",
  credits: 5
}

const mockProjects = [
  {
    id: "1",
    name: "Photography Portfolio",
    description: "A modern portfolio website for showcasing photography work with dark theme and image gallery",
    status: "published" as const,
    createdAt: "2024-01-15T10:30:00Z",
    url: "https://example.com/portfolio"
  },
  {
    id: "2", 
    name: "E-commerce Store",
    description: "Online store for handmade jewelry with product catalog and shopping cart",
    status: "draft" as const,
    createdAt: "2024-01-14T15:45:00Z"
  },
  {
    id: "3",
    name: "Fitness Landing Page",
    description: "Landing page for fitness coaching service with testimonials and pricing",
    status: "generating" as const,
    createdAt: "2024-01-13T09:20:00Z"
  }
]

export default function Dashboard() {
  const [projects] = useState(mockProjects)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const handleSignOut = () => {
    // TODO: Implement sign out logic
    console.log('Sign out')
  }

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-background">
      <Header user={mockUser} onSignOut={handleSignOut} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {mockUser.name}! 👋
              </h1>
              <p className="text-muted-foreground">
                Manage your AI-generated websites and create new ones
              </p>
            </div>
            
            <Link to="/generate">
              <NeuralButton variant="neural" size="lg" className="group">
                <Plus className="mr-2 h-5 w-5" />
                Create New Website
              </NeuralButton>
            </Link>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-gradient-card border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Projects</p>
                    <p className="text-2xl font-bold">{projects.length}</p>
                  </div>
                  <div className="p-2 bg-neural rounded-lg shadow-glow">
                    <Grid className="h-5 w-5 text-primary-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Published</p>
                    <p className="text-2xl font-bold">
                      {projects.filter(p => p.status === 'published').length}
                    </p>
                  </div>
                  <div className="p-2 bg-green-500 rounded-lg">
                    <Grid className="h-5 w-5 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Credits Left</p>
                    <p className="text-2xl font-bold text-primary">{mockUser.credits}</p>
                  </div>
                  <div className="p-2 bg-accent rounded-lg shadow-accent">
                    <Plus className="h-5 w-5 text-accent-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Generating</p>
                    <p className="text-2xl font-bold">
                      {projects.filter(p => p.status === 'generating').length}
                    </p>
                  </div>
                  <div className="p-2 bg-yellow-500 rounded-lg">
                    <Filter className="h-5 w-5 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Projects Section */}
        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle className="flex items-center space-x-2">
                <span>Your Projects</span>
                <Badge variant="secondary">{filteredProjects.length}</Badge>
              </CardTitle>
              
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search projects..."
                    className="pl-10 w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex border border-border rounded-lg p-1">
                  <Button
                    variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            {filteredProjects.length === 0 ? (
              <div className="text-center py-12">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-neural rounded-lg shadow-glow mx-auto flex items-center justify-center">
                    <Plus className="h-8 w-8 text-primary-foreground" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">No projects found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery 
                    ? "No projects match your search criteria." 
                    : "Create your first AI-generated website to get started!"
                  }
                </p>
                <Link to="/generate">
                  <NeuralButton variant="neural">
                    Create Your First Website
                  </NeuralButton>
                </Link>
              </div>
            ) : (
              <div className={
                viewMode === 'grid' 
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
                  : "space-y-4"
              }>
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onEdit={(project) => console.log('Edit:', project)}
                    onDelete={(project) => console.log('Delete:', project)}
                    onDuplicate={(project) => console.log('Duplicate:', project)}
                    onView={(project) => console.log('View:', project)}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}