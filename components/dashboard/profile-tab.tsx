'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, Clock, Droplet, Moon, Zap, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { HealthMetric, HealthSummary } from '@/lib/types';
import { ChartTooltip } from '@/components/ui/chart';

// Datos mock para el perfil
const mockHealthData: HealthMetric[] = [
  { date: '2025-07-01', weight: 75, bodyFatPercentage: 22, energyLevel: 7, sleepHours: 7.5, stressLevel: 4 },
  { date: '2025-07-08', weight: 74.5, bodyFatPercentage: 21.8, energyLevel: 8, sleepHours: 8, stressLevel: 3 },
  { date: '2025-07-15', weight: 74, bodyFatPercentage: 21.5, energyLevel: 7, sleepHours: 7, stressLevel: 5 },
  { date: '2025-07-22', weight: 73.5, bodyFatPercentage: 21.2, energyLevel: 8, sleepHours: 7.5, stressLevel: 3 },
  { date: '2025-07-29', weight: 73, bodyFatPercentage: 20.9, energyLevel: 9, sleepHours: 8, stressLevel: 2 },
];

const mockHealthSummary: HealthSummary = {
  currentWeight: 73,
  weightChange: -2.67, // %
  avgSleep: 7.6,
  avgEnergy: 7.8,
  lastMeasurement: '2025-07-29',
  progress: {
    weight: mockHealthData.map(d => d.weight),
    bodyFat: mockHealthData.map(d => d.bodyFatPercentage),
    dates: mockHealthData.map(d => d.date.split('-').reverse().join('/'))
  }
};

export function ProfileTab() {
  const [timeRange, setTimeRange] = useState<'week' | 'month'>('week');
  const [isEditing, setIsEditing] = useState(false);
  
  const chartData = mockHealthData.map((data) => ({
    date: data.date.split('-').reverse().join('/'),
    weight: data.weight,
    bodyFat: data.bodyFatPercentage,
    energy: data.energyLevel,
    sleep: data.sleepHours,
    stress: data.stressLevel
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Mi Perfil de Salud</h2>
        <Button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Guardar Cambios' : 'Editar Perfil'}
        </Button>
      </div>

      {isEditing ? (
        <Card>
          <CardHeader>
            <CardTitle>Editar Información de Salud</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weight">Peso (kg)</Label>
                <Input id="weight" type="number" step="0.1" defaultValue={mockHealthSummary.currentWeight} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bodyFat">% Grasa Corporal</Label>
                <Input id="bodyFat" type="number" step="0.1" defaultValue={mockHealthData[mockHealthData.length - 1].bodyFatPercentage} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sleep">Horas de sueño</Label>
                <Input id="sleep" type="number" step="0.1" defaultValue={mockHealthData[mockHealthData.length - 1].sleepHours} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="energy">Nivel de Energía (1-10)</Label>
                <Input id="energy" type="number" min="1" max="10" defaultValue={mockHealthData[mockHealthData.length - 1].energyLevel} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stress">Nivel de Estrés (1-10)</Label>
                <Input id="stress" type="number" min="1" max="10" defaultValue={mockHealthData[mockHealthData.length - 1].stressLevel} />
              </div>
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setIsEditing(false)}>Cancelar</Button>
              <Button>Guardar Cambios</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Peso Actual</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockHealthSummary.currentWeight} kg</div>
              <p className="text-xs text-muted-foreground">
                {mockHealthSummary.weightChange < 0 ? '↓' : '↑'} {Math.abs(mockHealthSummary.weightChange)}% desde el inicio
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">% Grasa Corporal</CardTitle>
              <Droplet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockHealthData[mockHealthData.length - 1].bodyFatPercentage}%</div>
              <p className="text-xs text-muted-foreground">
                {mockHealthData[mockHealthData.length - 1].bodyFatPercentage < mockHealthData[0].bodyFatPercentage ? '↓' : '↑'} desde el inicio
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sueño Promedio</CardTitle>
              <Moon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockHealthSummary.avgSleep.toFixed(1)} hrs</div>
              <p className="text-xs text-muted-foreground">por noche</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Energía Promedio</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockHealthSummary.avgEnergy.toFixed(1)}/10</div>
              <p className="text-xs text-muted-foreground">nivel de energía</p>
            </CardContent>
          </Card>
        </div>
      )}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Progreso de Salud</CardTitle>
          <Tabs defaultValue="week" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="week" onClick={() => setTimeRange('week')}>Semanal</TabsTrigger>
              <TabsTrigger value="month" onClick={() => setTimeRange('month')}>Mensual</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <div className="h-full w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorBodyFat" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    yAxisId="left"
                    orientation="left"
                    stroke="hsl(var(--primary))"
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    yAxisId="right"
                    orientation="right"
                    stroke="hsl(var(--chart-1))"
                    axisLine={false}
                    tickLine={false}
                  />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <ChartTooltip 
                    content={({ active, payload, label }) => {
                      if (!active || !payload) return null;
                      return (
                        <div className="rounded-lg border bg-background p-4 shadow-sm">
                          <p className="text-sm font-medium text-muted-foreground">{label}</p>
                          <div className="mt-2 grid gap-2">
                            {payload.map((item, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <span 
                                  className="h-2 w-2 rounded-full" 
                                  style={{ 
                                    backgroundColor: item.color || 'hsl(var(--primary))' 
                                  }} 
                                />
                                <span className="text-sm">
                                  {item.name}: {item.value}
                                  {item.name.includes('Peso') ? ' kg' : 
                                   item.name.includes('Grasa') ? '%' : ''}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    }}
                  />
                  <Area 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="weight" 
                    name="Peso (kg)" 
                    stroke="hsl(var(--primary))"
                    fillOpacity={1} 
                    fill="url(#colorWeight)" 
                  />
                  <Area 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="bodyFat" 
                    name="% Grasa Corporal" 
                    stroke="hsl(var(--chart-1))"
                    fillOpacity={1} 
                    fill="url(#colorBodyFat)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Últimos Registros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...mockHealthData].reverse().map((record, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">
                      {new Date(record.date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm">{record.weight} kg</span>
                    <span className="text-sm">{record.bodyFatPercentage}% grasa</span>
                    <span className="text-sm">
                      <Zap className="inline h-3 w-3 text-yellow-500" /> {record.energyLevel}/10
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recomendaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-600">
                  <Moon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium">Calidad del Sueño</h4>
                  <p className="text-sm text-muted-foreground">
                    Tu promedio de sueño es de {mockHealthSummary.avgSleep.toFixed(1)} horas. Intenta mantener un horario regular de sueño.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-green-100 text-green-600">
                  <Activity className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium">Progreso de Peso</h4>
                  <p className="text-sm text-muted-foreground">
                    ¡Buen trabajo! Has bajado {Math.abs(mockHealthSummary.weightChange).toFixed(1)}% de tu peso inicial.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-purple-100 text-purple-600">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium">Nivel de Energía</h4>
                  <p className="text-sm text-muted-foreground">
                    Tu energía promedio es de {mockHealthSummary.avgEnergy.toFixed(1)}/10. Considera ajustar tu dieta o rutina de ejercicios.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
