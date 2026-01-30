import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import VendorProfile from "@/components/VendorProfile";
import VendorAvailabilityCalendar from "@/components/VendorAvailabilityCalendar";
import { 
  Building2,
  MapPin, 
  Utensils, 
  Camera, 
  Palette, 
  Users, 
  Crown,
  Brush,
  Heart,
  Plus,
  Edit,
  Trash2,
  Eye,
  Star,
  TrendingUp,
  Calendar,
  DollarSign,
  LogOut,
  Settings,
  CheckCircle,
  AlertCircle,
  Clock,
  Award,
  MessageSquare
} from "lucide-react";

const VendorDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [profileData, setProfileData] = useState({
    businessName: "Royal Gardens Banquet",
    businessType: "Venue & Catering", 
    location: "Clifton, Karachi",
    description: "Premium wedding venue with exquisite catering services, offering elegant spaces for unforgettable celebrations.",
    phone: "+92 21 1234567",
    email: "info@royalgardens.com",
    website: "www.royalgardens.com",
    rating: 4.8,
    reviewCount: 89,
    responseTime: "Within 2 hours",
    availability: "Available",
    highlights: [
      "Starting from PKR 2,50,000",
      "Catering up to 500 guests", 
      "Air Conditioned Halls",
      "Free Parking Available",
      "Professional Photography Allowed"
    ],
    verificationStatus: 'verified' as 'pending' | 'verified' | 'rejected' | 'not_submitted',
    cnicVerified: true,
    experienceYears: "8+ Years",
    totalBookings: 156
  });

  // Mock vendor data with enhanced information
  const vendorData = {
    ...profileData,
    rating: 4.8,
    totalBookings: 156,
    monthlyRevenue: "Rs. 8,50,000", 
    activeListings: 8,
    reviewCount: 89,
    responseTime: "Within 2 hours",
    availability: "Available",
    highlights: [
      "Starting from PKR 2,50,000",
      "Catering up to 500 guests",
      "Air Conditioned Halls", 
      "Free Parking Available",
      "Professional Photography Allowed"
    ]
  };

  const serviceCategories = [
    {
      id: "venues",
      name: "Venues",
      icon: MapPin,
      emoji: "🏛️",
      count: 3,
      color: "from-blue-500 to-blue-600"
    },
    {
      id: "catering",
      name: "Catering",
      icon: Utensils,
      emoji: "🍽️",
      count: 2,
      color: "from-green-500 to-green-600"
    },
    {
      id: "photography",
      name: "Photography",
      icon: Camera,
      emoji: "📸",
      count: 1,
      color: "from-purple-500 to-purple-600"
    },
    {
      id: "makeup",
      name: "Makeup Artists",
      icon: Brush,
      emoji: "💄",
      count: 0,
      color: "from-pink-500 to-pink-600"
    },
    {
      id: "wardrobe",
      name: "Wardrobe",
      icon: Crown,
      emoji: "👗",
      count: 0,
      color: "from-yellow-500 to-yellow-600"
    },
    {
      id: "henna",
      name: "Henna Artists",
      icon: Palette,
      emoji: "🎨",
      count: 0,
      color: "from-orange-500 to-orange-600"
    }
  ];

  const recentBookings = [
    {
      id: 1,
      customerName: "Ahmed & Fatima",
      service: "Wedding Venue + Catering",
      date: "2024-03-15",
      amount: "Rs. 4,50,000",
      status: "confirmed"
    },
    {
      id: 2,
      customerName: "Usman & Ayesha",
      service: "Wedding Venue",
      date: "2024-04-20",
      amount: "Rs. 2,80,000",
      status: "pending"
    },
    {
      id: 3,
      customerName: "Bilal & Sana",
      service: "Catering Only",
      date: "2024-03-28",
      amount: "Rs. 1,20,000",
      status: "confirmed"
    }
  ];

  const handleLogout = () => {
    navigate("/");
  };

  const handleAddService = (category: string) => {
    // Navigate to add service form
    navigate(`/vendor/add-service?category=${category}`);
  };

  const handleEditService = (serviceId: string) => {
    // Navigate to edit service form
    navigate(`/vendor/edit-service/${serviceId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-rose-gold/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-rose-gold to-rose-gold-light p-2 rounded-full">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">{vendorData.businessName}</h1>
                <p className="text-sm text-muted-foreground">{vendorData.businessType}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Rating</p>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="font-semibold">{vendorData.rating}</span>
                </div>
              </div>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-rose-gold/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-rose-gold to-rose-gold-light p-3 rounded-full">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Bookings</p>
                  <p className="text-2xl font-bold text-foreground">{vendorData.totalBookings}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-rose-gold/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-full">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                  <p className="text-2xl font-bold text-foreground">{vendorData.monthlyRevenue}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-rose-gold/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-full">
                  <Eye className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Listings</p>
                  <p className="text-2xl font-bold text-foreground">{vendorData.activeListings}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-rose-gold/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-3 rounded-full">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Rating</p>
                  <p className="text-2xl font-bold text-foreground">{vendorData.rating}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-rose-gold/10">
            <TabsTrigger value="overview" className="data-[state=active]:bg-rose-gold data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-rose-gold data-[state=active]:text-white">
              Profile
            </TabsTrigger>
            <TabsTrigger value="services" className="data-[state=active]:bg-rose-gold data-[state=active]:text-white">
              My Services
            </TabsTrigger>
            <TabsTrigger value="availability" className="data-[state=active]:bg-rose-gold data-[state=active]:text-white">
              Availability
            </TabsTrigger>
            <TabsTrigger value="bookings" className="data-[state=active]:bg-rose-gold data-[state=active]:text-white">
              Bookings
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-rose-gold data-[state=active]:text-white">
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Profile & Highlights Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Vendor Profile Card */}
              <Card className="border-rose-gold/20">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <div className="bg-gradient-to-r from-rose-gold to-rose-gold-light p-3 rounded-full">
                        <Building2 className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{vendorData.businessName}</CardTitle>
                        <CardDescription>{vendorData.businessType}</CardDescription>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setActiveTab('profile')}
                    >
                      <Edit className="h-4 w-4" />
                      View Full Profile
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{vendorData.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-semibold">{vendorData.rating}</span>
                      <span className="text-muted-foreground">({vendorData.reviewCount} reviews)</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="h-4 w-4 text-green-500" />
                      <span className="text-muted-foreground">Response: {vendorData.responseTime}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-green-600 font-medium">{vendorData.availability}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Service Highlights */}
              <Card className="border-rose-gold/20 lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="h-5 w-5 text-rose-gold" />
                    <span>Service Highlights</span>
                  </CardTitle>
                  <CardDescription>Key features that make you stand out</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {vendorData.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center space-x-2 p-2 bg-rose-gold/5 rounded-lg">
                        <CheckCircle className="h-4 w-4 text-rose-gold flex-shrink-0" />
                        <span className="text-sm font-medium text-foreground">{highlight}</span>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="mt-4 border-rose-gold/30 hover:border-rose-gold">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Highlights
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Recent Reviews Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <Card className="border-rose-gold/20 lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageSquare className="h-5 w-5 text-rose-gold" />
                    <span>Recent Reviews</span>
                  </CardTitle>
                  <CardDescription>What your clients are saying</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
            {[
              {
                id: "1",
                customerName: "Fatima A.",
                rating: 5,
                comment: "Absolutely perfect venue and catering! The team was professional and the food was amazing.",
                date: "2 days ago",
                eventType: "Wedding",
                verified: true,
                helpful: 12,
                vendorResponse: "Thank you so much for your kind words! It was our pleasure to be part of your special day.",
                responseDate: "1 day ago"
              },
              {
                id: "2",
                customerName: "Ahmed K.",
                rating: 5,
                comment: "Royal Gardens made our wedding day magical. Highly recommended!",
                date: "1 week ago",
                eventType: "Reception",
                verified: true,
                helpful: 8
              },
              {
                id: "3",
                customerName: "Ayesha M.",
                rating: 4,
                comment: "Great service and beautiful venue. Minor delay in setup but overall excellent experience.",
                date: "2 weeks ago",
                eventType: "Engagement",
                verified: true,
                helpful: 5
              }
            ].map((review, index) => (
              <div key={index} className="p-4 bg-pearl/30 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-sm">{review.customerName}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-3 w-3 ${i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    {review.verified && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs px-1 py-0">
                        Verified
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{review.comment}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">{review.helpful} found helpful</span>
                  {!review.vendorResponse && (
                    <Button variant="outline" size="sm" className="text-xs px-2 py-1 h-6">
                      <MessageSquare className="h-2 w-2 mr-1" />
                      Respond
                    </Button>
                  )}
                </div>
                {review.vendorResponse && (
                  <div className="mt-2 p-2 bg-rose-gold/5 rounded border-l-2 border-rose-gold">
                    <p className="text-xs text-foreground">{review.vendorResponse}</p>
                    <span className="text-xs text-muted-foreground">{review.responseDate}</span>
                  </div>
                )}
              </div>
            ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4 border-rose-gold/30 hover:border-rose-gold">
                    View All Reviews
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-rose-gold/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="h-5 w-5 text-rose-gold" />
                    <span>Quick Actions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start border-rose-gold/30 hover:border-rose-gold">
                      <Calendar className="h-4 w-4 mr-2" />
                      Manage Availability
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-rose-gold/30 hover:border-rose-gold">
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Service
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-rose-gold/30 hover:border-rose-gold">
                      <Edit className="h-4 w-4 mr-2" />
                      Update Pricing
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-rose-gold/30 hover:border-rose-gold">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Respond to Reviews
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Service Categories */}
              <Card className="border-rose-gold/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Heart className="h-5 w-5 text-rose-gold" />
                    <span>Service Categories</span>
                  </CardTitle>
                  <CardDescription>
                    Manage your services across different categories
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {serviceCategories.map((category) => (
                      <div
                        key={category.id}
                        className="p-4 rounded-lg border border-rose-gold/20 hover:border-rose-gold/40 transition-colors cursor-pointer"
                        onClick={() => handleAddService(category.id)}
                      >
                        <div className="flex items-center space-x-3 mb-3">
                          <div className={`bg-gradient-to-r ${category.color} p-2 rounded-full`}>
                            <span className="text-white text-lg">{category.emoji}</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground">{category.name}</h4>
                            <p className="text-sm text-muted-foreground">{category.count} listings</p>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full border-rose-gold/30 hover:border-rose-gold"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Service
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Bookings */}
              <Card className="border-rose-gold/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-rose-gold" />
                    <span>Recent Bookings</span>
                  </CardTitle>
                  <CardDescription>
                    Latest customer bookings and requests
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentBookings.map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-3 rounded-lg bg-pearl/50">
                        <div>
                          <h4 className="font-semibold text-foreground">{booking.customerName}</h4>
                          <p className="text-sm text-muted-foreground">{booking.service}</p>
                          <p className="text-xs text-muted-foreground">{booking.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-foreground">{booking.amount}</p>
                          <Badge className={getStatusColor(booking.status)}>
                            {booking.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4 border-rose-gold/30 hover:border-rose-gold">
                    View All Bookings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">Vendor Profile</h2>
            </div>
            
            <VendorProfile 
              vendorData={profileData}
              isOwner={true}
              onProfileUpdate={(updates) => {
                setProfileData(prev => ({ ...prev, ...updates }));
              }}
            />
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">My Services</h2>
              <Button variant="hero">
                <Plus className="h-4 w-4 mr-2" />
                Add New Service
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceCategories.map((category) => (
                <Card key={category.id} className="border-rose-gold/20 hover:border-rose-gold/40 transition-colors">
                  <CardHeader className="text-center">
                    <div className={`bg-gradient-to-r ${category.color} p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center`}>
                      <span className="text-white text-2xl">{category.emoji}</span>
                    </div>
                    <CardTitle className="text-xl">{category.name}</CardTitle>
                    <CardDescription>
                      {category.count} active {category.count === 1 ? 'listing' : 'listings'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 border-rose-gold/30 hover:border-rose-gold"
                        onClick={() => handleAddService(category.id)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 border-rose-gold/30 hover:border-rose-gold"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Availability Tab */}
          <TabsContent value="availability" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">Manage Availability</h2>
              <div className="flex space-x-2">
                <Button variant="outline" className="border-rose-gold/30 hover:border-rose-gold">
                  <Calendar className="h-4 w-4 mr-2" />
                  Sync with Google Calendar
                </Button>
                <Button variant="outline" className="border-rose-gold/30 hover:border-rose-gold">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>

            <VendorAvailabilityCalendar 
              vendorId="vendor_123"
              isOwner={true}
            />
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">All Bookings</h2>
              <div className="flex space-x-2">
                <Button variant="outline" className="border-rose-gold/30 hover:border-rose-gold">
                  Export
                </Button>
                <Button variant="outline" className="border-rose-gold/30 hover:border-rose-gold">
                  Filter
                </Button>
              </div>
            </div>

            <Card className="border-rose-gold/20">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 rounded-lg border border-rose-gold/20 hover:border-rose-gold/40 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="bg-rose-gold/10 p-3 rounded-full">
                          <Heart className="h-5 w-5 text-rose-gold" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{booking.customerName}</h4>
                          <p className="text-sm text-muted-foreground">{booking.service}</p>
                          <p className="text-xs text-muted-foreground">Date: {booking.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground text-lg">{booking.amount}</p>
                        <Badge className={`${getStatusColor(booking.status)} mb-2`}>
                          {booking.status}
                        </Badge>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="border-rose-gold/30 hover:border-rose-gold">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm" className="border-rose-gold/30 hover:border-rose-gold">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Analytics & Insights</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-rose-gold/20">
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                  <CardDescription>Monthly revenue trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <DollarSign className="h-16 w-16 text-rose-gold mx-auto mb-4" />
                    <p className="text-3xl font-bold text-foreground">{vendorData.monthlyRevenue}</p>
                    <p className="text-muted-foreground">This month's revenue</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-rose-gold/20">
                <CardHeader>
                  <CardTitle>Popular Services</CardTitle>
                  <CardDescription>Most booked service categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-foreground">Venues</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-rose-gold h-2 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                        <span className="text-sm text-muted-foreground">75%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-foreground">Catering</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-rose-gold h-2 rounded-full" style={{ width: '60%' }}></div>
                        </div>
                        <span className="text-sm text-muted-foreground">60%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-foreground">Photography</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-rose-gold h-2 rounded-full" style={{ width: '40%' }}></div>
                        </div>
                        <span className="text-sm text-muted-foreground">40%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default VendorDashboard;
