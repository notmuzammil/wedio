import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useNotifications, createBookingNotification } from "@/contexts/NotificationContext";
import { 
  Scale,
  Star,
  MapPin,
  DollarSign,
  Clock,
  Users,
  CheckCircle,
  X,
  Heart,
  MessageSquare,
  Calendar,
  Award,
  TrendingUp,
  Phone,
  Mail,
  Globe,
  Bookmark,
  BookmarkPlus,
  ArrowRight,
  AlertCircle,
  ThumbsUp,
  Eye,
  Share2
} from "lucide-react";

interface Vendor {
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
  availability: string;
  responseTime: string;
  totalBookings: number;
  experienceYears: string;
  highlights: string[];
  contact: {
    phone: string;
    email: string;
    website?: string;
  };
  portfolio?: string[];
  specialties?: string[];
  capacity?: string;
  packages?: {
    name: string;
    price: number;
    features: string[];
  }[];
}

interface VendorComparisonProps {
  vendors: Vendor[];
  isOpen: boolean;
  onClose: () => void;
  onRemoveVendor: (vendorId: string) => void;
}

const VendorComparison = ({ vendors, isOpen, onClose, onRemoveVendor }: VendorComparisonProps) => {
  const navigate = useNavigate();
  const { showToastNotification, addNotification } = useNotifications();
  const [wishlist, setWishlist] = useState<string[]>([]);

  const toggleWishlist = (vendorId: string, vendorName: string) => {
    setWishlist(prev => {
      const isInWishlist = prev.includes(vendorId);
      const newWishlist = isInWishlist 
        ? prev.filter(id => id !== vendorId)
        : [...prev, vendorId];
      
      const message = isInWishlist 
        ? `${vendorName} removed from wishlist` 
        : `${vendorName} added to wishlist`;
        
      toast.success(message);
      
      if (!isInWishlist) {
        addNotification({
          type: 'system',
          title: 'Added to Wishlist',
          message: `${vendorName} has been added to your wishlist from comparison.`,
          read: false,
          priority: 'low',
          actionUrl: '/wishlist'
        });
      }
      
      return newWishlist;
    });
  };

  const bookVendor = (vendor: Vendor) => {
    showToastNotification(createBookingNotification(vendor.name, "Your Wedding Date", true));
    navigate("/login");
  };

  const contactVendor = (vendor: Vendor) => {
    toast.success(`Contacting ${vendor.name}...`);
    addNotification({
      type: 'inquiry',
      title: 'Vendor Contact from Comparison',
      message: `You have initiated contact with ${vendor.name} from the comparison tool. They will respond within ${vendor.responseTime.toLowerCase()}.`,
      read: false,
      priority: 'medium',
      actionUrl: '/messages'
    });
  };

  const shareComparison = () => {
    const vendorNames = vendors.map(v => v.name).join(', ');
    if (navigator.share) {
      navigator.share({
        title: 'Wedding Vendor Comparison',
        text: `Comparing: ${vendorNames}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`Comparing wedding vendors: ${vendorNames}`);
      toast.success("Comparison details copied to clipboard!");
    }
  };

  const getComparisonInsights = () => {
    if (vendors.length < 2) return null;

    const ratings = vendors.map(v => v.rating);
    const prices = vendors.map(v => v.priceNumeric);
    const bookings = vendors.map(v => v.totalBookings);

    const bestRated = vendors[ratings.indexOf(Math.max(...ratings))];
    const mostAffordable = vendors[prices.indexOf(Math.min(...prices))];
    const mostPopular = vendors[bookings.indexOf(Math.max(...bookings))];

    return { bestRated, mostAffordable, mostPopular };
  };

  const insights = getComparisonInsights();

  if (vendors.length === 0) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Scale className="h-5 w-5 text-rose-gold" />
              <span>Vendor Comparison</span>
            </DialogTitle>
          </DialogHeader>
          <div className="text-center py-8">
            <Scale className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No vendors to compare</h3>
            <p className="text-muted-foreground mb-6">
              Add vendors to comparison from the vendors page to see detailed side-by-side analysis.
            </p>
            <Button variant="hero" onClick={() => navigate("/vendors")}>
              Browse Vendors
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[95vw] max-h-[95vh] overflow-hidden">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center space-x-2">
              <Scale className="h-5 w-5 text-rose-gold" />
              <span>Compare Vendors ({vendors.length})</span>
            </DialogTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={shareComparison}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[80vh]">
          {/* Insights Section */}
          {insights && (
            <div className="mb-6 p-4 bg-rose-gold/5 rounded-lg border border-rose-gold/20">
              <h4 className="font-semibold text-foreground mb-3 flex items-center">
                <AlertCircle className="h-4 w-4 text-rose-gold mr-2" />
                Comparison Insights
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>Best Rated: <strong>{insights.bestRated.name}</strong> ({insights.bestRated.rating}⭐)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-green-500" />
                  <span>Most Affordable: <strong>{insights.mostAffordable.name}</strong></span>
                </div>
                <div className="flex items-center space-x-2">
                  <ThumbsUp className="h-4 w-4 text-blue-500" />
                  <span>Most Popular: <strong>{insights.mostPopular.name}</strong> ({insights.mostPopular.totalBookings}+ bookings)</span>
                </div>
              </div>
            </div>
          )}

          {/* Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-rose-gold/20">
                  <th className="text-left p-4 font-semibold text-muted-foreground min-w-[150px]">
                    Vendor Details
                  </th>
                  {vendors.map((vendor) => (
                    <th key={vendor.id} className="text-center p-4 min-w-[280px]">
                      <Card className="border-rose-gold/20">
                        <CardContent className="p-4">
                          <div className="flex flex-col items-center space-y-3">
                            <div className="relative">
                              <span className="text-4xl">{vendor.image}</span>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => onRemoveVendor(vendor.id)}
                                className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full bg-red-100 hover:bg-red-200"
                              >
                                <X className="h-3 w-3 text-red-600" />
                              </Button>
                            </div>
                            <div className="text-center">
                              <h3 className="font-semibold text-foreground">{vendor.name}</h3>
                              <Badge variant="secondary" className="bg-rose-gold/10 text-rose-gold text-xs mt-1">
                                {vendor.service}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Rating & Reviews */}
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium text-foreground">
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>Rating & Reviews</span>
                    </div>
                  </td>
                  {vendors.map((vendor) => (
                    <td key={vendor.id} className="p-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="font-semibold">{vendor.rating}</span>
                        <span className="text-sm text-muted-foreground">({vendor.reviewCount})</span>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Location */}
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium text-foreground">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-rose-gold" />
                      <span>Location</span>
                    </div>
                  </td>
                  {vendors.map((vendor) => (
                    <td key={vendor.id} className="p-4 text-center">
                      <span className="text-sm">{vendor.location}</span>
                    </td>
                  ))}
                </tr>

                {/* Pricing */}
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium text-foreground">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span>Starting Price</span>
                    </div>
                  </td>
                  {vendors.map((vendor) => (
                    <td key={vendor.id} className="p-4 text-center">
                      <span className="font-semibold text-rose-gold">{vendor.price}</span>
                    </td>
                  ))}
                </tr>

                {/* Availability */}
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium text-foreground">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Availability</span>
                    </div>
                  </td>
                  {vendors.map((vendor) => (
                    <td key={vendor.id} className="p-4 text-center">
                      <Badge className="bg-green-50 text-green-600 text-xs">
                        {vendor.availability}
                      </Badge>
                    </td>
                  ))}
                </tr>

                {/* Response Time */}
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium text-foreground">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-orange-500" />
                      <span>Response Time</span>
                    </div>
                  </td>
                  {vendors.map((vendor) => (
                    <td key={vendor.id} className="p-4 text-center">
                      <span className="text-sm">{vendor.responseTime}</span>
                    </td>
                  ))}
                </tr>

                {/* Experience */}
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium text-foreground">
                    <div className="flex items-center space-x-2">
                      <Award className="h-4 w-4 text-purple-600" />
                      <span>Experience</span>
                    </div>
                  </td>
                  {vendors.map((vendor) => (
                    <td key={vendor.id} className="p-4 text-center">
                      <span className="text-sm">{vendor.experienceYears}</span>
                    </td>
                  ))}
                </tr>

                {/* Total Bookings */}
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium text-foreground">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                      <span>Total Bookings</span>
                    </div>
                  </td>
                  {vendors.map((vendor) => (
                    <td key={vendor.id} className="p-4 text-center">
                      <span className="text-sm font-medium">{vendor.totalBookings}+</span>
                    </td>
                  ))}
                </tr>

                {/* Highlights */}
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium text-foreground">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Key Features</span>
                    </div>
                  </td>
                  {vendors.map((vendor) => (
                    <td key={vendor.id} className="p-4">
                      <div className="space-y-1">
                        {vendor.highlights.slice(0, 4).map((highlight, index) => (
                          <div key={index} className="flex items-center space-x-2 text-xs">
                            <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                            <span className="text-muted-foreground">{highlight}</span>
                          </div>
                        ))}
                        {vendor.highlights.length > 4 && (
                          <span className="text-xs text-rose-gold">+{vendor.highlights.length - 4} more</span>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Contact Information */}
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium text-foreground">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-blue-600" />
                      <span>Contact</span>
                    </div>
                  </td>
                  {vendors.map((vendor) => (
                    <td key={vendor.id} className="p-4">
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center justify-center space-x-1">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">{vendor.contact.phone}</span>
                        </div>
                        <div className="flex items-center justify-center space-x-1">
                          <Mail className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground truncate">{vendor.contact.email}</span>
                        </div>
                        {vendor.contact.website && (
                          <div className="flex items-center justify-center space-x-1">
                            <Globe className="h-3 w-3 text-muted-foreground" />
                            <span className="text-muted-foreground truncate">{vendor.contact.website}</span>
                          </div>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Actions */}
                <tr>
                  <td className="p-4 font-medium text-foreground">
                    <span>Quick Actions</span>
                  </td>
                  {vendors.map((vendor) => (
                    <td key={vendor.id} className="p-4">
                      <div className="flex flex-col space-y-2">
                        <Button 
                          variant="hero" 
                          size="sm"
                          onClick={() => bookVendor(vendor)}
                          className="w-full"
                        >
                          <Calendar className="h-3 w-3 mr-2" />
                          Book Now
                        </Button>
                        
                        <div className="grid grid-cols-3 gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => contactVendor(vendor)}
                            className="border-rose-gold/30 hover:border-rose-gold p-2"
                          >
                            <MessageSquare className="h-3 w-3" />
                          </Button>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleWishlist(vendor.id, vendor.name)}
                            className={`border-rose-gold/30 hover:border-rose-gold p-2 ${
                              wishlist.includes(vendor.id) 
                                ? 'bg-rose-gold text-white border-rose-gold' 
                                : ''
                            }`}
                          >
                            {wishlist.includes(vendor.id) ? (
                              <Bookmark className="h-3 w-3" />
                            ) : (
                              <BookmarkPlus className="h-3 w-3" />
                            )}
                          </Button>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate("/vendors")}
                            className="border-rose-gold/30 hover:border-rose-gold p-2"
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Action Bar */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div>
                <h4 className="font-semibold text-foreground mb-1">Ready to make a decision?</h4>
                <p className="text-sm text-muted-foreground">
                  Compare features and choose the perfect vendors for your special day.
                </p>
              </div>
              <div className="flex space-x-3">
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/vendors")}
                  className="border-rose-gold/30 hover:border-rose-gold"
                >
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VendorComparison;
