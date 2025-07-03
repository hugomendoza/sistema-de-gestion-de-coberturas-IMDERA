export interface User {
  id: string;
  name: string;
  email: string;
  role: 'promotor';
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