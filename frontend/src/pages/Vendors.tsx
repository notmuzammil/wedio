import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { useNotifications, createInquiryNotification } from "@/contexts/NotificationContext";
import { 
  Utensils, 
  Camera, 
  MapPin, 
  Palette, 
  Users, 
  Crown,
  Brush,
  Star,
  Heart,
  CheckCircle,
  Clock,
  Award,
  TrendingUp,
  Search,
  Filter,
  SlidersHorizontal,
  BookmarkPlus,
  Bookmark,
  Eye,
  DollarSign,
  Calendar,
  MessageCircle,
  Share2,
  Sparkles,
  ThumbsUp
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Vendors = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { showToastNotification, addNotification } = useNotifications();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [searchTerm, setSearchTerm] = useState('');
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [selectedVendor, setSelectedVendor] = useState<any>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isVendorDetailOpen, setIsVendorDetailOpen] = useState(false);
  
  // Filter states
  const [filters, setFilters] = useState({
    priceRange: { min: 0, max: 500000 },
    location: 'all',
    rating: 0,
    availability: 'all',
    sortBy: 'rating'
  });

  const categories = [
    { id: 'all', name: 'All Vendors', icon: Users, count: 500 },
    { id: 'catering', name: 'Caterers', icon: Utensils, count: 85, emoji: '🍽' },
    { id: 'venues', name: 'Venues', icon: MapPin, count: 120, emoji: '🏛' },
    { id: 'makeup', name: 'Makeup Artists', icon: Brush, count: 95, emoji: '💄' },
    { id: 'wardrobe', name: 'Wardrobe & Designers', icon: Crown, count: 75, emoji: '👗' },
    { id: 'henna', name: 'Henna Mehendi Artists', icon: Palette, count: 60, emoji: '🎨' },
    { id: 'photographers', name: 'Photographers', icon: Camera, count: 65, emoji: '📸' }
  ];

