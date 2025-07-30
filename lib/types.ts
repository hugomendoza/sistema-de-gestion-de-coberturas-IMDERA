export type UserRole = 'promotor' | 'instructor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
  joinDate?: string;
  gender?: 'masculino' | 'femenino';
  birthDate?: string; // Formato: YYYY-MM-DD
}

export interface WeightMetrics {
  date: string;
  weight: number; // kg
  height: number; // cm
  bmi: number;
  bodyFatPercentage: number;
  waistCircumference?: number; // cm
  hipCircumference?: number; // cm
  notes?: string;
}

export interface StudentMetrics extends WeightMetrics {
  studentId: string;
  age: number;
  gender: 'masculino' | 'femenino';
  bmiCategory: 'bajo_peso' | 'normal' | 'sobrepeso' | 'obesidad';
  progress: {
    weightChange: number; // %
    bmiChange: number; // %
    bodyFatChange: number; // %
  };
}

export interface HealthMetric {
  date: string;
  weight: number; // kg
  bodyFatPercentage: number; // %
  energyLevel: number; // 1-10
  sleepHours: number;
  stressLevel: number; // 1-10
  notes?: string;
}

export interface HealthSummary {
  currentWeight: number;
  weightChange: number; // %
  avgSleep: number;
  avgEnergy: number;
  lastMeasurement: string;
  progress: {
    weight: number[];
    bodyFat: number[];
    dates: string[];
  };
}

export interface Student {
  id: string;
  name: string;
  phone: string;
  confirmedAttendance: boolean;
}

export interface Class {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  studentCount: number;
  status: 'programada' | 'en-curso' | 'completada' | 'cancelada';
  students: Student[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  classes: Class[];
  totalStudents: number;
}

export interface OverweightMetrics {
  totalStudents: number;
  byGender: {
    male: {
      total: number;
      normal: number;
      overweight: number;
      obesity: number;
    };
    female: {
      total: number;
      normal: number;
      overweight: number;
      obesity: number;
    };
  };
  byAgeGroup: {
    [key: string]: {
      total: number;
      normal: number;
      overweight: number;
      obesity: number;
    };
  };
  monthlyTrends: Array<{
    month: string;
    normal: number;
    overweight: number;
    obesity: number;
  }>;
}

export interface Statistics {
  totalStudents: number;
  activeStudents: number;
  completionRate: number;
  totalCourses: number;
  activeCourses: number;
  upcomingCourses: number;
  attendanceRate: number;
  studentSatisfaction: number;
  genderDistribution: {
    male: number;
    female: number;
    other: number;
  };
  ageDistribution: {
    [key: string]: number;
  };
  overweightMetrics: OverweightMetrics;
  benefitsGranted: number;
}

export interface AttendanceData {
  month: string;
  attendance: number;
}

export interface CourseData {
  name: string;
  students: number;
  completion: number;
}