import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { 
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Plus,
  X,
  CheckCircle,
  XCircle,
  Edit,
  Eye,
  MapPin,
  User,
  Phone
} from "lucide-react";

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

interface BookingDetails {
  id: string;
  clientName: string;
  eventType: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  location: string;
  phone: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  notes?: string;
}

interface DayAvailability {
  date: string;
  isAvailable: boolean;
  timeSlots: TimeSlot[];
  bookings: BookingDetails[];
  notes?: string;
}

interface VendorAvailabilityCalendarProps {
  vendorId: string;
  isOwner?: boolean;
}

const VendorAvailabilityCalendar = ({ vendorId, isOwner = false }: VendorAvailabilityCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewBookingOpen, setIsViewBookingOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<BookingDetails | null>(null);
  
  // Sample availability data
  const [availabilityData, setAvailabilityData] = useState<{ [key: string]: DayAvailability }>({
    '2024-01-15': {
      date: '2024-01-15',
      isAvailable: true,
      timeSlots: [
        { id: '1', startTime: '09:00', endTime: '12:00', isAvailable: false },
        { id: '2', startTime: '14:00', endTime: '18:00', isAvailable: true }
      ],
      bookings: [
        {
          id: '1',
          clientName: 'Sarah Ahmed',
          eventType: 'Wedding Photography',
          eventDate: '2024-01-15',
          startTime: '09:00',
          endTime: '12:00',
          location: 'Pearl Continental Hotel, Karachi',
          phone: '+92-300-1234567',
          status: 'confirmed',
          notes: 'Full day wedding coverage required'
        }
      ]
    },
    '2024-01-20': {
      date: '2024-01-20',
      isAvailable: true,
      timeSlots: [
        { id: '3', startTime: '10:00', endTime: '14:00', isAvailable: true },
        { id: '4', startTime: '16:00', endTime: '20:00', isAvailable: true }
      ],
      bookings: []
    },
    '2024-01-25': {
      date: '2024-01-25',
      isAvailable: false,
      timeSlots: [],
      bookings: [],
      notes: 'Personal leave - unavailable'
    }
  });

  const [dayForm, setDayForm] = useState({
    isAvailable: true,
    timeSlots: [{ startTime: '', endTime: '', isAvailable: true }],
    notes: ''
  });

  const monthNames = [
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
    
    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const formatDateKey = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const getDayStatus = (date: Date) => {
    const dateKey = formatDateKey(date);
    const dayData = availabilityData[dateKey];
    
    if (!dayData) return 'unset';
    if (!dayData.isAvailable) return 'unavailable';
    if (dayData.bookings.length > 0) return 'booked';
    return 'available';
  };

  const getDayStatusColor = (status: string) => {
    switch (status) {
      case 'booked': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'available': return 'bg-green-100 text-green-800 border-green-200';
      case 'unavailable': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-50 text-gray-600 hover:bg-gray-100';
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + (direction === 'next' ? 1 : -1));
    setCurrentDate(newDate);
  };

  const handleDateClick = (date: Date) => {
    if (isOwner) {
      setSelectedDate(date);
      const dateKey = formatDateKey(date);
      const dayData = availabilityData[dateKey];
      
      if (dayData) {
        setDayForm({
          isAvailable: dayData.isAvailable,
          timeSlots: dayData.timeSlots.map(slot => ({
            startTime: slot.startTime,
            endTime: slot.endTime,
            isAvailable: slot.isAvailable
          })),
          notes: dayData.notes || ''
        });
      } else {
        setDayForm({
          isAvailable: true,
          timeSlots: [{ startTime: '', endTime: '', isAvailable: true }],
          notes: ''
        });
      }
      
      setIsEditModalOpen(true);
    }
  };

  const handleViewBooking = (booking: BookingDetails) => {
    setSelectedBooking(booking);
    setIsViewBookingOpen(true);
  };

  const handleSaveAvailability = () => {
    if (selectedDate) {
      const dateKey = formatDateKey(selectedDate);
      
      const newTimeSlots: TimeSlot[] = dayForm.timeSlots
        .filter(slot => slot.startTime && slot.endTime)
        .map((slot, index) => ({
          id: `${dateKey}-${index}`,
          startTime: slot.startTime,
          endTime: slot.endTime,
          isAvailable: slot.isAvailable
        }));

      setAvailabilityData(prev => ({
        ...prev,
        [dateKey]: {
          ...prev[dateKey],
          date: dateKey,
          isAvailable: dayForm.isAvailable,
          timeSlots: newTimeSlots,
          notes: dayForm.notes,
          bookings: prev[dateKey]?.bookings || []
        }
      }));
      
      setIsEditModalOpen(false);
      toast.success("Availability updated successfully!");
    }
  };

  const addTimeSlot = () => {
    if (dayForm.timeSlots.length < 6) {
      setDayForm(prev => ({
        ...prev,
        timeSlots: [...prev.timeSlots, { startTime: '', endTime: '', isAvailable: true }]
      }));
    }
  };

  const removeTimeSlot = (index: number) => {
    setDayForm(prev => ({
      ...prev,
      timeSlots: prev.timeSlots.filter((_, i) => i !== index)
    }));
  };

  const updateTimeSlot = (index: number, field: string, value: any) => {
    setDayForm(prev => ({
      ...prev,
      timeSlots: prev.timeSlots.map((slot, i) => 
        i === index ? { ...slot, [field]: value } : slot
      )
    }));
  };

  const updateBookingStatus = (bookingId: string, newStatus: 'confirmed' | 'cancelled') => {
    setAvailabilityData(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(dateKey => {
        updated[dateKey] = {
          ...updated[dateKey],
          bookings: updated[dateKey].bookings.map(booking =>
            booking.id === bookingId ? { ...booking, status: newStatus } : booking
          )
        };
      });
      return updated;
    });
    
    toast.success(`Booking ${newStatus} successfully!`);
    setIsViewBookingOpen(false);
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="space-y-6">
      <Card className="border-rose-gold/20">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-rose-gold" />
              <span>Availability Calendar</span>
            </CardTitle>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-3 h-3 bg-green-100 border border-green-200 rounded"></div>
                <span>Available</span>
                <div className="w-3 h-3 bg-blue-100 border border-blue-200 rounded"></div>
                <span>Booked</span>
                <div className="w-3 h-3 bg-red-100 border border-red-200 rounded"></div>
                <span>Unavailable</span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigateMonth('prev')}
              className="border-rose-gold/30"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <h3 className="text-xl font-semibold text-foreground">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigateMonth('next')}
              className="border-rose-gold/30"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Days of week header */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {daysOfWeek.map(day => (
              <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {days.map((day, index) => {
              if (!day) {
                return <div key={index} className="aspect-square"></div>;
              }

              const dateKey = formatDateKey(day);
              const dayData = availabilityData[dateKey];
              const status = getDayStatus(day);
              
              return (
                <div
                  key={day.getDate()}
                  className={`
                    aspect-square border-2 rounded-lg p-1 cursor-pointer transition-all
                    ${getDayStatusColor(status)}
                    ${isOwner ? 'hover:border-rose-gold' : ''}
                  `}
                  onClick={() => handleDateClick(day)}
                >
                  <div className="h-full flex flex-col">
                    <div className="text-sm font-medium text-center">
                      {day.getDate()}
                    </div>
                    
                    {dayData && (
                      <div className="flex-1 space-y-1 mt-1">
                        {/* Time slots indicator */}
                        {dayData.timeSlots.slice(0, 2).map((slot, i) => (
                          <div key={i} className="text-xs bg-white/50 rounded px-1 py-0.5 truncate">
                            {slot.startTime}-{slot.endTime}
                          </div>
                        ))}
                        
                        {/* More indicator */}
                        {dayData.timeSlots.length > 2 && (
                          <div className="text-xs text-center text-muted-foreground">
                            +{dayData.timeSlots.length - 2} more
                          </div>
                        )}
                        
                        {/* Booking indicator */}
                        {dayData.bookings.length > 0 && (
                          <div className="text-xs bg-blue-500 text-white rounded px-1 py-0.5 text-center">
                            {dayData.bookings.length} booking{dayData.bookings.length > 1 ? 's' : ''}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Bookings */}
      <Card className="border-rose-gold/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-rose-gold" />
            <span>Upcoming Bookings</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.values(availabilityData)
              .filter(day => day.bookings.length > 0)
              .map(day => 
                day.bookings.map(booking => (
                  <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">{booking.clientName}</h4>
                        <p className="text-sm text-muted-foreground">{booking.eventType}</p>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                          <span>📅 {new Date(booking.eventDate).toLocaleDateString()}</span>
                          <span>🕒 {booking.startTime} - {booking.endTime}</span>
                          <span className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {booking.location}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Badge className={
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }>
                        {booking.status === 'confirmed' && <CheckCircle className="h-3 w-3 mr-1" />}
                        {booking.status === 'cancelled' && <XCircle className="h-3 w-3 mr-1" />}
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </Badge>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewBooking(booking)}
                        className="border-rose-gold/30"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            
            {Object.values(availabilityData).every(day => day.bookings.length === 0) && (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No upcoming bookings</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Edit Availability Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Edit Availability - {selectedDate?.toLocaleDateString()}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="available"
                checked={dayForm.isAvailable}
                onCheckedChange={(checked) => setDayForm(prev => ({ ...prev, isAvailable: !!checked }))}
              />
              <Label htmlFor="available">Available for bookings</Label>
            </div>

            {dayForm.isAvailable && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Time Slots</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addTimeSlot}
                    className="border-rose-gold/30"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Slot
                  </Button>
                </div>

                {dayForm.timeSlots.map((slot, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      type="time"
                      value={slot.startTime}
                      onChange={(e) => updateTimeSlot(index, 'startTime', e.target.value)}
                      className="border-rose-gold/30"
                    />
                    <span>to</span>
                    <Input
                      type="time"
                      value={slot.endTime}
                      onChange={(e) => updateTimeSlot(index, 'endTime', e.target.value)}
                      className="border-rose-gold/30"
                    />
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={slot.isAvailable}
                        onCheckedChange={(checked) => updateTimeSlot(index, 'isAvailable', !!checked)}
                      />
                      <Label className="text-sm">Available</Label>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeTimeSlot(index)}
                      className="border-red-200 hover:border-red-500"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-2">
              <Label>Notes (Optional)</Label>
              <Textarea
                value={dayForm.notes}
                onChange={(e) => setDayForm(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Add any notes about this day..."
                className="border-rose-gold/30"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="hero" onClick={handleSaveAvailability}>
                Save Availability
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Booking Modal */}
      <Dialog open={isViewBookingOpen} onOpenChange={setIsViewBookingOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
          </DialogHeader>
          
          {selectedBooking && (
            <div className="space-y-4 py-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Client:</span>
                  <span>{selectedBooking.clientName}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Event:</span>
                  <span>{selectedBooking.eventType}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Date & Time:</span>
                  <span>{new Date(selectedBooking.eventDate).toLocaleDateString()} at {selectedBooking.startTime}-{selectedBooking.endTime}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Location:</span>
                  <span>{selectedBooking.location}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Phone:</span>
                  <span>{selectedBooking.phone}</span>
                </div>

                {selectedBooking.notes && (
                  <div>
                    <span className="font-medium">Notes:</span>
                    <p className="text-muted-foreground mt-1">{selectedBooking.notes}</p>
                  </div>
                )}
              </div>

              {isOwner && selectedBooking.status === 'pending' && (
                <div className="flex justify-end space-x-2 pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={() => updateBookingStatus(selectedBooking.id, 'cancelled')}
                    className="border-red-200 hover:border-red-500 hover:text-red-500"
                  >
                    Decline
                  </Button>
                  <Button
                    variant="hero"
                    onClick={() => updateBookingStatus(selectedBooking.id, 'confirmed')}
                  >
                    Confirm Booking
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VendorAvailabilityCalendar;