const vendors = {
    catering: [
      {
        id: 1,
        name: "Traditional Delights Catering",
        description: "From traditional Pakistani cuisine to international menus, we create culinary experiences that delight every palate.",
        location: "Gulshan-e-Iqbal, Karachi",
        rating: 4.8,
        reviewCount: 67,
        price: "Rs. 2,500/person",
        maxPrice: "Rs. 4,000/person",
        priceNumeric: 2500,
        specialty: "Pakistani & Mughlai Cuisine",
        image: "🍽️",
        availability: "Available",
        responseTime: "Within 3 hours",
        highlights: [
          "Halal Certified",
          "Catering up to 300 guests", 
          "Traditional Pakistani Cuisine",
          "Live Cooking Stations"
        ],
        totalBookings: 89,
        experienceYears: "8+ years"
      },
      {
        id: 2,
        name: "Royal Feast Catering",
        description: "Elegant dining experiences with both local and international cuisine options for your special celebration.",
        location: "PECHS, Karachi",
        rating: 4.9,
        reviewCount: 85,
        price: "Rs. 3,200/person",
        priceNumeric: 3200,
        specialty: "International & Local Fusion",
        image: "👑",
        availability: "Available",
        responseTime: "Within 2 hours",
        highlights: [
          "International Cuisine",
          "Live Stations",
          "Custom Menus",
          "Premium Service"
        ],
        totalBookings: 124,
        experienceYears: "12+ years"
      },
      {
        id: 3,
        name: "Spice Garden Caterers",
        description: "Authentic Pakistani flavors with a modern twist, perfect for traditional wedding celebrations.",
        location: "DHA Phase 5, Karachi",
        rating: 4.7,
        reviewCount: 52,
        price: "Rs. 2,800/person",
        priceNumeric: 2800,
        specialty: "Traditional Pakistani",
        image: "🌶️",
        availability: "Available",
        responseTime: "Within 4 hours",
        highlights: [
          "Authentic Flavors",
          "Spicy Specialties",
          "Traditional Recipes"
        ],
        totalBookings: 67,
        experienceYears: "6+ years"
      }
    ],
    venues: [
      {
        id: 1,
        name: "Royal Gardens Banquet Hall",
        description: "Luxurious banquet hall with crystal chandeliers and elegant décor for unforgettable celebrations.",
        location: "Clifton, Karachi",
        rating: 4.8,
        reviewCount: 73,
        price: "Rs. 2,50,000",
        priceNumeric: 250000,
        specialty: "Banquet Halls",
        capacity: "500-800 guests",
        image: "🏰",
        availability: "Available",
        responseTime: "Within 1 hour",
        highlights: [
          "Crystal Chandeliers",
          "VIP Bridal Suite",
          "Full Audio/Video Setup",
          "Free Parking"
        ],
        totalBookings: 156,
        experienceYears: "15+ years"
      },
      {
        id: 2,
        name: "Seaside Palace",
        description: "Beautiful beachside venue offering stunning ocean views for outdoor wedding ceremonies.",
        location: "DHA Phase 8, Karachi",
        rating: 4.9,
        price: "Rs. 3,50,000",
        specialty: "Beachside Setups",
        capacity: "300-500 guests",
        image: "🌊"
      },
      {
        id: 3,
        name: "Green Valley Farmhouse",
        description: "Spacious farmhouse venue surrounded by lush gardens, perfect for traditional ceremonies.",
        location: "Malir, Karachi",
        rating: 4.6,
        price: "Rs. 1,80,000",
        specialty: "Farmhouses",
        capacity: "400-600 guests",
        image: "🌿"
      }
    ],
    makeup: [
      {
        id: 1,
        name: "Bridal Beauty Studio",
        description: "Professional bridal makeup with traditional and modern looks for your special day.",
        location: "Gulshan-e-Iqbal, Karachi",
        rating: 4.9,
        price: "Rs. 25,000",
        specialty: "Bridal Makeup",
        image: "💄"
      },
      {
        id: 2,
        name: "Glamour Touch",
        description: "Complete beauty packages for bride, family, and wedding party with premium products.",
        location: "Clifton, Karachi",
        rating: 4.7,
        price: "Rs. 30,000",
        specialty: "Party & Family Packages",
        image: "✨"
      }
    ],
    wardrobe: [
      {
        id: 1,
        name: "Elegant Couture",
        description: "Custom wedding outfits and designer collections for rent or purchase.",
        location: "Commercial Area, DHA",
        rating: 4.8,
        price: "Rs. 50,000",
        specialty: "Designer Wedding Outfits",
        image: "👗"
      },
      {
        id: 2,
        name: "Royal Attire",
        description: "Traditional and modern wedding dresses with customization options available.",
        location: "Zamzama, Karachi",
        rating: 4.6,
        price: "Rs. 35,000",
        specialty: "Traditional & Modern",
        image: "👑"
      }
    ],
    henna: [
      {
        id: 1,
        name: "Artistic Mehendi Designs",
        description: "Beautiful customized mehendi designs for brides and wedding parties.",
        location: "Nazimabad, Karachi",
        rating: 4.9,
        price: "Rs. 15,000",
        specialty: "Custom Mehendi Designs",
        image: "🎨"
      },
      {
        id: 2,
        name: "Traditional Henna Art",
        description: "Traditional Pakistani and Arabic henna patterns with modern touches.",
        location: "Korangi, Karachi",
        rating: 4.7,
        price: "Rs. 12,000",
        specialty: "Traditional Patterns",
        image: "🖌️"
      }
    ],
    photographers: [
      {
        id: 1,
        name: "Moments Photography",
        description: "Professional wedding photography capturing every precious moment beautifully.",
        location: "F.B. Area, Karachi",
        rating: 4.8,
        price: "Rs. 80,000",
        specialty: "Wedding Photography",
        image: "📸"
      },
      {
        id: 2,
        name: "Picture Perfect Studios",
        description: "Complete photography and videography packages for your entire wedding celebration.",
        location: "Gulberg, Karachi",
        rating: 4.9,
        price: "Rs. 1,20,000",
        specialty: "Photo & Video Packages",
        image: "🎬"
      }
    ]
  };

  // Wishlist functions
  const toggleWishlist = (vendorId: number, vendorName: string) => {
    setWishlist(prev => {
      const isInWishlist = prev.includes(vendorId);
      const newWishlist = isInWishlist 
        ? prev.filter(id => id !== vendorId)
        : [...prev, vendorId];
      
      const message = isInWishlist 
        ? `${vendorName} removed from wishlist` 
        : `${vendorName} added to wishlist`;
        
      toast.success(message);
      
      // Create notification for wishlist addition
      if (!isInWishlist) {
        addNotification({
          type: 'system',
          title: 'Added to Wishlist',
          message: `${vendorName} has been added to your wishlist. View your wishlist to manage saved vendors.`,
          read: false,
          priority: 'low',
          actionUrl: '/wishlist'
        });
      }
      
      return newWishlist;
    });
  };

  const handleBookNow = (vendorName?: string) => {
    // Create inquiry notification for vendor
    if (vendorName) {
      showToastNotification(createInquiryNotification("Potential Client", "Your Wedding Date"));
      
      // Also simulate vendor getting notified
      setTimeout(() => {
        addNotification({
          type: 'inquiry',
          title: 'Booking Interest Sent',
          message: `Your interest in ${vendorName} has been forwarded. They will contact you within 24 hours.`,
          read: false,
          priority: 'medium',
          actionUrl: '/inquiries'
        });
      }, 1000);
    }
    
    navigate("/login");
  };

  const handleViewVendor = (vendor: any) => {
    setSelectedVendor(vendor);
    setIsVendorDetailOpen(true);
  };

  // Smart recommendations
  const getRecommendedVendors = () => {
    const allVendors = Object.values(vendors).flat();
    return allVendors
      .filter(v => v.rating >= 4.7 && v.totalBookings && v.totalBookings > 50)
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 3);
  };

  // Filter and search logic
  const filteredAndSearchedVendors = useMemo(() => {
    let vendorsList = selectedCategory === 'all' 
      ? Object.values(vendors).flat()
      : vendors[selectedCategory as keyof typeof vendors] || [];

    // Apply search filter
    if (searchTerm) {
      vendorsList = vendorsList.filter(vendor =>
        vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply filters
    vendorsList = vendorsList.filter(vendor => {
      // Rating filter
      if (filters.rating > 0 && vendor.rating < filters.rating) return false;
      
      // Price filter
      if (vendor.priceNumeric) {
        if (vendor.priceNumeric < filters.priceRange.min || 
            vendor.priceNumeric > filters.priceRange.max) return false;
      }
      
      // Location filter
      if (filters.location !== 'all' && !vendor.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }
      
      // Availability filter
      if (filters.availability !== 'all') {
        if (filters.availability === 'available' && (!vendor.availability || vendor.availability !== 'Available')) {
          return false;
        }
      }
      
      return true;
    });

    // Apply sorting
    vendorsList.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low':
          return (a.priceNumeric || 0) - (b.priceNumeric || 0);
        case 'price-high':
          return (b.priceNumeric || 0) - (a.priceNumeric || 0);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'bookings':
          return (b.totalBookings || 0) - (a.totalBookings || 0);
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return (b.rating || 0) - (a.rating || 0);
      }
    });

    return vendorsList;
  }, [selectedCategory, searchTerm, filters, vendors]);

  const getDisplayedVendors = () => {
    return filteredAndSearchedVendors;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-pearl to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="flex items-center justify-center mb-6">
              <Users className="h-8 w-8 text-rose-gold mr-3" />
              <span className="text-rose-gold font-medium text-lg">Our Vendor Network</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold text-foreground mb-8 leading-tight">
              Trusted Wedding
              <span className="block bg-gradient-to-r from-rose-gold to-rose-gold-light bg-clip-text text-transparent">
                Professionals
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Discover our carefully curated network of verified wedding vendors across Karachi. 
              From caterers to photographers, we've got everything you need for your perfect day.
            </p>
          </div>
        </div>
      </section>

      {/* Vendor Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              🤝 Our Vendor Network Includes:
            </h2>
          </div>

          {/* Smart Recommendations */}
          <div className="mb-12 p-6 bg-gradient-to-r from-rose-gold/10 to-rose-gold-light/10 rounded-2xl border border-rose-gold/20">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="h-6 w-6 text-rose-gold mr-2" />
              <h3 className="text-2xl font-bold text-foreground">Recommended for You</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {getRecommendedVendors().map((vendor) => (
                <div key={vendor.id} className="bg-white p-4 rounded-lg shadow-sm border border-rose-gold/10">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{vendor.image}</span>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-foreground">{vendor.name}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span className="text-xs font-medium">{vendor.rating}</span>
                        <ThumbsUp className="h-3 w-3 text-rose-gold" />
                        <span className="text-xs text-muted-foreground">{vendor.totalBookings}+ bookings</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search vendors, services, or locations..."
                className="pl-10 h-12 text-lg border-rose-gold/30 focus:border-rose-gold"
              />
            </div>

            {/* Sort and Filter */}
            <div className="flex space-x-3">
              <Select value={filters.sortBy} onValueChange={(value) => setFilters(prev => ({ ...prev, sortBy: value }))}>
                <SelectTrigger className="w-48 h-12 border-rose-gold/30">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="bookings">Most Booked</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name: A to Z</SelectItem>
                </SelectContent>
              </Select>

              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="h-12 border-rose-gold/30 hover:border-rose-gold">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[400px] sm:w-[540px]">
                  <SheetHeader>
                    <SheetTitle className="flex items-center space-x-2">
                      <Filter className="h-5 w-5 text-rose-gold" />
                      <span>Filter Vendors</span>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="space-y-6 mt-6">
                    {/* Price Range */}
                    <div>
                      <h4 className="font-semibold mb-3">Price Range</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-sm text-muted-foreground">Min Price</label>
                          <Input
                            type="number"
                            value={filters.priceRange.min}
                            onChange={(e) => setFilters(prev => ({
                              ...prev,
                              priceRange: { ...prev.priceRange, min: parseInt(e.target.value) || 0 }
                            }))}
                            className="border-rose-gold/30"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-muted-foreground">Max Price</label>
                          <Input
                            type="number"
                            value={filters.priceRange.max}
                            onChange={(e) => setFilters(prev => ({
                              ...prev,
                              priceRange: { ...prev.priceRange, max: parseInt(e.target.value) || 500000 }
                            }))}
                            className="border-rose-gold/30"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Rating */}
                    <div>
                      <h4 className="font-semibold mb-3">Minimum Rating</h4>
                      <Select value={filters.rating.toString()} onValueChange={(value) => setFilters(prev => ({ ...prev, rating: parseFloat(value) }))}>
                        <SelectTrigger className="border-rose-gold/30">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">Any Rating</SelectItem>
                          <SelectItem value="4.5">4.5+ Stars</SelectItem>
                          <SelectItem value="4.0">4.0+ Stars</SelectItem>
                          <SelectItem value="3.5">3.5+ Stars</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Location */}
                    <div>
                      <h4 className="font-semibold mb-3">Location</h4>
                      <Select value={filters.location} onValueChange={(value) => setFilters(prev => ({ ...prev, location: value }))}>
                        <SelectTrigger className="border-rose-gold/30">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Locations</SelectItem>
                          <SelectItem value="clifton">Clifton</SelectItem>
                          <SelectItem value="dha">DHA</SelectItem>
                          <SelectItem value="gulshan">Gulshan-e-Iqbal</SelectItem>
                          <SelectItem value="pechs">PECHS</SelectItem>
                          <SelectItem value="malir">Malir</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Availability */}
                    <div>
                      <h4 className="font-semibold mb-3">Availability</h4>
                      <Select value={filters.availability} onValueChange={(value) => setFilters(prev => ({ ...prev, availability: value }))}>
                        <SelectTrigger className="border-rose-gold/30">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Vendors</SelectItem>
                          <SelectItem value="available">Available Now</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Reset Filters */}
                    <div className="pt-6 border-t">
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => setFilters({
                          priceRange: { min: 0, max: 500000 },
                          location: 'all',
                          rating: 0,
                          availability: 'all',
                          sortBy: 'rating'
                        })}
                      >
                        Reset Filters
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "hero" : "elegant"}
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center space-x-2"
              >
                {category.emoji && <span className="text-lg">{category.emoji}</span>}
                <span>{category.name}</span>
                <Badge variant="secondary" className="ml-2 bg-white/20">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{getDisplayedVendors().length}</span> vendors
              {searchTerm && (
                <span> for "<span className="font-semibold text-rose-gold">{searchTerm}</span>"
                </span>
              )}
            </p>
          </div>

          {/* Vendor Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getDisplayedVendors().map((vendor) => (
              <Card key={vendor.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-rose-gold/20 hover:border-rose-gold/40">
                <CardHeader className="text-center pb-4">
                  <div className="text-6xl mb-4">{vendor.image}</div>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="bg-rose-gold/10 text-rose-gold">
                      {vendor.specialty}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{vendor.rating}</span>
                      {('reviewCount' in vendor) && (
                        <span className="text-xs text-muted-foreground">({vendor.reviewCount})</span>
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground group-hover:text-rose-gold transition-colors">
                    {vendor.name}
                  </CardTitle>
                  
                  {/* Availability Status */}
                  {('availability' in vendor) && (
                    <div className="flex items-center justify-center space-x-2 mt-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-green-600 font-medium">{vendor.availability}</span>
                      {vendor.responseTime && (
                        <>
                          <span className="text-muted-foreground">•</span>
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{vendor.responseTime}</span>
                        </>
                      )}
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {vendor.description}
                  </p>

                  {/* Service Highlights */}
                  {('highlights' in vendor) && vendor.highlights && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center">
                        <Award className="h-4 w-4 text-rose-gold mr-1" />
                        Service Highlights
                      </h4>
                      <div className="grid grid-cols-1 gap-1">
                        {vendor.highlights.slice(0, 3).map((highlight, index) => (
                          <div key={index} className="flex items-center space-x-1 text-xs">
                            <CheckCircle className="h-3 w-3 text-rose-gold flex-shrink-0" />
                            <span className="text-muted-foreground">{highlight}</span>
                          </div>
                        ))}
                        {vendor.highlights.length > 3 && (
                          <span className="text-xs text-rose-gold">+{vendor.highlights.length - 3} more</span>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="h-4 w-4 text-rose-gold" />
                      <span className="text-muted-foreground">{vendor.location}</span>
                    </div>
                    
                    {/* Experience & Bookings */}
                    {('experienceYears' in vendor || 'totalBookings' in vendor) && (
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        {vendor.experienceYears && (
                          <div className="flex items-center space-x-1">
                            <Award className="h-3 w-3" />
                            <span>{vendor.experienceYears}</span>
                          </div>
                        )}
                        {vendor.totalBookings && (
                          <div className="flex items-center space-x-1">
                            <TrendingUp className="h-3 w-3" />
                            <span>{vendor.totalBookings} bookings</span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs text-muted-foreground">Starting from</p>
                        <div className="flex items-center space-x-2">
                          <p className="text-lg font-bold text-rose-gold">{vendor.price}</p>
                          {('maxPrice' in vendor) && vendor.maxPrice && (
                            <p className="text-xs text-muted-foreground">- {vendor.maxPrice}</p>
                          )}
                        </div>
                      </div>
                    {'capacity' in vendor && (
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Capacity</p>
                        <p className="text-sm font-medium">{(vendor as any).capacity}</p>
                      </div>
                    )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      variant="hero" 
                      className="flex-1"
                      onClick={() => handleBookNow(vendor.name)}
                    >
                      Book Now
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => toggleWishlist(vendor.id, vendor.name)}
                      className={`border-rose-gold/30 hover:border-rose-gold ${
                        wishlist.includes(vendor.id) 
                          ? 'bg-rose-gold text-white border-rose-gold' 
                          : ''
                      }`}
                    >
                      {wishlist.includes(vendor.id) ? (
                        <Bookmark className="h-4 w-4" />
                      ) : (
                        <BookmarkPlus className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleViewVendor(vendor)}
                      className="border-rose-gold/30 hover:border-rose-gold"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {getDisplayedVendors().length === 0 && (
            <div className="text-center py-12">
              <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                No vendors found
              </h3>
              <p className="text-muted-foreground">
                Try selecting a different category or check back later for new vendors.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-rose-gold to-rose-gold-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="h-16 w-16 text-white mx-auto mb-6" />
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to Book Your Vendors?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Start booking your favorite vendors today and secure your dream team for your special day.
          </p>
          <Button 
            variant="outline" 
            size="lg" 
            className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-rose-gold"
            onClick={() => handleBookNow()}
          >
            Start Booking
          </Button>
        </div>
      </section>

      <Footer />

      {/* Vendor Detail Modal */}
      <Dialog open={isVendorDetailOpen} onOpenChange={setIsVendorDetailOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-3">
              <span className="text-4xl">{selectedVendor?.image}</span>
              <div>
                <h2 className="text-2xl font-bold">{selectedVendor?.name}</h2>
                <Badge className="bg-rose-gold/10 text-rose-gold">
                  {selectedVendor?.specialty}
                </Badge>
              </div>
            </DialogTitle>
          </DialogHeader>
          
          {selectedVendor && (
            <div className="space-y-6 py-4">
              {/* Rating and Availability */}
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <span className="font-semibold">{selectedVendor.rating}</span>
                  {selectedVendor.reviewCount && (
                    <span className="text-muted-foreground">({selectedVendor.reviewCount} reviews)</span>
                  )}
                </div>
                {selectedVendor.availability && (
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-green-600 font-medium">{selectedVendor.availability}</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <h4 className="font-semibold mb-2">About</h4>
                <p className="text-muted-foreground leading-relaxed">{selectedVendor.description}</p>
              </div>

              {/* Service Highlights */}
              {selectedVendor.highlights && (
                <div>
                  <h4 className="font-semibold mb-3 flex items-center">
                    <Award className="h-4 w-4 text-rose-gold mr-2" />
                    Service Highlights
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedVendor.highlights.map((highlight: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-rose-gold flex-shrink-0" />
                        <span className="text-sm">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Location and Contact */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Location</h4>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-rose-gold" />
                    <span>{selectedVendor.location}</span>
                  </div>
                </div>
                
                {selectedVendor.capacity && (
                  <div>
                    <h4 className="font-semibold mb-3">Capacity</h4>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-rose-gold" />
                      <span>{selectedVendor.capacity}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Experience and Statistics */}
              {(selectedVendor.experienceYears || selectedVendor.totalBookings) && (
                <div>
                  <h4 className="font-semibold mb-3">Experience & Track Record</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedVendor.experienceYears && (
                      <div className="text-center p-3 bg-rose-gold/5 rounded-lg">
                        <Award className="h-6 w-6 text-rose-gold mx-auto mb-1" />
                        <p className="font-semibold">{selectedVendor.experienceYears}</p>
                        <p className="text-sm text-muted-foreground">Experience</p>
                      </div>
                    )}
                    {selectedVendor.totalBookings && (
                      <div className="text-center p-3 bg-rose-gold/5 rounded-lg">
                        <TrendingUp className="h-6 w-6 text-rose-gold mx-auto mb-1" />
                        <p className="font-semibold">{selectedVendor.totalBookings}+</p>
                        <p className="text-sm text-muted-foreground">Bookings</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Pricing */}
              <div>
                <h4 className="font-semibold mb-3">Pricing</h4>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Starting from</span>
                    <span className="text-2xl font-bold text-rose-gold">{selectedVendor.price}</span>
                  </div>
                  {selectedVendor.maxPrice && (
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-muted-foreground">Up to</span>
                      <span className="text-lg font-semibold text-muted-foreground">{selectedVendor.maxPrice}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-6 border-t">
                <Button 
                  variant="hero" 
                  className="flex-1"
                  onClick={handleBookNow}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Now
                </Button>
                <Button
                  variant="outline"
                  onClick={() => toggleWishlist(selectedVendor.id, selectedVendor.name)}
                  className={`border-rose-gold/30 hover:border-rose-gold ${
                    wishlist.includes(selectedVendor.id) 
                      ? 'bg-rose-gold text-white border-rose-gold' 
                      : ''
                  }`}
                >
                  {wishlist.includes(selectedVendor.id) ? (
                    <><Bookmark className="h-4 w-4 mr-2" /> Saved</>
                  ) : (
                    <><BookmarkPlus className="h-4 w-4 mr-2" /> Save</>
                  )}
                </Button>
                <Button variant="outline" className="border-rose-gold/30 hover:border-rose-gold">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Vendors;
