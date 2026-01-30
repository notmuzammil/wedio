import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useNotifications, createBookingNotification, createPaymentNotification } from "@/contexts/NotificationContext";
import { 
  Calendar,
  Heart,
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle,
  Users,
  Camera,
  Utensils,
  Crown,
  Palette,
  Star,
  DollarSign,
  Plus,
  Edit,
  Trash2,
  MessageSquare,
  FileText,
  TrendingUp,
  Award,
  Bookmark,
  Bell,
  Settings,
  Download,
  Share2,
  Upload,
  CalendarDays,
  CreditCard,
  Package
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface BookingStatus {
  id: string;
  vendor: string;
  service: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  date: string;
  amount: number;
  paymentStatus: 'paid' | 'pending' | 'overdue';
  icon: string;
  category: string;
}

interface WeddingEvent {
  id: string;
  name: string;
  date: string;
  time: string;
  venue: string;
  status: 'confirmed' | 'tentative' | 'cancelled';
  guestCount: number;
}

const UserDashboard = () => {
  const navigate = useNavigate();
  const { showToastNotification, addNotification } = useNotifications();
  
  // Mock user data
  const [user] = useState({
    name: "Sarah Ahmed",
    email: "sarah.ahmed@email.com",
    phone: "+92 300 1234567",
    weddingDate: "2024-06-15",
    partner: "Ahmed Khan",
    venue: "Royal Gardens Banquet Hall",
    guestCount: 300,
    budget: 1500000,
    spent: 850000,
    avatar: "/api/placeholder/100/100"
  });

  const [bookings, setBookings] = useState<BookingStatus[]>([
    {
      id: "1",
      vendor: "Royal Gardens Banquet Hall",
      service: "Wedding Venue",
      status: "confirmed",
      date: "2024-06-15",
      amount: 250000,
      paymentStatus: "paid",
      icon: "🏰",
      category: "venue"
    },
    {
      id: "2", 
      vendor: "Traditional Delights Catering",
      service: "Wedding Catering",
      status: "confirmed",
      date: "2024-06-15",
      amount: 300000,
      paymentStatus: "pending",
      icon: "🍽️",
      category: "catering"
    },
    {
      id: "3",
      vendor: "Capture Moments Photography",
      service: "Wedding Photography",
      status: "pending",
      date: "2024-06-15", 
      amount: 120000,
      paymentStatus: "pending",
      icon: "📸",
      category: "photography"
    },
    {
      id: "4",
      vendor: "Bridal Beauty Studio",
      service: "Bridal Makeup",
      status: "confirmed",
      date: "2024-06-15",
      amount: 35000,
      paymentStatus: "overdue",
      icon: "💄",
      category: "makeup"
    },
    {
      id: "5",
      vendor: "Elegant Couture",
      service: "Bridal Outfit",
      status: "pending",
      date: "2024-06-10",
      amount: 75000,
      paymentStatus: "pending",
      icon: "👗",
      category: "attire"
    }
  ]);

  const [events, setEvents] = useState<WeddingEvent[]>([
    {
      id: "1",
      name: "Mehendi Ceremony",
      date: "2024-06-13",
      time: "6:00 PM",
      venue: "Home",
      status: "confirmed",
      guestCount: 50
    },
    {
      id: "2",
      name: "Nikah Ceremony", 
      date: "2024-06-14",
      time: "7:00 PM",
      venue: "Local Masjid",
      status: "confirmed",
      guestCount: 100
    },
    {
      id: "3",
      name: "Wedding Reception",
      date: "2024-06-15",
      time: "8:00 PM",
      venue: "Royal Gardens Banquet Hall",
      status: "confirmed",
      guestCount: 300
    }
  ]);

  const [checklist] = useState([
    { id: "1", task: "Book Wedding Venue", completed: true, category: "venue" },
    { id: "2", task: "Select Catering Service", completed: true, category: "catering" },
    { id: "3", task: "Hire Photographer", completed: false, category: "photography" },
    { id: "4", task: "Book Makeup Artist", completed: true, category: "makeup" },
    { id: "5", task: "Order Wedding Dress", completed: false, category: "attire" },
    { id: "6", task: "Send Invitations", completed: false, category: "planning" },
    { id: "7", task: "Book Transportation", completed: false, category: "transport" },
    { id: "8", task: "Arrange Decorations", completed: false, category: "decoration" },
    { id: "9", task: "Plan Honeymoon", completed: false, category: "honeymoon" },
    { id: "10", task: "Marriage Registration", completed: false, category: "legal" }
  ]);

  const completedTasks = checklist.filter(item => item.completed).length;
  const progressPercentage = (completedTasks / checklist.length) * 100;
  const budgetUsedPercentage = (user.spent / user.budget) * 100;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 bg-green-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'cancelled': return 'text-red-600 bg-red-50';
      case 'overdue': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'text-green-600 bg-green-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'overdue': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const handlePaymentReminder = (booking: BookingStatus) => {
    showToastNotification(createPaymentNotification(booking.vendor, booking.amount, "Tomorrow"));
    toast.success("Payment reminder sent!");
  };

  const handleBookingAction = (bookingId: string, action: 'confirm' | 'cancel') => {
    setBookings(prev => 
      prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: action === 'confirm' ? 'confirmed' : 'cancelled' }
          : booking
      )
    );

    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
      if (action === 'confirm') {
        showToastNotification(createBookingNotification(booking.vendor, booking.date, true));
      }
      toast.success(`Booking ${action === 'confirm' ? 'confirmed' : 'cancelled'} successfully!`);
    }
  };

  const daysUntilWedding = Math.ceil((new Date(user.weddingDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div className="flex items-center space-x-4 mb-4 lg:mb-0">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-rose-gold text-white text-xl">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Welcome back, {user.name.split(' ')[0]}! 💕
                </h1>
                <p className="text-muted-foreground">
                  {daysUntilWedding > 0 
                    ? `${daysUntilWedding} days until your special day!`
                    : daysUntilWedding === 0 
                    ? "Today is your wedding day! 🎉"
                    : "Congratulations on your recent wedding! ✨"
                  }
                </p>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Button variant="outline" className="border-rose-gold/30 hover:border-rose-gold">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="hero">
                <Plus className="h-4 w-4 mr-2" />
                Add Vendor
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-rose-gold/20">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-rose-gold/10 rounded-lg">
                    <Calendar className="h-6 w-6 text-rose-gold" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Wedding Date</p>
                    <p className="text-lg font-semibold">{new Date(user.weddingDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-rose-gold/20">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tasks Complete</p>
                    <p className="text-lg font-semibold">{completedTasks}/{checklist.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-rose-gold/20">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Budget Used</p>
                    <p className="text-lg font-semibold">{budgetUsedPercentage.toFixed(0)}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-rose-gold/20">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Guests</p>
                    <p className="text-lg font-semibold">{user.guestCount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
            <TabsTrigger value="checklist">Checklist</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Progress Card */}
              <Card className="lg:col-span-2 border-rose-gold/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-rose-gold" />
                    <span>Wedding Planning Progress</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Overall Progress</span>
                      <span className="text-sm text-muted-foreground">{completedTasks}/{checklist.length} tasks</span>
                    </div>
                    <Progress value={progressPercentage} className="h-3" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Budget Utilization</span>
                      <span className="text-sm text-muted-foreground">Rs. {user.spent.toLocaleString()}/Rs. {user.budget.toLocaleString()}</span>
                    </div>
                    <Progress value={budgetUsedPercentage} className="h-3" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="text-center p-3 bg-rose-gold/5 rounded-lg">
                      <p className="text-2xl font-bold text-rose-gold">{daysUntilWedding}</p>
                      <p className="text-sm text-muted-foreground">Days to go</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">{bookings.filter(b => b.status === 'confirmed').length}</p>
                      <p className="text-sm text-muted-foreground">Confirmed Bookings</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Events */}
              <Card className="border-rose-gold/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CalendarDays className="h-5 w-5 text-rose-gold" />
                    <span>Upcoming Events</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {events.slice(0, 3).map((event) => (
                      <div key={event.id} className="flex items-start space-x-3">
                        <div className="p-2 bg-rose-gold/10 rounded-lg">
                          <Calendar className="h-4 w-4 text-rose-gold" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-sm">{event.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(event.date).toLocaleDateString()} at {event.time}
                          </p>
                          <p className="text-xs text-muted-foreground">{event.venue}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Bookings */}
            <Card className="border-rose-gold/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Bookmark className="h-5 w-5 text-rose-gold" />
                    <span>Recent Bookings</span>
                  </CardTitle>
                  <Button variant="outline" size="sm" onClick={() => navigate("/vendors")}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Vendor
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookings.slice(0, 5).map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border border-rose-gold/10 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <span className="text-2xl">{booking.icon}</span>
                        <div>
                          <p className="font-semibold">{booking.vendor}</p>
                          <p className="text-sm text-muted-foreground">{booking.service}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-semibold">Rs. {booking.amount.toLocaleString()}</p>
                          <Badge className={`text-xs ${getPaymentStatusColor(booking.paymentStatus)}`}>
                            {booking.paymentStatus}
                          </Badge>
                        </div>
                        <Badge className={`${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <Card className="border-rose-gold/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>All Bookings</CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                    <Button variant="hero" size="sm" onClick={() => navigate("/vendors")}>
                      <Plus className="h-4 w-4 mr-2" />
                      New Booking
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <Card key={booking.id} className="border-rose-gold/10">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            <span className="text-3xl">{booking.icon}</span>
                            <div>
                              <h3 className="font-semibold text-lg">{booking.vendor}</h3>
                              <p className="text-muted-foreground">{booking.service}</p>
                              <div className="flex items-center space-x-4 mt-2">
                                <div className="flex items-center space-x-1">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm">{new Date(booking.date).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm">Rs. {booking.amount.toLocaleString()}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col space-y-2 items-end">
                            <div className="flex space-x-2">
                              <Badge className={`${getStatusColor(booking.status)}`}>
                                {booking.status}
                              </Badge>
                              <Badge className={`${getPaymentStatusColor(booking.paymentStatus)}`}>
                                {booking.paymentStatus}
                              </Badge>
                            </div>

                            <div className="flex space-x-2">
                              {booking.status === 'pending' && (
                                <>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => handleBookingAction(booking.id, 'confirm')}
                                    className="border-green-200 text-green-700 hover:bg-green-50"
                                  >
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                    Confirm
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => handleBookingAction(booking.id, 'cancel')}
                                    className="border-red-200 text-red-700 hover:bg-red-50"
                                  >
                                    <Trash2 className="h-4 w-4 mr-1" />
                                    Cancel
                                  </Button>
                                </>
                              )}
                              {booking.paymentStatus !== 'paid' && (
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handlePaymentReminder(booking)}
                                  className="border-rose-gold/30 hover:border-rose-gold"
                                >
                                  <CreditCard className="h-4 w-4 mr-1" />
                                  Pay Now
                                </Button>
                              )}
                              <Button size="sm" variant="outline">
                                <MessageSquare className="h-4 w-4 mr-1" />
                                Contact
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Timeline Tab */}
          <TabsContent value="timeline" className="space-y-6">
            <Card className="border-rose-gold/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CalendarDays className="h-5 w-5 text-rose-gold" />
                  <span>Wedding Timeline</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {events.map((event, index) => (
                    <div key={event.id} className="flex items-start space-x-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-4 h-4 rounded-full ${
                          event.status === 'confirmed' ? 'bg-green-500' : 
                          event.status === 'tentative' ? 'bg-yellow-500' : 'bg-red-500'
                        }`} />
                        {index !== events.length - 1 && (
                          <div className="w-0.5 h-16 bg-gray-200 mt-2" />
                        )}
                      </div>
                      
                      <div className="flex-1 pb-8">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{event.name}</h3>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>{new Date(event.date).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>{event.time}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MapPin className="h-4 w-4" />
                                <span>{event.venue}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Users className="h-4 w-4" />
                                <span>{event.guestCount} guests</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Badge className={`${getStatusColor(event.status)}`}>
                              {event.status}
                            </Badge>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Budget Tab */}
          <TabsContent value="budget" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-rose-gold/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-rose-gold" />
                    <span>Budget Overview</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-6 bg-rose-gold/5 rounded-lg">
                    <p className="text-3xl font-bold text-rose-gold">Rs. {(user.budget - user.spent).toLocaleString()}</p>
                    <p className="text-muted-foreground">Remaining Budget</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Total Budget</span>
                      <span className="font-semibold">Rs. {user.budget.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Amount Spent</span>
                      <span className="font-semibold text-red-600">Rs. {user.spent.toLocaleString()}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg">
                      <span className="font-semibold">Remaining</span>
                      <span className="font-bold text-green-600">Rs. {(user.budget - user.spent).toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <Progress value={budgetUsedPercentage} className="h-3" />
                  <p className="text-center text-sm text-muted-foreground">
                    {budgetUsedPercentage.toFixed(1)}% of budget used
                  </p>
                </CardContent>
              </Card>

              <Card className="border-rose-gold/20">
                <CardHeader>
                  <CardTitle>Expense Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <span className="text-lg">{booking.icon}</span>
                          <div>
                            <p className="font-medium text-sm">{booking.service}</p>
                            <p className="text-xs text-muted-foreground">{booking.vendor}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">Rs. {booking.amount.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">
                            {((booking.amount / user.budget) * 100).toFixed(1)}% of budget
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Checklist Tab */}
          <TabsContent value="checklist" className="space-y-6">
            <Card className="border-rose-gold/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-rose-gold" />
                    <span>Wedding Planning Checklist</span>
                  </CardTitle>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-rose-gold">{completedTasks}/{checklist.length}</p>
                    <p className="text-sm text-muted-foreground">Tasks Complete</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {checklist.map((item) => (
                    <div key={item.id} className={`flex items-center space-x-4 p-4 rounded-lg border ${
                      item.completed 
                        ? 'border-green-200 bg-green-50' 
                        : 'border-rose-gold/20 bg-white'
                    }`}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        item.completed ? 'bg-green-500' : 'border-2 border-gray-300'
                      }`}>
                        {item.completed && <CheckCircle className="h-4 w-4 text-white" />}
                      </div>
                      <div className="flex-1">
                        <p className={`font-medium ${item.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {item.task}
                        </p>
                        <Badge variant="secondary" className="text-xs mt-1">
                          {item.category}
                        </Badge>
                      </div>
                      {!item.completed && (
                        <Button size="sm" variant="outline" className="border-rose-gold/30 hover:border-rose-gold">
                          Mark Done
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default UserDashboard;
