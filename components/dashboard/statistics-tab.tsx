'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { 
  Users, 
  BookOpen, 
  Gift, 
  TrendingUp,
  Calendar,
  Target,
  Award,
  Activity,
  Scale,
  HeartPulse,
  UserCheck
} from 'lucide-react';
import { mockStatistics, mockAttendanceData, mockCourseData } from '@/lib/mock-data';
import { OverweightMetrics } from './overweight-metrics';

const COLORS = ['#fdce2a', '#0fa960', '#f97316', '#3b82f6', '#8b5cf6'];

export function StatisticsTab() {
  const stats = mockStatistics;
  const activeTab = 'overview'; // Estado para controlar la pestaña activa

  const statCards = [
    {
      title: 'Total Estudiantes',
      value: stats.totalStudents.toLocaleString(),
      description: 'Estudiantes registrados',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      change: '+12%'
    },
    {
      title: 'Cursos Activos',
      value: stats.activeCourses.toString(),
      description: 'Cursos en progreso',
      icon: BookOpen,
      color: 'from-primary to-primary/80',
      change: '+8%'
    },
    {
      title: 'Beneficios Otorgados',
      value: stats.benefitsGranted.toLocaleString(),
      description: 'Beneficios entregados',
      icon: Gift,
      color: 'from-secondary to-secondary/80',
      change: '+23%'
    },
    {
      title: 'Tasa de Asistencia',
      value: `${stats.attendanceRate}%`,
      description: 'Promedio mensual',
      icon: TrendingUp,
      color: 'from-orange-500 to-orange-600',
      change: '+5%'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Estadísticas</h2>
          <p className="text-muted-foreground">
            Resumen general del desempeño del programa
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>Actualizado: {new Date().toLocaleDateString('es-CO')}</span>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">
            <UserCheck className="mr-2 h-4 w-4" />
            Resumen
          </TabsTrigger>
          <TabsTrigger value="overweight">
            <Scale className="mr-2 h-4 w-4" />
            Métricas de Peso
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {statCards.map((stat, index) => (
              <Card key={index} className="col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <stat.icon className="h-5 w-5" />
                    <span>{stat.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      {stat.description}
                    </p>
                    <span className="text-xs text-green-600 font-medium">
                      {stat.change}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Attendance Chart */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>Tendencia de Asistencia</span>
                </CardTitle>
                <CardDescription>
                  Porcentaje de asistencia mensual durante el año
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={mockAttendanceData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[75, 95]} />
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'Asistencia']}
                      labelStyle={{ color: 'hsl(var(--foreground))' }}
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="attendance" 
                      stroke="#0fa960" 
                      strokeWidth={3}
                      dot={{ fill: '#0fa960', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: '#0fa960', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Course Performance Chart */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>Rendimiento por Curso</span>
                </CardTitle>
                <CardDescription>
                  Número de estudiantes y tasa de finalización
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mockCourseData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis 
                      dataKey="name" 
                      angle={-45}
                      textAnchor="end"
                      height={80}
                      fontSize={12}
                    />
                    <YAxis />
                    <Tooltip 
                      formatter={(value, name) => [
                        name === 'students' ? `${value} estudiantes` : `${value}% completado`,
                        name === 'students' ? 'Estudiantes' : 'Finalización'
                      ]}
                      labelStyle={{ color: 'hsl(var(--foreground))' }}
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="students" fill="#fdce2a" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Additional Metrics */}
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5" />
                  <span>Certificaciones</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Completadas</span>
                    <span className="font-bold">289</span>
                  </div>
                  <Progress value={85} className="h-2" />
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>Meta: 340</span>
                    <span>85% completado</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Participación</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Activos</span>
                    <span className="font-bold">1,089</span>
                  </div>
                  <Progress value={87} className="h-2" />
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>Total: 1,247</span>
                    <span>87% activos</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Crecimiento</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Este mes</span>
                    <span className="font-bold text-green-600">+156</span>
                  </div>
                  <Progress value={78} className="h-2" />
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>Meta: 200</span>
                    <span>78% de la meta</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Overweight Tab */}
        <TabsContent value="overweight" className="space-y-4">
          <OverweightMetrics data={stats.overweightMetrics} />
        </TabsContent>
      </Tabs>
    </div>
  );
}