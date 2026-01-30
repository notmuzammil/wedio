import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  XCircle,
  Clock 
} from "lucide-react";

interface AvailabilityCalendarProps {
  availableDates?: string[];
  bookedDates?: string[];
  onDateToggle?: (date: string) => void;
  readOnly?: boolean;
}

const AvailabilityCalendar = ({ 
  availableDates = [], 
  bookedDates = [], 
  onDateToggle,
  readOnly = false 
}: AvailabilityCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const isAvailable = (date: Date) => {
    return availableDates.includes(formatDate(date));
  };

  const isBooked = (date: Date) => {
    return bookedDates.includes(formatDate(date));
  };

  const isPast = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const handleDateClick = (date: Date) => {
    if (readOnly || isPast(date)) return;
    onDateToggle?.(formatDate(date));
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getDayStatus = (date: Date) => {
    if (isPast(date)) return 'past';
    if (isBooked(date)) return 'booked';
    if (isAvailable(date)) return 'available';
    return 'unavailable';
  };

  const getDayClassName = (date: Date) => {
    const status = getDayStatus(date);
    const baseClasses = "w-10 h-10 flex items-center justify-center text-sm rounded-lg transition-colors";
    
    switch (status) {
      case 'past':
        return `${baseClasses} text-gray-300 cursor-not-allowed`;
      case 'booked':
        return `${baseClasses} bg-red-100 text-red-800 cursor-default`;
      case 'available':
        return `${baseClasses} bg-green-100 text-green-800 hover:bg-green-200 cursor-pointer`;
      case 'unavailable':
        return `${baseClasses} text-gray-500 hover:bg-gray-100 ${readOnly ? 'cursor-default' : 'cursor-pointer'}`;
      default:
        return baseClasses;
    }
  };

  const days = getDaysInMonth(currentDate);

  return (
    <Card className="border-rose-gold/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-rose-gold" />
            <span>Availability Calendar</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigateMonth('prev')}
              className="border-rose-gold/30 hover:border-rose-gold"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-lg font-semibold min-w-[140px] text-center">
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigateMonth('next')}
              className="border-rose-gold/30 hover:border-rose-gold"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-6 text-xs">
          <div className="flex items-center space-x-1">
            <CheckCircle className="h-3 w-3 text-green-500" />
            <span>Available</span>
          </div>
          <div className="flex items-center space-x-1">
            <XCircle className="h-3 w-3 text-red-500" />
            <span>Booked</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-3 w-3 text-gray-400" />
            <span>Unavailable</span>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Day headers */}
          {daysOfWeek.map(day => (
            <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
              {day}
            </div>
          ))}
          
          {/* Calendar days */}
          {days.map((date, index) => (
            <div key={index} className="p-1">
              {date ? (
                <button
                  onClick={() => handleDateClick(date)}
                  className={getDayClassName(date)}
                  disabled={readOnly || isPast(date)}
                  title={
                    isPast(date) ? 'Past date' :
                    isBooked(date) ? 'Booked' :
                    isAvailable(date) ? 'Available' : 'Click to set availability'
                  }
                >
                  {date.getDate()}
                </button>
              ) : (
                <div className="w-10 h-10" />
              )}
            </div>
          ))}
        </div>

        {!readOnly && (
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Click on dates to toggle availability
            </p>
            <div className="flex justify-center space-x-2">
              <Button variant="outline" size="sm" className="border-rose-gold/30 hover:border-rose-gold">
                Mark Range Available
              </Button>
              <Button variant="outline" size="sm" className="border-rose-gold/30 hover:border-rose-gold">
                Import from Google Calendar
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AvailabilityCalendar;
