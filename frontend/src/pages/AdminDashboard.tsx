import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { 
  LayoutDashboard,
  Users,
  Building2,
  Calendar,
  TrendingUp,
  DollarSign,
  Star,
  Shield,
  Eye,
  Edit,
  Trash2,
  Check,
  X,
  AlertTriangle,
  Search,
  Filter,
  Download,
  Settings,
  LogOut,
  UserCheck,
  FileText,
  Clock,
  MapPin,
  Phone,
  Mail,
  Award,
  ChevronRight,
  BarChart,
  PieChart,
  Activity
} from "lucide-react";

interface VendorData {
  id: string;
  businessName: string;
  businessType: string;
  location: string;
  email: string;
  phone: string;
  rating: number;
  reviewCount: number;
  totalBookings: number;
  monthlyRevenue: number;
  verificationStatus: 'pending' | 'verified' | 'rejected' | 'not_submitted';
  cnicVerified: boolean;
  joinDate: string;
  lastActive: string;
  status: 'active' | 'inactive' | 'suspended';
}

interface BookingData {
  id: string;
  vendorName: string;
  clientName: string;
  eventType: string;
  eventDate: string;
  amount: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  bookingDate: string;
  location: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVendor, setSelectedVendor] = useState<VendorData | null>(null);
  const [isVendorDetailOpen, setIsVendorDetailOpen] = useState(false);

  // Mock data
  const dashboardStats = {
    totalVendors: 156,
    activeVendors: 142,
    pendingApprovals: 8,
    totalBookings: 1247,
    monthlyRevenue: 12450000,
    averageRating: 4.6,
    newVendorsThisMonth: 23,
    completedBookings: 1089
  };

  const [vendors, setVendors] = useState<VendorData[]>([
    {
      id: "v1",
      businessName: "Royal Gardens Banquet",
      businessType: "Venue & Catering",
      location: "Clifton, Karachi",
      email: "info@royalgardens.com",
      phone: "+92 21 1234567",
      rating: 4.8,
      reviewCount: 89,
      totalBookings: 156,
      monthlyRevenue: 850000,
      verificationStatus: "verified",
      cnicVerified: true,
      joinDate: "2023-08-15",
      lastActive: "2024-01-10",
      status: "active"
    },
    {
      id: "v2",
      businessName: "Capture Moments Photography",
      businessType: "Photography",
      location: "DHA, Lahore",
      email: "info@capturemoments.com",
      phone: "+92 42 9876543",
      rating: 4.5,
      reviewCount: 67,
      totalBookings: 89,
      monthlyRevenue: 320000,
      verificationStatus: "pending",
      cnicVerified: true,
      joinDate: "2023-11-20",
      lastActive: "2024-01-09",
      status: "active"
    },
    {
      id: "v3",
      businessName: "Elegance Makeup Studio",
      businessType: "Makeup Artists",
      location: "Gulberg, Karachi",
      email: "contact@elegancemakeup.com",
      phone: "+92 300 1234567",
      rating: 4.9,
      reviewCount: 134,
      totalBookings: 234,
      monthlyRevenue: 180000,
      verificationStatus: "verified",
      cnicVerified: true,
      joinDate: "2023-06-10",
      lastActive: "2024-01-11",
      status: "active"
    },
    {
      id: "v4",
      businessName: "Bloom Decorators",
      businessType: "Decorators",
      location: "Model Town, Lahore",
      email: "hello@bloomdeco.com",
      phone: "+92 42 5678901",
      rating: 4.2,
      reviewCount: 45,
      totalBookings: 67,
      monthlyRevenue: 145000,
      verificationStatus: "rejected",
      cnicVerified: false,
      joinDate: "2023-12-05",
      lastActive: "2024-01-08",
      status: "inactive"
    }
  ]);

  const [bookings, setBookings] = useState<BookingData[]>([
    {
      id: "b1",
      vendorName: "Royal Gardens Banquet",
      clientName: "Ahmed & Fatima",
      eventType: "Wedding",
      eventDate: "2024-03-15",
      amount: 450000,
      status: "confirmed",
      bookingDate: "2024-01-10",
      location: "Pearl Continental Hotel"
    },
    {
      id: "b2",
      vendorName: "Capture Moments Photography",
      clientName: "Usman & Ayesha",
      eventType: "Engagement",
      eventDate: "2024-02-20",
      amount: 85000,
      status: "pending",
      bookingDate: "2024-01-09",
      location: "Farmhouse, DHA"
    },
    {
      id: "b3",
      vendorName: "Elegance Makeup Studio",
      clientName: "Bilal & Sana",
      eventType: "Wedding",
      eventDate: "2024-04-12",
      amount: 65000,
      status: "completed",
      bookingDate: "2024-01-05",
      location: "Home Service"
    }
  ]);

  const handleVendorApproval = (vendorId: string, action: 'approve' | 'reject') => {
    setVendors(prev => prev.map(vendor => 
      vendor.id === vendorId 
        ? { ...vendor, verificationStatus: action === 'approve' ? 'verified' : 'rejected' }
        : vendor
    ));
    toast.success(`Vendor ${action === 'approve' ? 'approved' : 'rejected'} successfully!`);
  };

  const handleVendorStatus = (vendorId: string, newStatus: 'active' | 'inactive' | 'suspended') => {
    setVendors(prev => prev.map(vendor => 
      vendor.id === vendorId ? { ...vendor, status: newStatus } : vendor
    ));
    toast.success(`Vendor status updated to ${newStatus}!`);
  };

  const handleLogout = () => {
    navigate("/");
  };

  const getVerificationBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-green-100 text-green-800"><Shield className="h-3 w-3 mr-1" />Verified</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800"><X className="h-3 w-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Not Submitted</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>;
      case 'suspended':
        return <Badge className="bg-red-100 text-red-800">Suspended</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const getBookingStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800">Confirmed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-800">Completed</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const filteredVendors = vendors.filter(vendor =>
    vendor.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.businessType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-rose-gold/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-rose-gold to-rose-gold-light p-2 rounded-full">
                <LayoutDashboard className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground">Aasaan Shaadi Platform</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
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
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-full">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Vendors</p>
                  <p className="text-2xl font-bold text-foreground">{dashboardStats.totalVendors}</p>
                  <p className="text-xs text-green-600">+{dashboardStats.newVendorsThisMonth} this month</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-rose-gold/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-full">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Bookings</p>
                  <p className="text-2xl font-bold text-foreground">{dashboardStats.totalBookings}</p>
                  <p className="text-xs text-green-600">{dashboardStats.completedBookings} completed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-rose-gold/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-rose-gold to-rose-gold-light p-3 rounded-full">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                  <p className="text-2xl font-bold text-foreground">Rs. {(dashboardStats.monthlyRevenue / 100000).toFixed(1)}L</p>
                  <p className="text-xs text-green-600">+12% from last month</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-rose-gold/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-3 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pending Approvals</p>
                  <p className="text-2xl font-bold text-foreground">{dashboardStats.pendingApprovals}</p>
                  <p className="text-xs text-orange-600">Requires attention</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-rose-gold/10">
            <TabsTrigger value="overview" className="data-[state=active]:bg-rose-gold data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="vendors" className="data-[state=active]:bg-rose-gold data-[state=active]:text-white">
              Vendor Management
            </TabsTrigger>
            <TabsTrigger value="bookings" className="data-[state=active]:bg-rose-gold data-[state=active]:text-white">
              Booking Management
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-rose-gold data-[state=active]:text-white">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-rose-gold data-[state=active]:text-white">
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card className="border-rose-gold/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-rose-gold" />
                    <span>Recent Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        type: "vendor_signup",
                        message: "New vendor 'Elegant Events' signed up",
                        time: "2 hours ago",
                        icon: Users,
                        color: "text-blue-500"
                      },
                      {
                        type: "booking_confirmed",
                        message: "Booking confirmed for Royal Gardens Banquet",
                        time: "4 hours ago",
                        icon: Calendar,
                        color: "text-green-500"
                      },
                      {
                        type: "vendor_approved",
                        message: "Vendor 'Capture Moments' verification completed",
                        time: "6 hours ago",
                        icon: Shield,
                        color: "text-yellow-500"
                      },
                      {
                        type: "payment_received",
                        message: "Payment received: Rs. 2,50,000",
                        time: "8 hours ago",
                        icon: DollarSign,
                        color: "text-rose-gold"
                      }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <activity.icon className={`h-5 w-5 ${activity.color}`} />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">{activity.message}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Platform Statistics */}
              <Card className="border-rose-gold/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart className="h-5 w-5 text-rose-gold" />
                    <span>Platform Statistics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Active Vendors</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '91%' }}></div>
                        </div>
                        <span className="text-sm font-semibold">{dashboardStats.activeVendors}/{dashboardStats.totalVendors}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Completion Rate</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                        </div>
                        <span className="text-sm font-semibold">87%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Average Rating</span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-semibold">{dashboardStats.averageRating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Growth Rate</span>
                      <span className="text-sm font-semibold text-green-600">+15% MoM</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="border-rose-gold/20">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col space-y-2 border-rose-gold/30 hover:border-rose-gold"
                    onClick={() => setActiveTab("vendors")}
                  >
                    <UserCheck className="h-6 w-6 text-rose-gold" />
                    <span className="text-sm">Approve Vendors</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col space-y-2 border-rose-gold/30 hover:border-rose-gold"
                    onClick={() => setActiveTab("bookings")}
                  >
                    <Calendar className="h-6 w-6 text-rose-gold" />
                    <span className="text-sm">Manage Bookings</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col space-y-2 border-rose-gold/30 hover:border-rose-gold"
                    onClick={() => setActiveTab("analytics")}
                  >
                    <TrendingUp className="h-6 w-6 text-rose-gold" />
                    <span className="text-sm">View Analytics</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col space-y-2 border-rose-gold/30 hover:border-rose-gold"
                    onClick={() => setActiveTab("settings")}
                  >
                    <Settings className="h-6 w-6 text-rose-gold" />
                    <span className="text-sm">Platform Settings</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Vendor Management Tab */}
          <TabsContent value="vendors" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">Vendor Management</h2>
              <div className="flex space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search vendors..."
                    className="pl-10 border-rose-gold/30 focus:border-rose-gold"
                  />
                </div>
                <Button variant="outline" className="border-rose-gold/30 hover:border-rose-gold">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" className="border-rose-gold/30 hover:border-rose-gold">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            <Card className="border-rose-gold/20">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {filteredVendors.map((vendor) => (
                    <div key={vendor.id} className="flex items-center justify-between p-4 border border-rose-gold/20 rounded-lg hover:border-rose-gold/40 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="bg-rose-gold/10 p-3 rounded-full">
                          <Building2 className="h-6 w-6 text-rose-gold" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{vendor.businessName}</h4>
                          <p className="text-sm text-muted-foreground">{vendor.businessType}</p>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-xs text-muted-foreground flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {vendor.location}
                            </span>
                            <span className="text-xs text-muted-foreground flex items-center">
                              <Star className="h-3 w-3 mr-1 text-yellow-500 fill-current" />
                              {vendor.rating} ({vendor.reviewCount} reviews)
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {vendor.totalBookings} bookings
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <div className="flex space-x-2 mb-2">
                            {getVerificationBadge(vendor.verificationStatus)}
                            {getStatusBadge(vendor.status)}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Revenue: Rs. {(vendor.monthlyRevenue / 1000).toFixed(0)}K/mo
                          </p>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedVendor(vendor);
                              setIsVendorDetailOpen(true);
                            }}
                            className="border-rose-gold/30 hover:border-rose-gold"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          
                          {vendor.verificationStatus === 'pending' && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleVendorApproval(vendor.id, 'approve')}
                                className="border-green-200 hover:border-green-500 hover:text-green-500"
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleVendorApproval(vendor.id, 'reject')}
                                className="border-red-200 hover:border-red-500 hover:text-red-500"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Booking Management Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">Booking Management</h2>
              <div className="flex space-x-2">
                <Button variant="outline" className="border-rose-gold/30 hover:border-rose-gold">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" className="border-rose-gold/30 hover:border-rose-gold">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            <Card className="border-rose-gold/20">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border border-rose-gold/20 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="bg-rose-gold/10 p-3 rounded-full">
                          <Calendar className="h-6 w-6 text-rose-gold" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{booking.clientName}</h4>
                          <p className="text-sm text-muted-foreground">{booking.vendorName} • {booking.eventType}</p>
                          <div className="flex items-center space-x-4 mt-1 text-xs text-muted-foreground">
                            <span>📅 {new Date(booking.eventDate).toLocaleDateString()}</span>
                            <span>📍 {booking.location}</span>
                            <span>💰 Rs. {(booking.amount / 1000).toFixed(0)}K</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        {getBookingStatusBadge(booking.status)}
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-rose-gold/30 hover:border-rose-gold"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Platform Analytics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-rose-gold/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <PieChart className="h-5 w-5 text-rose-gold" />
                    <span>Vendor Categories</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { category: "Venues", count: 45, percentage: 29 },
                      { category: "Catering", count: 38, percentage: 24 },
                      { category: "Photography", count: 32, percentage: 21 },
                      { category: "Makeup Artists", count: 25, percentage: 16 },
                      { category: "Others", count: 16, percentage: 10 }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-foreground">{item.category}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-rose-gold h-2 rounded-full" 
                              style={{ width: `${item.percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-muted-foreground w-8">{item.count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-rose-gold/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-rose-gold" />
                    <span>Revenue Trends</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { month: "December", revenue: 11.2, growth: 8 },
                      { month: "January", revenue: 12.4, growth: 12 },
                      { month: "February", revenue: 13.8, growth: 15 },
                      { month: "March", revenue: 14.5, growth: 18 }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-foreground">{item.month}</span>
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-semibold">Rs. {item.revenue}L</span>
                          <span className="text-xs text-green-600">+{item.growth}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-rose-gold/20">
                <CardHeader>
                  <CardTitle className="text-lg">Top Performing Vendors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {vendors.slice(0, 3).map((vendor, index) => (
                      <div key={vendor.id} className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-rose-gold text-white rounded-full flex items-center justify-center text-xs font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{vendor.businessName}</p>
                          <p className="text-xs text-muted-foreground">Rs. {(vendor.monthlyRevenue / 1000).toFixed(0)}K</p>
                        </div>
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm">{vendor.rating}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-rose-gold/20">
                <CardHeader>
                  <CardTitle className="text-lg">Recent Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { rating: 5, comment: "Amazing service quality!", vendor: "Royal Gardens" },
                      { rating: 4, comment: "Professional and timely", vendor: "Capture Moments" },
                      { rating: 5, comment: "Exceeded expectations", vendor: "Elegance Makeup" }
                    ].map((review, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-2 mb-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-3 w-3 ${i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">{review.vendor}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-rose-gold/20">
                <CardHeader>
                  <CardTitle className="text-lg">Platform Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">System Status</span>
                      <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Response Time</span>
                      <span className="text-sm font-semibold">1.2s</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Uptime</span>
                      <span className="text-sm font-semibold text-green-600">99.9%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Active Users</span>
                      <span className="text-sm font-semibold">2,847</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Platform Settings</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-rose-gold/20">
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label>Platform Commission (%)</Label>
                      <Input defaultValue="10" className="border-rose-gold/30" />
                    </div>
                    <div>
                      <Label>Minimum Vendor Rating</Label>
                      <Input defaultValue="3.0" className="border-rose-gold/30" />
                    </div>
                    <div>
                      <Label>Auto-Approval Threshold</Label>
                      <Select defaultValue="manual">
                        <SelectTrigger className="border-rose-gold/30">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="manual">Manual Review</SelectItem>
                          <SelectItem value="auto">Auto Approve</SelectItem>
                          <SelectItem value="conditional">Conditional</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-rose-gold/20">
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label>Email Notifications</Label>
                      <Select defaultValue="all">
                        <SelectTrigger className="border-rose-gold/30">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Notifications</SelectItem>
                          <SelectItem value="important">Important Only</SelectItem>
                          <SelectItem value="none">Disabled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>SMS Notifications</Label>
                      <Select defaultValue="important">
                        <SelectTrigger className="border-rose-gold/30">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Notifications</SelectItem>
                          <SelectItem value="important">Important Only</SelectItem>
                          <SelectItem value="none">Disabled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Vendor Detail Modal */}
      <Dialog open={isVendorDetailOpen} onOpenChange={setIsVendorDetailOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Vendor Details</DialogTitle>
          </DialogHeader>
          
          {selectedVendor && (
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium">Business Name</Label>
                    <p className="text-sm text-foreground">{selectedVendor.businessName}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Business Type</Label>
                    <p className="text-sm text-foreground">{selectedVendor.businessType}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Location</Label>
                    <p className="text-sm text-foreground">{selectedVendor.location}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Contact</Label>
                    <p className="text-sm text-foreground">{selectedVendor.email}</p>
                    <p className="text-sm text-foreground">{selectedVendor.phone}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium">Performance</Label>
                    <div className="space-y-1">
                      <p className="text-sm">Rating: {selectedVendor.rating}/5 ({selectedVendor.reviewCount} reviews)</p>
                      <p className="text-sm">Total Bookings: {selectedVendor.totalBookings}</p>
                      <p className="text-sm">Monthly Revenue: Rs. {(selectedVendor.monthlyRevenue / 1000).toFixed(0)}K</p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Verification Status</Label>
                    <div className="space-y-2">
                      {getVerificationBadge(selectedVendor.verificationStatus)}
                      <p className="text-xs text-muted-foreground">
                        CNIC: {selectedVendor.cnicVerified ? 'Verified' : 'Not Verified'}
                      </p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Account Info</Label>
                    <div className="space-y-1">
                      <p className="text-sm">Joined: {new Date(selectedVendor.joinDate).toLocaleDateString()}</p>
                      <p className="text-sm">Last Active: {new Date(selectedVendor.lastActive).toLocaleDateString()}</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">Status:</span>
                        {getStatusBadge(selectedVendor.status)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t">
                <div className="flex space-x-2">
                  <Select 
                    defaultValue={selectedVendor.status}
                    onValueChange={(value) => handleVendorStatus(selectedVendor.id, value as any)}
                  >
                    <SelectTrigger className="w-32 border-rose-gold/30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex space-x-2">
                  {selectedVendor.verificationStatus === 'pending' && (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => {
                          handleVendorApproval(selectedVendor.id, 'reject');
                          setIsVendorDetailOpen(false);
                        }}
                        className="border-red-200 hover:border-red-500 hover:text-red-500"
                      >
                        Reject
                      </Button>
                      <Button
                        variant="hero"
                        onClick={() => {
                          handleVendorApproval(selectedVendor.id, 'approve');
                          setIsVendorDetailOpen(false);
                        }}
                      >
                        Approve Vendor
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
