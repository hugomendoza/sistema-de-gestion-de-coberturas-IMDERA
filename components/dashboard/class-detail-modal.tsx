'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Phone,
  MessageSquare,
  CheckCircle,
  XCircle,
  Send,
  User
} from 'lucide-react';
import { Class, Student } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ClassDetailModalProps {
  classItem: Class;
  isOpen: boolean;
  onClose: () => void;
}

const statusConfig = {
  'programada': {
    label: 'Programada',
    icon: Calendar,
    color: 'bg-blue-500',
    variant: 'secondary' as const
  },
  'en-curso': {
    label: 'En Curso',
    icon: CheckCircle,
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

export function ClassDetailModal({ classItem, isOpen, onClose }: ClassDetailModalProps) {
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [message, setMessage] = useState('Recordatorio: Tu clase de ' + classItem.name + ' está programada para mañana. ¡No faltes!');
  const [isSending, setIsSending] = useState(false);
  const [messageSent, setMessageSent] = useState(false);

  const config = statusConfig[classItem.status];
  const StatusIcon = config.icon;

  const handleStudentToggle = (studentId: string) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSelectAll = () => {
    if (selectedStudents.length === classItem.students.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(classItem.students.map(s => s.id));
    }
  };

  const handleSendMessage = async () => {
    if (selectedStudents.length === 0 || !message.trim()) return;

    setIsSending(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSending(false);
    setMessageSent(true);
    
    // Reset after showing success
    setTimeout(() => {
      setMessageSent(false);
      setSelectedStudents([]);
      setMessage('Recordatorio: Tu clase de ' + classItem.name + ' está programada para mañana. ¡No faltes!');
    }, 3000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl">{classItem.name}</DialogTitle>
              <DialogDescription className="mt-2">
                Gestiona los estudiantes y envía recordatorios
              </DialogDescription>
            </div>
            <Badge variant={config.variant} className="text-sm">
              <StatusIcon className="w-4 h-4 mr-2" />
              {config.label}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Class Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-primary" />
              <div>
                <div className="text-sm font-medium">Fecha</div>
                <div className="text-sm text-muted-foreground">
                  {new Date(classItem.date).toLocaleDateString('es-CO', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-primary" />
              <div>
                <div className="text-sm font-medium">Horario</div>
                <div className="text-sm text-muted-foreground">{classItem.time}</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-primary" />
              <div>
                <div className="text-sm font-medium">Ubicación</div>
                <div className="text-sm text-muted-foreground">{classItem.location}</div>
              </div>
            </div>
          </div>

          {messageSent && (
            <Alert className="border-green-200 bg-green-50 dark:bg-green-950">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800 dark:text-green-200">
                ¡Mensajes enviados exitosamente a {selectedStudents.length} estudiante(s)!
              </AlertDescription>
            </Alert>
          )}

          {/* Students List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Estudiantes ({classItem.students.length})
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSelectAll}
                disabled={classItem.students.length === 0}
              >
                {selectedStudents.length === classItem.students.length ? 'Deseleccionar todos' : 'Seleccionar todos'}
              </Button>
            </div>

            <div className="grid gap-3">
              {classItem.students.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No hay estudiantes asignados a esta clase</p>
                </div>
              ) : (
                classItem.students.map((student) => (
                  <div
                    key={student.id}
                    className={cn(
                      "flex items-center space-x-4 p-4 rounded-lg border transition-all duration-200",
                      selectedStudents.includes(student.id) 
                        ? "bg-primary/5 border-primary/30" 
                        : "bg-card hover:bg-muted/30"
                    )}
                  >
                    <Checkbox
                      checked={selectedStudents.includes(student.id)}
                      onCheckedChange={() => handleStudentToggle(student.id)}
                    />
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium">{student.name}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{student.phone}</span>
                      </div>
                      <div className="flex items-center">
                        {student.confirmedAttendance ? (
                          <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Confirmó asistencia
                          </Badge>
                        ) : (
                          <Badge variant="secondary">
                            <XCircle className="w-3 h-3 mr-1" />
                            Sin confirmar
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Message Section */}
          {classItem.students.length > 0 && (
            <>
              <Separator />
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Enviar Recordatorio por WhatsApp
                </h3>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Mensaje</Label>
                  <Textarea
                    id="message"
                    placeholder="Escribe tu mensaje de recordatorio..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="resize-none"
                  />
                  <div className="text-xs text-muted-foreground">
                    {message.length}/500 caracteres
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="text-sm">
                    <span className="font-medium">{selectedStudents.length}</span> estudiante(s) seleccionado(s)
                  </div>
                  <Button
                    onClick={handleSendMessage}
                    disabled={selectedStudents.length === 0 || !message.trim() || isSending}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {isSending ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Enviar por WhatsApp
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}