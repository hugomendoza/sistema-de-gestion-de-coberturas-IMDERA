'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Users, Scale, Activity, TrendingUp } from 'lucide-react';
import { Statistics } from '@/lib/types';

interface OverweightMetricsProps {
  data: Statistics['overweightMetrics'];
}

export function OverweightMetrics({ data }: OverweightMetricsProps) {
  // Datos para el gráfico de barras por género
  const genderData = [
    {
      name: 'Masculino',
      'Peso normal': Math.round((data.byGender.male.normal / data.byGender.male.total) * 100),
      'Sobrepeso': Math.round((data.byGender.male.overweight / data.byGender.male.total) * 100),
      'Obesidad': Math.round((data.byGender.male.obesity / data.byGender.male.total) * 100),
    },
    {
      name: 'Femenino',
      'Peso normal': Math.round((data.byGender.female.normal / data.byGender.female.total) * 100),
      'Sobrepeso': Math.round((data.byGender.female.overweight / data.byGender.female.total) * 100),
      'Obesidad': Math.round((data.byGender.female.obesity / data.byGender.female.total) * 100),
    },
  ];

  // Datos para el gráfico de barras por grupo de edad
  const ageGroupData = Object.entries(data.byAgeGroup).map(([ageGroup, groupData]) => ({
    name: ageGroup,
    'Peso normal': Math.round((groupData.normal / groupData.total) * 100),
    'Sobrepeso': Math.round((groupData.overweight / groupData.total) * 100),
    'Obesidad': Math.round((groupData.obesity / groupData.total) * 100),
  }));

  // Datos para el gráfico de líneas de tendencia
  const trendData = data.monthlyTrends;

  // Colores para los gráficos
  const COLORS = {
    normal: '#10b981', // verde
    overweight: '#f59e0b', // amarillo
    obesity: '#ef4444', // rojo
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Estudiantes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalStudents}</div>
            <p className="text-xs text-muted-foreground">en seguimiento</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Peso Normal</CardTitle>
            <Scale className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: COLORS.normal }}>
              {Math.round(
                ((data.byGender.male.normal + data.byGender.female.normal) / data.totalStudents) * 100
              )}%
            </div>
            <p className="text-xs text-muted-foreground">de la población</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sobrepeso</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: COLORS.overweight }}>
              {Math.round(
                ((data.byGender.male.overweight + data.byGender.female.overweight) / data.totalStudents) * 100
              )}%
            </div>
            <p className="text-xs text-muted-foreground">de la población</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Obesidad</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: COLORS.obesity }}>
              {Math.round(
                ((data.byGender.male.obesity + data.byGender.female.obesity) / data.totalStudents) * 100
              )}%
            </div>
            <p className="text-xs text-muted-foreground">de la población</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="gender" className="space-y-4">
        <TabsList>
          <TabsTrigger value="gender">Por Género</TabsTrigger>
          <TabsTrigger value="age">Por Edad</TabsTrigger>
          <TabsTrigger value="trend">Tendencia</TabsTrigger>
        </TabsList>
        
        <TabsContent value="gender" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Distribución por Género</CardTitle>
              <CardDescription>
                Porcentaje de estudiantes por categoría de peso según género
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={genderData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis unit="%" domain={[0, 100]} />
                  <Tooltip formatter={(value) => [`${value}%`, 'Porcentaje']} />
                  <Legend />
                  <Bar dataKey="Peso normal" fill={COLORS.normal} />
                  <Bar dataKey="Sobrepeso" fill={COLORS.overweight} />
                  <Bar dataKey="Obesidad" fill={COLORS.obesity} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="age" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Distribución por Grupo de Edad</CardTitle>
              <CardDescription>
                Porcentaje de estudiantes por categoría de peso según grupo de edad
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={ageGroupData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis unit="%" domain={[0, 100]} />
                  <Tooltip formatter={(value) => [`${value}%`, 'Porcentaje']} />
                  <Legend />
                  <Bar dataKey="Peso normal" fill={COLORS.normal} />
                  <Bar dataKey="Sobrepeso" fill={COLORS.overweight} />
                  <Bar dataKey="Obesidad" fill={COLORS.obesity} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="trend" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tendencia Mensual</CardTitle>
              <CardDescription>
                Evolución del porcentaje de estudiantes por categoría de peso
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={trendData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis unit="%" domain={[0, 100]} />
                  <Tooltip formatter={(value) => [`${value}%`, 'Porcentaje']} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="normal" 
                    name="Peso Normal" 
                    stroke={COLORS.normal} 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="overweight" 
                    name="Sobrepeso" 
                    stroke={COLORS.overweight} 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="obesity" 
                    name="Obesidad" 
                    stroke={COLORS.obesity} 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
