'use client';

import { format, addDays, isToday, isSameDay, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface WeeklyCalendarProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  className?: string;
}

export function WeeklyCalendar({ selectedDate, onDateChange, className }: WeeklyCalendarProps) {
  const startOfWeek = new Date(selectedDate);
  startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay() + 1); // Lunes de la semana actual

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const day = addDays(startOfWeek, i);
    return {
      date: day,
      dayName: format(day, 'EEE', { locale: es }),
      dayNumber: format(day, 'd'),
      isToday: isToday(day),
      isSelected: isSameDay(day, selectedDate),
    };
  });

  const handlePrevWeek = () => {
    const prevWeek = addDays(selectedDate, -7);
    onDateChange(prevWeek);
  };

  const handleNextWeek = () => {
    const nextWeek = addDays(selectedDate, 7);
    onDateChange(nextWeek);
  };

  return (
    <div className={cn("flex flex-col space-y-4", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          {format(selectedDate, 'MMMM yyyy', { locale: es })}
        </h3>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon" onClick={handlePrevWeek}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleNextWeek}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {weekDays.map((day) => (
          <button
            key={day.date.toString()}
            type="button"
            onClick={() => onDateChange(day.date)}
            className={cn(
              "flex flex-col items-center justify-center p-2 rounded-lg transition-colors",
              day.isToday && "bg-muted/50",
              day.isSelected 
                ? "bg-primary text-primary-foreground" 
                : "hover:bg-muted/50"
            )}
          >
            <span className="text-xs font-medium uppercase">{day.dayName}</span>
            <span className={cn(
              "mt-1 text-lg font-semibold",
              day.isToday && !day.isSelected ? "text-primary" : ""
            )}>
              {day.dayNumber}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
