import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, Clock, Users, MessageSquare } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

// Datos de ejemplo para las clases
export interface ClassType {
  id: string;
  name: string;
  day: string;
  time: string;
  students: { id: string; name: string; phone: string }[];
}

const sampleClasses: ClassType[] = [
  {
    id: '1',
    name: 'Fútbol Avanzado',
    day: 'Lunes y Miércoles',
    time: '16:00 - 18:00',
    students: [
      { id: 's1', name: 'Juan Pérez', phone: '+5215512345678' },
      { id: 's2', name: 'María García', phone: '+5215512345679' },
      { id: 's3', name: 'Carlos López', phone: '+5215512345680' },
    ],
  },
  {
    id: '2',
    name: 'Básquetbol Principiantes',
    day: 'Martes y Jueves',
    time: '17:00 - 19:00',
    students: [
      { id: 's4', name: 'Ana Martínez', phone: '+5215512345681' },
      { id: 's5', name: 'Roberto Sánchez', phone: '+5215512345682' },
    ],
  },
  {
    id: '3',
    name: 'Voleibol Intermedio',
    day: 'Viernes',
    time: '15:00 - 17:00',
    students: [
      { id: 's6', name: 'Laura Ramírez', phone: '+5215512345683' },
      { id: 's7', name: 'Pedro González', phone: '+5215512345684' },
      { id: 's8', name: 'Sofía Torres', phone: '+5215512345685' },
    ],
  },
];

export function ClassesPage() {
  const [selectedClass, setSelectedClass] = useState<ClassType | null>(null);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSelectClass = (classItem: ClassType) => {
    setSelectedClass(classItem);
    setSelectedStudents([]);
    setMessage(`¡Hola! Te recordamos tu clase de ${classItem.name} mañana a las ${classItem.time}. ¡Te esperamos!`);
  };

  const toggleStudent = (studentId: string) => {
    setSelectedStudents(prev => 
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const toggleSelectAll = () => {
    if (!selectedClass) return;
    
    if (selectedStudents.length === selectedClass.students.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(selectedClass.students.map(s => s.id));
    }
  };

  const sendWhatsAppReminders = () => {
    if (!selectedClass || selectedStudents.length === 0) return;
    
    setIsSending(true);
    
    // Simular envío de mensajes
    setTimeout(() => {
      const selectedPhones = selectedClass.students
        .filter(s => selectedStudents.includes(s.id))
        .map(s => s.phone);
      
      // Crear enlaces de WhatsApp
      selectedPhones.forEach(phone => {
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
      });
      
      setIsSending(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Mis Clases</h2>
        <p className="text-muted-foreground">
          Gestiona tus clases y envía recordatorios a los alumnos
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Lista de Clases */}
        <div className="space-y-4 md:col-span-1">
          <h3 className="text-lg font-medium">Tus Clases</h3>
          <div className="space-y-2">
            {sampleClasses.map((classItem) => (
              <Card 
                key={classItem.id}
                className={`cursor-pointer transition-colors ${
                  selectedClass?.id === classItem.id ? 'border-primary' : ''
                }`}
                onClick={() => handleSelectClass(classItem)}
              >
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">{classItem.name}</CardTitle>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{classItem.day}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{classItem.time}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{classItem.students.length} alumnos</span>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Detalles de la Clase y Envío de Recordatorios */}
        {selectedClass && (
          <div className="space-y-6 md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>{selectedClass.name}</CardTitle>
                <CardDescription>
                  Gestiona la asistencia y envía recordatorios a los alumnos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Alumnos inscritos</h4>
                    <div className="border rounded-md">
                      <div className="p-2 bg-muted/50 border-b flex items-center space-x-2">
                        <Checkbox 
                          id="select-all"
                          checked={selectedStudents.length === selectedClass.students.length}
                          onCheckedChange={toggleSelectAll}
                        />
                        <Label htmlFor="select-all" className="text-sm">
                          Seleccionar todos
                        </Label>
                      </div>
                      <div className="divide-y">
                        {selectedClass.students.map((student) => (
                          <div key={student.id} className="p-2 flex items-center space-x-2">
                            <Checkbox 
                              id={`student-${student.id}`}
                              checked={selectedStudents.includes(student.id)}
                              onCheckedChange={() => toggleStudent(student.id)}
                            />
                            <Label htmlFor={`student-${student.id}`} className="flex-1">
                              {student.name}
                            </Label>
                            <span className="text-sm text-muted-foreground">
                              {student.phone}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message" className="flex items-center mb-2">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Mensaje de recordatorio
                    </Label>
                    <Input
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Escribe tu mensaje de recordatorio..."
                      className="min-h-[100px]"
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      El mensaje se enviará por WhatsApp a los alumnos seleccionados.
                    </p>
                  </div>

                  <div className="flex justify-end space-x-2 pt-2">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSelectedStudents([]);
                        setMessage(`¡Hola! Te recordamos tu clase de ${selectedClass.name} mañana a las ${selectedClass.time}. ¡Te esperamos!`);
                      }}
                    >
                      Restablecer
                    </Button>
                    <Button 
                      onClick={sendWhatsAppReminders}
                      disabled={selectedStudents.length === 0 || isSending}
                      className="bg-primary hover:bg-primary/90"
                    >
                      {isSending ? 'Enviando...' : 'Enviar Recordatorios'}
                    </Button>
                  </div>

                  {isSuccess && (
                    <div className="p-3 bg-green-50 text-green-700 rounded-md text-sm">
                      ¡Recordatorios enviados exitosamente!
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

export default ClassesPage;
