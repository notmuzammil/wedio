import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useNotifications, createBookingNotification } from "@/contexts/NotificationContext";
import { 
  Heart,
  Bookmark,
  Star,
  MapPin,
  DollarSign,
  Calendar,
  Users,
  Clock,
  CheckCircle,
  Trash2,
  Share2,
  MessageSquare,
  Search,
  Filter,
  SlidersHorizontal,
  TrendingUp,
  Award,
  Phone,
  Mail,
  Globe,
  Eye,
  ShoppingCart,
  ArrowRight,
  Package
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface WishlistVendor {
  id: string;
  name: string;
  service: string;
  location: string;
  rating: number;
  reviewCount: number;
  price: string;
  priceNumeric: number;
  description: string;
  image: string;
  category: string;
  dateAdded: string;
  availability: string;
  contact: {
    phone: string;
    email: string;
    website?: string;
  };
  highlights: string[];
  responseTime: string;
  totalBookings: number;
}

const Wishlist = () => {
  const navigate = useNavigate();
  const { showToastNotification, addNotification } = useNotifications();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("dateAdded");
  const [filterCategory, setFilterCategory] = useState("all");
  
  const [wishlistVendors, setWishlistVendors] = useState<WishlistVendor[]>([
    {
      id: "1",
      name: "Royal Gardens Banquet Hall",
      service: "Wedding Venue",
      location: "Clifton, Karachi",
      rating: 4.8,
      reviewCount: 73,
      price: "Rs. 2,50,000",
      priceNumeric: 250000,
      description: "Luxurious banquet hall with crystal chandeliers and elegant décor for unforgettable celebrations.",
      image: "🏰",
      category: "venue",
      dateAdded: "2024-02-15",
      availability: "Available",
      contact: {
        phone: "+92 300 1234567",
        email: "info@royalgardens.com",
        website: "www.royalgardens.com"
      },
      highlights: ["Crystal Chandeliers", "VIP Bridal Suite", "Full Audio/Video Setup", "Free Parking"],
      responseTime: "Within 1 hour",
      totalBookings: 156
    },
    {
      id: "2",
      name: "Traditional Delights Catering",
      service: "Wedding Catering",
      location: "Gulshan-e-Iqbal, Karachi",
      rating: 4.8,
      reviewCount: 67,
      price: "Rs. 2,500/person",
      priceNumeric: 2500,
      description: "From traditional Pakistani cuisine to international menus, we create culinary experiences that delight every palate.",
      image: "🍽️",
      category: "catering",
      dateAdded: "2024-02-12",
      availability: "Available",
      contact: {
        phone: "+92 300 2345678",
        email: "bookings@traditionaldelights.com"
      },
      highlights: ["Halal Certified", "Catering up to 300 guests", "Traditional Pakistani Cuisine", "Live Cooking Stations"],
      responseTime: "Within 3 hours",
      totalBookings: 89
    },
    {
      id: "3",
      name: "Capture Moments Photography",
      service: "Wedding Photography",
      location: "DHA Phase 5, Karachi",
      rating: 4.9,
      reviewCount: 92,
      price: "Rs. 1,20,000",
      priceNumeric: 120000,
      description: "Professional wedding photography capturing every precious moment with artistic flair and attention to detail.",
      image: "📸",
      category: "photography",
      dateAdded: "2024-02-10",
      availability: "Available",
      contact: {
        phone: "+92 300 3456789",
        email: "hello@capturemoments.com",
        website: "www.capturemoments.com"
      },
      highlights: ["Award Winning", "Same Day Preview", "Drone Coverage", "Free Engagement Shoot"],
      responseTime: "Within 2 hours",
      totalBookings: 134
    },
    {
      id: "4",
      name: "Bridal Beauty Studio",
      service: "Bridal Makeup",
      location: "Gulshan-e-Iqbal, Karachi",
      rating: 4.9,
      reviewCount: 84,
      price: "Rs. 35,000",
      priceNumeric: 35000,
      description: "Professional bridal makeup with traditional and modern looks for your special day.",
      image: "💄",
      category: "makeup",
      dateAdded: "2024-02-08",
      availability: "Available",
      contact: {
        phone: "+92 300 4567890",
        email: "bookings@bridalbeauty.com"
      },
      highlights: ["Premium Products", "Trial Session", "On-location Service", "Touch-up Kit"],
      responseTime: "Within 4 hours",
      totalBookings: 78
    },
    {
      id: "5",
      name: "Elegant Couture",
      service: "Bridal Outfits",
      location: "Commercial Area, DHA",
      rating: 4.7,
      reviewCount: 56,
      price: "Rs. 75,000",
      priceNumeric: 75000,
      description: "Custom wedding outfits and designer collections for rent or purchase with premium fabrics.",
      image: "👗",
      category: "attire",
      dateAdded: "2024-02-05",
      availability: "Available",
      contact: {
        phone: "+92 300 5678901",
        email: "orders@elegantcouture.com",
        website: "www.elegantcouture.com"
      },
      highlights: ["Designer Collections", "Custom Tailoring", "Premium Fabrics", "Alteration Service"],
      responseTime: "Within 6 hours",
      totalBookings: 45
    }
  ]);

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "venue", label: "Venues" },
    { value: "catering", label: "Catering" },
    { value: "photography", label: "Photography" },
    { value: "makeup", label: "Makeup" },
    { value: "attire", label: "Attire" }
  ];

  const sortOptions = [
    { value: "dateAdded", label: "Recently Added" },
    { value: "rating", label: "Highest Rated" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "name", label: "Name: A to Z" }
  ];

  // Filter and sort logic
  const filteredVendors = wishlistVendors
    .filter(vendor => {
      const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           vendor.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           vendor.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = filterCategory === "all" || vendor.category === filterCategory;
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "price-low":
          return a.priceNumeric - b.priceNumeric;
        case "price-high":
          return b.priceNumeric - a.priceNumeric;
        case "name":
          return a.name.localeCompare(b.name);
        case "dateAdded":
        default:
          return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      }
    });

  const removeFromWishlist = (vendorId: string, vendorName: string) => {
    setWishlistVendors(prev => prev.filter(v => v.id !== vendorId));
    toast.success(`${vendorName} removed from wishlist`);
    
    addNotification({
      type: 'system',
      title: 'Removed from Wishlist',
      message: `${vendorName} has been removed from your wishlist.`,
      read: false,
      priority: 'low'
    });
  };

  const contactVendor = (vendor: WishlistVendor) => {
    toast.success(`Contacting ${vendor.name}...`);
    addNotification({
      type: 'inquiry',
      title: 'Vendor Contact Initiated',
      message: `You have initiated contact with ${vendor.name}. They will respond within ${vendor.responseTime.toLowerCase()}.`,
      read: false,
      priority: 'medium',
      actionUrl: '/messages'
    });
  };

  const bookVendor = (vendor: WishlistVendor) => {
    showToastNotification(createBookingNotification(vendor.name, "Your Wedding Date", true));
    navigate("/login");
  };

  const shareVendor = (vendor: WishlistVendor) => {
    if (navigator.share) {
      navigator.share({
        title: vendor.name,
        text: `Check out ${vendor.name} - ${vendor.service} in ${vendor.location}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`${vendor.name} - ${vendor.service} in ${vendor.location}`);
      toast.success("Vendor details copied to clipboard!");
    }
  };

  const getTotalValue = () => {
    return wishlistVendors.reduce((total, vendor) => total + vendor.priceNumeric, 0);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const clearWishlist = () => {
    setWishlistVendors([]);
    toast.success("Wishlist cleared successfully");
    addNotification({
      type: 'system',
      title: 'Wishlist Cleared',
      message: 'Your wishlist has been cleared. You can add new vendors anytime from the vendors page.',
      read: false,
      priority: 'low',
      actionUrl: '/vendors'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Heart className="h-8 w-8 text-rose-gold mr-3" />
            <span className="text-rose-gold font-medium text-lg">Your Wishlist</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Saved Wedding Vendors
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Keep track of your favorite vendors and compare their services to make the best choice for your special day.
          </p>
        </div>

        {wishlistVendors.length > 0 ? (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="border-rose-gold/20">
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-rose-gold">{wishlistVendors.length}</div>
                  <div className="text-sm text-muted-foreground">Saved Vendors</div>
                </CardContent>
              </Card>

              <Card className="border-rose-gold/20">
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-rose-gold">
                    {new Set(wishlistVendors.map(v => v.category)).size}
                  </div>
                  <div className="text-sm text-muted-foreground">Categories</div>
                </CardContent>
              </Card>

              <Card className="border-rose-gold/20">
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-rose-gold">
                    {(wishlistVendors.reduce((sum, v) => sum + v.rating, 0) / wishlistVendors.length).toFixed(1)}
                  </div>
                  <div className="text-sm text-muted-foreground">Avg Rating</div>
                </CardContent>
              </Card>

              <Card className="border-rose-gold/20">
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-rose-gold">
                    Rs. {getTotalValue().toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Value</div>
                </CardContent>
              </Card>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col lg:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search saved vendors..."
                  className="pl-10 h-12 border-rose-gold/30 focus:border-rose-gold"
                />
              </div>

              <div className="flex space-x-3">
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-48 h-12 border-rose-gold/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48 h-12 border-rose-gold/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button 
                  variant="outline" 
                  className="h-12 border-rose-gold/30 hover:border-rose-gold"
                  onClick={clearWishlist}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{filteredVendors.length}</span> vendors
                {searchTerm && (
                  <span> for "<span className="font-semibold text-rose-gold">{searchTerm}</span>"</span>
                )}
              </p>
            </div>

            {/* Vendors Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredVendors.map((vendor) => (
                <Card key={vendor.id} className="border-rose-gold/20 hover:border-rose-gold/40 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <span className="text-4xl">{vendor.image}</span>
                        <div>
                          <h3 className="text-xl font-bold text-foreground mb-1">{vendor.name}</h3>
                          <Badge variant="secondary" className="bg-rose-gold/10 text-rose-gold mb-2">
                            {vendor.service}
                          </Badge>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>{vendor.location}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="font-medium">{vendor.rating}</span>
                        <span className="text-sm text-muted-foreground">({vendor.reviewCount})</span>
                      </div>
                    </div>

                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {vendor.description}
                    </p>

                    {/* Highlights */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {vendor.highlights.slice(0, 3).map((highlight, index) => (
                          <Badge key={index} variant="outline" className="text-xs border-rose-gold/30">
                            {highlight}
                          </Badge>
                        ))}
                        {vendor.highlights.length > 3 && (
                          <Badge variant="outline" className="text-xs border-rose-gold/30">
                            +{vendor.highlights.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Vendor Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Response</span>
                        </div>
                        <p className="text-sm font-medium">{vendor.responseTime}</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-1">
                          <TrendingUp className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Bookings</span>
                        </div>
                        <p className="text-sm font-medium">{vendor.totalBookings}+</p>
                      </div>
                    </div>

                    {/* Price and Date Added */}
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <p className="text-xs text-muted-foreground">Starting from</p>
                        <p className="text-lg font-bold text-rose-gold">{vendor.price}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Added on</p>
                        <p className="text-sm font-medium">{formatDate(vendor.dateAdded)}</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <Button 
                        variant="hero" 
                        className="flex-1"
                        onClick={() => bookVendor(vendor)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Book Now
                      </Button>
                      
                      <Button
                        variant="outline"
                        onClick={() => contactVendor(vendor)}
                        className="border-rose-gold/30 hover:border-rose-gold"
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Contact
                      </Button>
                      
                      <Button
                        variant="outline"
                        onClick={() => shareVendor(vendor)}
                        className="border-rose-gold/30 hover:border-rose-gold"
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                      
                      <Button
                        variant="outline"
                        onClick={() => removeFromWishlist(vendor.id, vendor.name)}
                        className="border-red-200 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredVendors.length === 0 && (
              <div className="text-center py-12">
                <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                  No vendors found
                </h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search term or category filter.
                </p>
                <Button variant="outline" onClick={() => {
                  setSearchTerm("");
                  setFilterCategory("all");
                }}>
                  Clear Filters
                </Button>
              </div>
            )}

            {/* Action Bar */}
            <div className="mt-12 p-6 bg-rose-gold/5 rounded-lg border border-rose-gold/20">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                <div>
                  <h3 className="font-semibold text-lg mb-1">Ready to book your vendors?</h3>
                  <p className="text-muted-foreground">
                    You have {wishlistVendors.length} amazing vendors saved. Start booking to secure your dream team!
                  </p>
                </div>
                <div className="flex space-x-3">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate("/vendors")}
                    className="border-rose-gold/30 hover:border-rose-gold"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add More Vendors
                  </Button>
                  <Button 
                    variant="hero"
                    onClick={() => navigate("/user-dashboard")}
                  >
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Go to Dashboard
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="p-6 bg-rose-gold/5 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <Heart className="h-12 w-12 text-rose-gold" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Your wishlist is empty</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Start exploring our amazing vendors and save your favorites here. You can compare services, 
                prices, and make informed decisions for your perfect wedding.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="hero" 
                  onClick={() => navigate("/vendors")}
                  className="px-8"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Explore Vendors
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/user-dashboard")}
                  className="border-rose-gold/30 hover:border-rose-gold px-8"
                >
                  <Package className="h-4 w-4 mr-2" />
                  View Dashboard
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Wishlist;
