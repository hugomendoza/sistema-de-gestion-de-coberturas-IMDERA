import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Users, BookOpen, UserCheck } from 'lucide-react';

// Datos de ejemplo para las estadísticas
const statsData = [
  { id: 1, title: 'Clases Totales', value: '24', icon: <BookOpen className="h-4 w-4 text-muted-foreground" /> },
  { id: 2, title: 'Asistencia Promedio', value: '85%', icon: <UserCheck className="h-4 w-4 text-muted-foreground" /> },
  { id: 3, title: 'Promotores Activos', value: '8', icon: <Users className="h-4 w-4 text-muted-foreground" /> },
  { id: 4, title: 'Alumnos Registrados', value: '156', icon: <Users className="h-4 w-4 text-muted-foreground" /> },
];

// Datos para el gráfico de barras
const attendanceData = [
  { name: 'Lun', asistencia: 75 },
  { name: 'Mar', asistencia: 82 },
  { name: 'Mié', asistencia: 88 },
  { name: 'Jue', asistencia: 91 },
  { name: 'Vie', asistencia: 85 },
  { name: 'Sáb', asistencia: 73 },
  { name: 'Dom', asistencia: 60 },
];

// Datos para el gráfico de pastel
const classDistribution = [
  { name: 'Fútbol', value: 35 },
  { name: 'Básquetbol', value: 25 },
  { name: 'Voleibol', value: 20 },
  { name: 'Atletismo', value: 15 },
  { name: 'Otros', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export function StatsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Panel de Estadísticas</h2>
        <p className="text-muted-foreground">
          Visualiza las métricas clave de la plataforma
        </p>
      </div>

      {/* Tarjetas de métricas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat) => (
          <Card key={stat.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className="h-4 w-4">
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Gráficos */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Asistencia semanal</CardTitle>
            <CardDescription>Porcentaje de asistencia por día de la semana</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="asistencia" fill="#0fa960" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Distribución de Clases</CardTitle>
            <CardDescription>Porcentaje de alumnos por disciplina</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={classDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {classDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default StatsPage;
