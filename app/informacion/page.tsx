"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  format,
  parseISO,
  isSameDay,
  addDays,
  subDays,
  startOfWeek,
  addWeeks,
  isSameWeek,
} from "date-fns";
import { es } from "date-fns/locale";
import {
  Calendar as CalendarIcon,
  Clock,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { mockClasses } from "@/lib/mock-data";
import { ClassCard } from "@/components/shared/class-card";

// Función para obtener los días de la semana actual
function getWeekDays(date: Date): Date[] {
  const start = startOfWeek(date, { weekStartsOn: 1 }); // Lunes como primer día de la semana
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
}

export default function InformacionPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentWeek, setCurrentWeek] = useState<Date[]>(
    getWeekDays(new Date())
  );
  const [selectedDay, setSelectedDay] = useState(new Date());

  // Actualizar la semana cuando cambia la fecha actual
  useEffect(() => {
    setCurrentWeek(getWeekDays(currentDate));
  }, [currentDate]);

  // Navegación entre semanas
  const goToPreviousWeek = () => {
    setCurrentDate((prev) => subDays(prev, 7));
  };

  const goToNextWeek = () => {
    setCurrentDate((prev) => addDays(prev, 7));
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDay(today);
    if (scrollContainerRef.current) {
      const todayElement = document.getElementById("today");
      todayElement?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  };

  // Filtrar clases por día seleccionado y búsqueda
  const filteredClasses = useMemo(() => {
    return mockClasses.filter((classItem) => {
      const classDate = parseISO(classItem.date);
      const matchesDate = isSameDay(classDate, selectedDay);
      const matchesSearch =
        searchQuery === "" ||
        classItem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        classItem.instructor.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      return matchesDate && matchesSearch;
    });
  }, [selectedDay, searchQuery]);

  // Agrupar clases por hora para el día seleccionado
  const classesByTime = useMemo(() => {
    const groups: Record<string, typeof filteredClasses> = {};

    filteredClasses.forEach((classItem) => {
      if (!groups[classItem.time]) {
        groups[classItem.time] = [];
      }
      groups[classItem.time].push(classItem);
    });

    return groups;
  }, [filteredClasses]);

  // Obtener información del día seleccionado
  const selectedDayName = format(selectedDay, "EEEE", { locale: es });
  const formattedSelectedDate = format(selectedDay, "d 'de' MMMM 'de' yyyy", {
    locale: es,
  });
  const today = new Date();
  const isToday = isSameDay(selectedDay, today);

  return (
    <div className='container mx-auto py-6 px-2 sm:px-4'>
      <div className='flex flex-col space-y-6'>
        {/* Header */}
        <div className='text-center px-2'>
          <h1 className='text-2xl sm:text-3xl font-bold tracking-tight'>
            Clases Programadas
          </h1>
          <p className='text-muted-foreground mt-1 text-sm sm:text-base'>
            Consulta las clases disponibles y planifica tu semana
          </p>
        </div>

        {/* Search Bar arriba */}
        <div className='px-2'>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
            <Input
              type='search'
              placeholder='Buscar por clase o instructor...'
              className='pl-10 w-full'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Week Navigation */}
        <div className='flex items-center justify-end'>
          <div className='flex items-center space-x-2'>
            <Button variant='ghost' size='icon' onClick={goToPreviousWeek}>
              <ChevronLeft className='h-4 w-4' />
            </Button>
            <span className='text-sm font-medium'>
              {format(currentWeek[0], "d MMM", { locale: es })} -{" "}
              {format(currentWeek[6], "d MMM yyyy", { locale: es })}
            </span>
            <Button variant='ghost' size='icon' onClick={goToNextWeek}>
              <ChevronRight className='h-4 w-4' />
            </Button>
          </div>
        </div>

        {/* Grid de 4 columnas para días y clases */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          {currentWeek.slice(0, 4).map((day) => {
            const dayClasses = mockClasses.filter((cls) =>
              isSameDay(parseISO(cls.date), day)
            );
            const dayName = format(day, "EEEE", { locale: es });
            const dayNumber = format(day, "d MMM", { locale: es });
            return (
              <div
                key={day.toString()}
                className='bg-card rounded-lg shadow flex flex-col'
              >
                <div className='mb-2'>
                  <h3 className='font-bold text-lg capitalize'>{dayName}</h3>
                  <span className='text-muted-foreground text-sm'>
                    {dayNumber}
                  </span>
                </div>
                {dayClasses.length > 0 ? (
                  <div className='flex flex-col gap-3'>
                    {dayClasses.map((classItem) => (
                      <ClassCard
                        key={classItem.id}
                        classData={classItem}
                        className='h-full'
                      />
                    ))}
                  </div>
                ) : (
                  <div className='flex flex-col items-center justify-center py-6 text-center border rounded-lg bg-muted/30'>
                    <CalendarIcon className='h-8 w-8 text-muted-foreground mb-2' />
                    <span className='text-sm text-muted-foreground'>
                      No hay clases
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
