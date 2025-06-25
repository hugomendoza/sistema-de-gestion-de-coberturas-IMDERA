import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar as CalendarIcon, Clock, Users, MessageSquare } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { format, isSameDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { CalendarDateRangePicker } from '@/components/ui/calendar';
import type { DateRange } from 'react-day-picker';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

// Datos de ejemplo para las clases
export interface ClassType {
  id: string;
  name: string;
  day: string;
  time: string;
  date: Date;
  students: { id: string; name: string; phone: string }[];
  dates?: Date[]; // Para el filtrado por fecha
}

// Función para obtener la próxima fecha del día de la semana (0 = Domingo, 1 = Lunes, etc.)
const getNextWeekday = (day: number, refDate = new Date()) => {
  const result = new Date(refDate);
  result.setDate(refDate.getDate() + ((day + 7 - refDate.getDay()) % 7 || 7));
  return result;
};

const sampleClasses: ClassType[] = [
  {
    id: '1',
    name: 'Fútbol Avanzado',
    day: 'Lunes y Miércoles',
    time: '16:00 - 18:00',
    date: getNextWeekday(1), // Próximo lunes
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
    date: getNextWeekday(2), // Próximo martes
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
    date: getNextWeekday(5), // Próximo viernes
    students: [
      { id: 's6', name: 'Laura Ramírez', phone: '+5215512345683' },
      { id: 's7', name: 'Pedro González', phone: '+5215512345684' },
      { id: 's8', name: 'Sofía Torres', phone: '+5215512345685' },
    ],
  },
];

// Función para generar fechas de ejemplo para las clases
const generateClassDates = (): Date[] => {
  const today = new Date();
  const dates: Date[] = [];
  
  // Generar fechas para las próximas 4 semanas
  for (let i = 0; i < 28; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date);
  }
  
  return dates;
};

export function ClassesPage() {
  const [selectedClass, setSelectedClass] = useState<ClassType | null>(null);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Eliminamos la declaración duplicada de handleSelectClass
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 6)),
  });
  
  // Generar fechas de ejemplo para el calendario
  const classDates = generateClassDates();
  
  // Filtrar clases por fecha seleccionada
  const filteredClasses = sampleClasses.map(cls => {
    // En un caso real, aquí filtrarías las clases por fecha
    return {
      ...cls,
      // Agregar fechas de ejemplo a las clases
      dates: classDates.filter((_, index) => {
        // Lógica de ejemplo para asignar fechas a las clases
        if (cls.id === '1') return index % 3 === 0; // Lunes y Jueves
        if (cls.id === '2') return index % 7 === 1 || index % 7 === 3; // Martes y Jueves
        return index % 7 === 4; // Viernes
      })
    };
  });
  
  // Verificar si una clase ocurre en una fecha específica
  const isClassOnDate = (classItem: ClassType, date: Date) => {
    // Si no hay fechas definidas, verificar si la fecha de la clase coincide
    if (!classItem.dates || classItem.dates.length === 0) {
      return isSameDay(classItem.date, date);
    }
    // Si hay fechas definidas, verificar si alguna coincide
    return classItem.dates.some((d: Date) => isSameDay(d, date));
  };
  
  // Obtener las clases para la fecha seleccionada
  const getClassesForSelectedDate = () => {
    if (!date?.from) return filteredClasses;
    
    const selectedDate = date.from;
    return filteredClasses.filter(cls => 
      isClassOnDate(cls, selectedDate)
    );
  };
  
  const currentClasses = getClassesForSelectedDate();
  
  const handleSelectClass = (classItem: ClassType) => {
    setSelectedClass(classItem);
    setSelectedStudents(classItem.students.map(s => s.id)); // Seleccionar todos por defecto
    setMessage(`¡Hola! Te recordamos tu clase de ${classItem.name} el ${format(new Date(), 'EEEE d \'de\' MMMM', { locale: es })} a las ${classItem.time}. ¡Te esperamos!`);
    setIsModalOpen(true);
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
      {/* Modal de envío de mensajes */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Enviar recordatorios</DialogTitle>
            <DialogDescription>
              Envía un mensaje a los alumnos seleccionados de la clase {selectedClass?.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="message">Mensaje</Label>
              <Input
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="col-span-3"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Destinatarios</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleSelectAll}
                  className="h-8 px-2 text-xs"
                >
                  {selectedStudents.length === selectedClass?.students.length 
                    ? 'Desmarcar todos' 
                    : 'Seleccionar todos'}
                </Button>
              </div>
              
              <div className="space-y-2 max-h-[200px] overflow-y-auto p-2 border rounded-md">
                {selectedClass?.students.map((student) => (
                  <div key={student.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`student-${student.id}`}
                      checked={selectedStudents.includes(student.id)}
                      onCheckedChange={() => toggleStudent(student.id)}
                    />
                    <Label htmlFor={`student-${student.id}`} className="text-sm">
                      {student.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              disabled={isSending}
            >
              Cancelar
            </Button>
            <Button 
              type="button"
              onClick={sendWhatsAppReminders}
              disabled={isSending || selectedStudents.length === 0}
            >
              {isSending ? 'Enviando...' : 'Enviar mensajes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Mis Clases</h2>
          <p className="text-muted-foreground">
            Gestiona tus clases y envía recordatorios a los alumnos
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <CalendarDateRangePicker
            date={date}
            onDateChange={setDate}
            className="w-full md:w-auto"
          />
        </div>
      </div>

      {date?.from && (
        <div className="text-sm text-muted-foreground">
          Mostrando clases para: {format(date.from, 'PPP', { locale: es })}
          {date.to && date.to > date.from && ` - ${format(date.to, 'PPP', { locale: es })}`}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        {/* Lista de Clases */}
        <div className="space-y-4 md:col-span-1">
          <h3 className="text-lg font-medium">Tus Clases</h3>
          <div className="space-y-2">
            {currentClasses.length > 0 ? (
              currentClasses.map((classItem) => (
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
                      <CalendarIcon className="h-4 w-4" />
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
              ))
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                No hay clases programadas para las fechas seleccionadas
              </div>
            )}
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
