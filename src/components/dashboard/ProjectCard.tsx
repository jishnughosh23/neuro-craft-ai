import { useState } from "react"
import { MoreVertical, ExternalLink, Edit, Trash2, Copy, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

interface Project {
  id: string
  name: string
  description: string
  thumbnail?: string
  status: 'draft' | 'published' | 'generating'
  createdAt: string
  url?: string
}

interface ProjectCardProps {
  project: Project
  onEdit?: (project: Project) => void
  onDelete?: (project: Project) => void
  onDuplicate?: (project: Project) => void
  onView?: (project: Project) => void
}

export function ProjectCard({ 
  project, 
  onEdit, 
  onDelete, 
  onDuplicate, 
  onView 
}: ProjectCardProps) {
  const [imageError, setImageError] = useState(false)

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'published':
        return 'bg-green-500/10 text-green-500 border-green-500/20'
      case 'generating':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
      default:
        return 'bg-muted text-muted-foreground border-border'
    }
  }

  const getStatusText = (status: Project['status']) => {
    switch (status) {
      case 'published':
        return 'Published'
      case 'generating':
        return 'Generating...'
      default:
        return 'Draft'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <Card className="group hover:shadow-neural transition-all duration-300 hover:scale-[1.02] bg-gradient-card border-border/50">
      <CardHeader className="p-0">
        <div className="relative aspect-video bg-muted rounded-t-lg overflow-hidden">
          {project.thumbnail && !imageError ? (
            <img
              src={project.thumbnail}
              alt={project.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
              <div className="text-center">
                <div className="w-12 h-12 bg-neural rounded-lg shadow-glow mb-2 mx-auto flex items-center justify-center">
                  <Edit className="h-6 w-6 text-primary-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">No preview</p>
              </div>
            </div>
          )}
          
          {/* Status Badge */}
          <div className="absolute top-2 left-2">
            <Badge className={getStatusColor(project.status)}>
              {getStatusText(project.status)}
            </Badge>
          </div>

          {/* Actions */}
          <div className="absolute top-2 right-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="secondary" 
                  size="icon" 
                  className="h-8 w-8 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {onView && (
                  <DropdownMenuItem onClick={() => onView(project)}>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Project
                  </DropdownMenuItem>
                )}
                {onEdit && (
                  <DropdownMenuItem onClick={() => onEdit(project)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                )}
                {onDuplicate && (
                  <DropdownMenuItem onClick={() => onDuplicate(project)}>
                    <Copy className="mr-2 h-4 w-4" />
                    Duplicate
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                {onDelete && (
                  <DropdownMenuItem 
                    onClick={() => onDelete(project)}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
            {project.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {project.description}
          </p>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex items-center text-xs text-muted-foreground">
          <Calendar className="mr-1 h-3 w-3" />
          {formatDate(project.createdAt)}
        </div>
        
        {project.url && project.status === 'published' && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => window.open(project.url, '_blank')}
            className="h-auto p-1 text-xs hover:text-primary"
          >
            <ExternalLink className="h-3 w-3" />
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}