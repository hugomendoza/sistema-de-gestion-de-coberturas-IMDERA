export type UserRole = 'promotor' | 'instructor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
  joinDate: string;
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

export interface Statistics {
  totalStudents: number;
  activeCourses: number;
  benefitsGranted: number;
  attendanceRate: number;
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