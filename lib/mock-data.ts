import { User, Project, Statistics, AttendanceData, CourseData, Student, Class, StudentMetrics } from './types';

export const mockUser: User = {
  id: '1',
  name: 'María González',
  email: 'maria.gonzalez@imdera.gov.co',
  role: 'promotor'
};

export const mockStudents: Student[] = [
  { 
    id: '1', 
    name: 'Ana Rodríguez', 
    phone: '+57 300 123 4567', 
    confirmedAttendance: true,
    gender: 'femenino',
    birthDate: '2010-05-15'
  },
  { 
    id: '2', 
    name: 'Carlos Martínez', 
    phone: '+57 301 234 5678', 
    confirmedAttendance: false,
    gender: 'masculino',
    birthDate: '2009-11-22'
  },
  { 
    id: '3', 
    name: 'Lucía Fernández', 
    phone: '+57 302 345 6789', 
    confirmedAttendance: true,
    gender: 'femenino',
    birthDate: '2011-03-10'
  },
  { 
    id: '4', 
    name: 'Diego Herrera', 
    phone: '+57 303 456 7890', 
    confirmedAttendance: true,
    gender: 'masculino',
    birthDate: '2010-07-30'
  },
  { 
    id: '5', 
    name: 'Sofia Vargas', 
    phone: '+57 304 567 8901', 
    confirmedAttendance: false,
    gender: 'femenino',
    birthDate: '2012-01-18'
  },
  { 
    id: '6', 
    name: 'Miguel Torres', 
    phone: '+57 305 678 9012', 
    confirmedAttendance: true,
    gender: 'masculino',
    birthDate: '2009-09-05'
  },
  { 
    id: '7', 
    name: 'Isabella Cruz', 
    phone: '+57 306 789 0123', 
    confirmedAttendance: true,
    gender: 'femenino',
    birthDate: '2011-12-25'
  },
  { 
    id: '8', 
    name: 'Andrés Morales', 
    phone: '+57 307 890 1234', 
    confirmedAttendance: false,
    gender: 'masculino',
    birthDate: '2010-08-14'
  },
  { 
    id: '9', 
    name: 'Valentina Ruiz', 
    phone: '+57 308 901 2345', 
    confirmedAttendance: true,
    gender: 'femenino',
    birthDate: '2009-04-30'
  },
  { 
    id: '10', 
    name: 'Santiago López', 
    phone: '+57 309 012 3456', 
    confirmedAttendance: true,
    gender: 'masculino',
    birthDate: '2011-06-12'
  },
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

// Función para calcular la edad a partir de la fecha de nacimiento
const calculateAge = (birthDate: string): number => {
  const today = new Date();
  const birthDateObj = new Date(birthDate);
  let age = today.getFullYear() - birthDateObj.getFullYear();
  const monthDiff = today.getMonth() - birthDateObj.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
    age--;
  }
  
  return age;
};

// Generar métricas de peso para un estudiante
const generateWeightMetrics = (student: Student): StudentMetrics => {
  const age = calculateAge(student.birthDate || '2010-01-01');
  const height = 140 + Math.floor(Math.random() * 40); // Entre 140-180cm
  const weight = 35 + Math.floor(Math.random() * 40); // Entre 35-75kg
  const bmi = parseFloat((weight / Math.pow(height / 100, 2)).toFixed(1));
  
  // Categoría IMC para adolescentes (según OMS)
  let bmiCategory: 'bajo_peso' | 'normal' | 'sobrepeso' | 'obesidad' = 'normal';
  if (bmi < 18.5) bmiCategory = 'bajo_peso';
  else if (bmi >= 25 && bmi < 30) bmiCategory = 'sobrepeso';
  else if (bmi >= 30) bmiCategory = 'obesidad';
  
  // % de grasa corporal estimado (fórmula simplificada)
  let bodyFatPercentage = 0;
  if (student.gender === 'masculino') {
    bodyFatPercentage = 15 + (Math.random() * 10); // 15-25%
  } else {
    bodyFatPercentage = 20 + (Math.random() * 15); // 20-35%
  }
  bodyFatPercentage = parseFloat(bodyFatPercentage.toFixed(1));
  
  return {
    studentId: student.id,
    date: new Date().toISOString().split('T')[0],
    age,
    gender: student.gender || 'masculino',
    height,
    weight,
    bmi,
    bmiCategory,
    bodyFatPercentage,
    waistCircumference: 60 + Math.floor(Math.random() * 20), // 60-80cm
    hipCircumference: 70 + Math.floor(Math.random() * 30), // 70-100cm
    progress: {
      weightChange: parseFloat((Math.random() * 10 - 5).toFixed(1)), // -5% a +5%
      bmiChange: parseFloat((Math.random() * 5 - 2.5).toFixed(1)), // -2.5% a +2.5%
      bodyFatChange: parseFloat((Math.random() * 8 - 4).toFixed(1)) // -4% a +4%
    }
  };
};

