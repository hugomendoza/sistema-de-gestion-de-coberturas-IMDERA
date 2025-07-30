import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Clock, MapPin, User, Users } from "lucide-react";
import { Class } from "@/lib/types";

interface ClassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  classData: Class;
}

export function ClassCard({ classData, className, ...props }: ClassCardProps) {
  const statusText = {
    programada: "Programada",
    "en-curso": "En curso",
    completada: "Finalizada",
    cancelada: "Cancelada",
  };

  const statusColors = {
    programada: "bg-blue-100 text-blue-800 border-blue-200",
    "en-curso": "bg-green-100 text-green-800 border-green-200",
    completada: "bg-gray-100 text-gray-800 border-gray-200",
    cancelada: "bg-red-100 text-red-800 border-red-200",
  };

  const statusClass =
    statusColors[classData.status] || "bg-gray-100 text-gray-800";
  // Usar studentCount en vez de registeredStudents
  const availabilityPercentage = Math.min(
    100,
    (classData.studentCount / classData.maxStudents) * 100
  );

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all hover:shadow-md h-full flex flex-col border",
        className
      )}
      {...props}
    >
      <CardHeader className='p-4 pb-2'>
        <div className='flex justify-between items-start gap-2'>
          <CardTitle className='text-base font-semibold line-clamp-2 leading-tight'>
            {classData.name}
          </CardTitle>
          <Badge
            variant='outline'
            className={cn(
              "text-xs font-medium whitespace-nowrap flex-shrink-0",
              statusClass
            )}
          >
            {statusText[classData.status] || classData.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className='p-4 pt-0 flex-1 flex flex-col'>
        <div className='space-y-3 flex-1'>
          <div className='flex items-center justify-between text-sm'>
            <div className='flex items-center text-muted-foreground'>
              <Clock className='h-3.5 w-3.5 mr-1.5 text-muted-foreground/70' />
              <span>{classData.time}</span>
            </div>
            <div className='flex items-center text-muted-foreground'>
              <Users className='h-3.5 w-3.5 mr-1.5 text-muted-foreground/70' />
              <span>
                {classData.studentCount}/{classData.maxStudents}
              </span>
            </div>
          </div>

          <div className='space-y-1'>
            <div className='flex items-start text-sm text-muted-foreground'>
              <User className='h-3.5 w-3.5 mt-0.5 mr-1.5 flex-shrink-0 text-muted-foreground/70' />
              <span className='line-clamp-2'>{classData.instructor.name}</span>
            </div>
            <div className='flex items-start text-sm text-muted-foreground'>
              <MapPin className='h-3.5 w-3.5 mt-0.5 mr-1.5 flex-shrink-0 text-muted-foreground/70' />
              <span className='line-clamp-2'>{classData.location}</span>
            </div>
          </div>

          <div className='pt-1'>
            <div className='flex justify-between items-center text-xs text-muted-foreground mb-1'>
              <span>Disponibilidad</span>
              <span>{Math.round(availabilityPercentage)}%</span>
            </div>
            <div className='w-full bg-gray-100 rounded-full h-1.5'>
              <div
                className={cn(
                  "h-full rounded-full",
                  availabilityPercentage > 75
                    ? "bg-green-500"
                    : availabilityPercentage > 25
                    ? "bg-yellow-500"
                    : "bg-red-500"
                )}
                style={{ width: `${availabilityPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
