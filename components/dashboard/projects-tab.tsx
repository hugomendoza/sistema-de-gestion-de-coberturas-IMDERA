'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  ArrowRight,
  BookOpen,
  CheckCircle,
  XCircle,
  PlayCircle,
  PauseCircle
} from 'lucide-react';
import { mockProject } from '@/lib/mock-data';
import { Class } from '@/lib/types';
import { ClassDetailModal } from './class-detail-modal';

const statusConfig = {
  'programada': {
    label: 'Programada',
    icon: Calendar,
    color: 'bg-blue-500',
    variant: 'secondary' as const
  },
  'en-curso': {
    label: 'En Curso',
    icon: PlayCircle,
    color: 'bg-green-500',
    variant: 'default' as const
  },
  'completada': {
    label: 'Completada',
    icon: CheckCircle,
    color: 'bg-primary',
    variant: 'outline' as const
  },
  'cancelada': {
    label: 'Cancelada',
    icon: XCircle,
    color: 'bg-red-500',
    variant: 'destructive' as const
  }
};

export function ProjectsTab() {
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const project = mockProject;

  const handleClassClick = (classItem: Class) => {
    setSelectedClass(classItem);
  };

  const handleCloseModal = () => {
    setSelectedClass(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Proyectos Asignados</h2>
          <p className="text-muted-foreground">
            Gestiona las clases y estudiantes de tus proyectos
          </p>
        </div>
      </div>

      {/* Project Overview */}
      <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">{project.name}</CardTitle>
              <CardDescription className="mt-2">
                {project.description}
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">{project.totalStudents}</div>
              <div className="text-sm text-muted-foreground">Total Estudiantes</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-card rounded-lg">
              <div className="text-lg font-semibold text-blue-600">
                {project.classes.filter(c => c.status === 'programada').length}
              </div>
              <div className="text-xs text-muted-foreground">Programadas</div>
            </div>
            <div className="text-center p-3 bg-card rounded-lg">
              <div className="text-lg font-semibold text-green-600">
                {project.classes.filter(c => c.status === 'en-curso').length}
              </div>
              <div className="text-xs text-muted-foreground">En Curso</div>
            </div>
            <div className="text-center p-3 bg-card rounded-lg">
              <div className="text-lg font-semibold text-primary">
                {project.classes.filter(c => c.status === 'completada').length}
              </div>
              <div className="text-xs text-muted-foreground">Completadas</div>
            </div>
            <div className="text-center p-3 bg-card rounded-lg">
              <div className="text-lg font-semibold text-red-600">
                {project.classes.filter(c => c.status === 'cancelada').length}
              </div>
              <div className="text-xs text-muted-foreground">Canceladas</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Classes Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {project.classes.map((classItem) => {
          const config = statusConfig[classItem.status];
          const StatusIcon = config.icon;
          
          return (
            <Card 
              key={classItem.id} 
              className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 border-l-primary/30 hover:border-l-primary"
              onClick={() => handleClassClick(classItem)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {classItem.name}
                    </CardTitle>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant={config.variant} className="text-xs">
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {config.label}
                      </Badge>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(classItem.date).toLocaleDateString('es-CO', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-2" />
                  {classItem.time}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  {classItem.location}
                </div>
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center text-sm">
                    <Users className="h-4 w-4 mr-2 text-primary" />
                    <span className="font-medium">{classItem.studentCount} estudiantes</span>
                  </div>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    className="text-xs hover:bg-primary/10"
                  >
                    Ver detalles
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Class Detail Modal */}
      {selectedClass && (
        <ClassDetailModal
          classItem={selectedClass}
          isOpen={!!selectedClass}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}