// Generar métricas de peso para todos los estudiantes
export const mockWeightMetrics: StudentMetrics[] = mockStudents.map(student => 
  generateWeightMetrics(student)
);

export const mockStatistics: Statistics = {
  totalStudents: 10,
  activeStudents: 8,
  completionRate: 75,
  totalCourses: 3,
  activeCourses: 2,
  upcomingCourses: 1,
  attendanceRate: 85,
  benefitsGranted: 342, // Agregando la propiedad faltante
  studentSatisfaction: 4.5,
  genderDistribution: {
    male: mockStudents.filter(s => s.gender === 'masculino').length / mockStudents.length * 100,
    female: mockStudents.filter(s => s.gender === 'femenino').length / mockStudents.length * 100,
    other: 0
  },
  ageDistribution: {
    '10-12': 20,
    '13-15': 50,
    '16-18': 30
  },
  // Nuevas métricas de sobrepeso
  overweightMetrics: {
    totalStudents: mockStudents.length,
    byGender: {
      male: {
        total: mockStudents.filter(s => s.gender === 'masculino').length,
        normal: mockWeightMetrics.filter(m => m.gender === 'masculino' && m.bmiCategory === 'normal').length,
        overweight: mockWeightMetrics.filter(m => m.gender === 'masculino' && m.bmiCategory === 'sobrepeso').length,
        obesity: mockWeightMetrics.filter(m => m.gender === 'masculino' && m.bmiCategory === 'obesidad').length
      },
      female: {
        total: mockStudents.filter(s => s.gender === 'femenino').length,
        normal: mockWeightMetrics.filter(m => m.gender === 'femenino' && m.bmiCategory === 'normal').length,
        overweight: mockWeightMetrics.filter(m => m.gender === 'femenino' && m.bmiCategory === 'sobrepeso').length,
        obesity: mockWeightMetrics.filter(m => m.gender === 'femenino' && m.bmiCategory === 'obesidad').length
      }
    },
    byAgeGroup: {
      '10-12': {
        total: mockWeightMetrics.filter(m => m.age >= 10 && m.age <= 12).length,
        normal: mockWeightMetrics.filter(m => m.age >= 10 && m.age <= 12 && m.bmiCategory === 'normal').length,
        overweight: mockWeightMetrics.filter(m => m.age >= 10 && m.age <= 12 && m.bmiCategory === 'sobrepeso').length,
        obesity: mockWeightMetrics.filter(m => m.age >= 10 && m.age <= 12 && m.bmiCategory === 'obesidad').length
      },
      '13-15': {
        total: mockWeightMetrics.filter(m => m.age >= 13 && m.age <= 15).length,
        normal: mockWeightMetrics.filter(m => m.age >= 13 && m.age <= 15 && m.bmiCategory === 'normal').length,
        overweight: mockWeightMetrics.filter(m => m.age >= 13 && m.age <= 15 && m.bmiCategory === 'sobrepeso').length,
        obesity: mockWeightMetrics.filter(m => m.age >= 13 && m.age <= 15 && m.bmiCategory === 'obesidad').length
      },
      '16-18': {
        total: mockWeightMetrics.filter(m => m.age >= 16 && m.age <= 18).length,
        normal: mockWeightMetrics.filter(m => m.age >= 16 && m.age <= 18 && m.bmiCategory === 'normal').length,
        overweight: mockWeightMetrics.filter(m => m.age >= 16 && m.age <= 18 && m.bmiCategory === 'sobrepeso').length,
        obesity: mockWeightMetrics.filter(m => m.age >= 16 && m.age <= 18 && m.bmiCategory === 'obesidad').length
      }
    },
    // Tendencias mensuales (datos de ejemplo)
    monthlyTrends: [
      { month: 'Ene', normal: 45, overweight: 30, obesity: 25 },
      { month: 'Feb', normal: 48, overweight: 32, obesity: 20 },
      { month: 'Mar', normal: 50, overweight: 30, obesity: 20 },
      { month: 'Abr', normal: 52, overweight: 30, obesity: 18 },
      { month: 'May', normal: 55, overweight: 28, obesity: 17 },
      { month: 'Jun', normal: 58, overweight: 27, obesity: 15 }
    ]
  }
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