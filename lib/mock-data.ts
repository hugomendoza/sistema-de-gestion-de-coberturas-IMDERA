import { User, Project, Statistics, AttendanceData, CourseData, Student, Class } from './types';

export const mockUser: User = {
  id: '1',
  name: 'María González',
  email: 'maria.gonzalez@imdera.gov.co',
  role: 'promotor'
};

export const mockStudents: Student[] = [
  { id: '1', name: 'Ana Rodríguez', phone: '+57 300 123 4567', confirmedAttendance: true },
  { id: '2', name: 'Carlos Martínez', phone: '+57 301 234 5678', confirmedAttendance: false },
  { id: '3', name: 'Lucía Fernández', phone: '+57 302 345 6789', confirmedAttendance: true },
  { id: '4', name: 'Diego Herrera', phone: '+57 303 456 7890', confirmedAttendance: true },
  { id: '5', name: 'Sofia Vargas', phone: '+57 304 567 8901', confirmedAttendance: false },
  { id: '6', name: 'Miguel Torres', phone: '+57 305 678 9012', confirmedAttendance: true },
  { id: '7', name: 'Isabella Cruz', phone: '+57 306 789 0123', confirmedAttendance: true },
  { id: '8', name: 'Andrés Morales', phone: '+57 307 890 1234', confirmedAttendance: false },
  { id: '9', name: 'Valentina Ruiz', phone: '+57 308 901 2345', confirmedAttendance: true },
  { id: '10', name: 'Santiago López', phone: '+57 309 012 3456', confirmedAttendance: true },
];

export const mockClasses: Class[] = [
  {
    id: '1',
    name: 'Emprendimiento Digital',
    date: '2024-01-15',
    time: '09:00 - 12:00',
    location: 'Aula 101 - Centro IMDERA',
    studentCount: 25,
    status: 'programada',
    students: mockStudents.slice(0, 5)
  },
  {
    id: '2',
    name: 'Gestión Financiera',
    date: '2024-01-18',
    time: '14:00 - 17:00',
    location: 'Aula 205 - Centro IMDERA',
    studentCount: 18,
    status: 'en-curso',
    students: mockStudents.slice(5, 8)
  },
  {
    id: '3',
    name: 'Marketing Digital',
    date: '2024-01-12',
    time: '08:00 - 11:00',
    location: 'Laboratorio de Sistemas',
    studentCount: 22,
    status: 'completada',
    students: mockStudents.slice(8, 10)
  },
  {
    id: '4',
    name: 'Desarrollo de Productos',
    date: '2024-01-20',
    time: '15:00 - 18:00',
    location: 'Taller de Innovación',
    studentCount: 15,
    status: 'cancelada',
    students: []
  }
];

export const mockProject: Project = {
  id: '1',
  name: 'Programa de Emprendimiento Rural',
  description: 'Fortalecimiento de capacidades empresariales en comunidades rurales del departamento',
  classes: mockClasses,
  totalStudents: 80
};

export const mockStatistics: Statistics = {
  totalStudents: 1247,
  activeCourses: 18,
  benefitsGranted: 342,
  attendanceRate: 87.5
};

export const mockAttendanceData: AttendanceData[] = [
  { month: 'Ene', attendance: 85 },
  { month: 'Feb', attendance: 88 },
  { month: 'Mar', attendance: 82 },
  { month: 'Abr', attendance: 90 },
  { month: 'May', attendance: 87 },
  { month: 'Jun', attendance: 89 },
  { month: 'Jul', attendance: 91 },
  { month: 'Ago', attendance: 86 },
  { month: 'Sep', attendance: 88 },
  { month: 'Oct', attendance: 92 },
  { month: 'Nov', attendance: 89 },
  { month: 'Dic', attendance: 87 }
];

export const mockCourseData: CourseData[] = [
  { name: 'Emprendimiento Digital', students: 156, completion: 92 },
  { name: 'Gestión Financiera', students: 134, completion: 88 },
  { name: 'Marketing Digital', students: 178, completion: 95 },
  { name: 'Desarrollo de Productos', students: 98, completion: 85 },
  { name: 'Liderazgo Empresarial', students: 112, completion: 90 }
];