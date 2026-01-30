import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useNavigate, useSearchParams } from "react-router-dom";
import { 
  Heart, 
  Upload,
  MapPin, 
  Utensils, 
  Camera, 
  Palette, 
  Crown,
  Brush,
  Music,
  Sparkles,
  ArrowLeft,
  X,
  Plus,
  Image as ImageIcon
} from "lucide-react";

const AddService = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || '';
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    serviceName: "",
    description: "",
    price: "",
    location: "",
    capacity: "",
    specialties: [] as string[],
    amenities: [] as string[],
    contactNumber: "",
    email: "",
    website: "",
    experience: "",
    packages: [] as string[]
  });

  const serviceCategories = {
    venues: {
      name: "Venues",
      icon: "🏛️",
      color: "from-blue-500 to-blue-600",
      requiredFields: ["location", "capacity"],
      specialties: ["Wedding Halls", "Outdoor Venues", "Farmhouses", "Beach Venues", "Garden Venues", "Hotel Banquets"],
      amenities: ["Parking", "Catering Kitchen", "Sound System", "Lighting", "Decoration", "Security", "Air Conditioning", "Generator"]
    },
    catering: {
      name: "Catering",
      icon: "🍽️",
      color: "from-green-500 to-green-600",
      requiredFields: ["specialties"],
      specialties: ["Pakistani Cuisine", "Mughlai", "International", "Vegetarian", "Halal", "Desserts", "Beverages"],
      amenities: ["Serving Staff", "Table Setup", "Dishes & Cutlery", "Transportation", "Cleanup", "Menu Planning"]
    },
    photography: {
      name: "Photography",
      icon: "📸",
      color: "from-purple-500 to-purple-600",
      requiredFields: ["experience"],
      specialties: ["Wedding Photography", "Videography", "Engagement Shoots", "Pre-wedding", "Post-wedding", "Drone Photography"],
      amenities: ["Professional Equipment", "Editing", "Album Design", "Online Gallery", "Printing", "Backup Services"]
    },
    makeup: {
      name: "Makeup Artists",
      icon: "💄",
      color: "from-pink-500 to-pink-600",
      requiredFields: ["experience"],
      specialties: ["Bridal Makeup", "Party Makeup", "Hair Styling", "Mehendi Design", "Nail Art", "Traditional Looks"],
      amenities: ["Premium Products", "Trial Sessions", "On-location Service", "Touch-up Kit", "Hair Accessories"]
    },
    wardrobe: {
      name: "Wardrobe",
      icon: "👗",
      color: "from-yellow-500 to-yellow-600",
      requiredFields: ["specialties"],
      specialties: ["Bridal Dresses", "Groom Suits", "Family Outfits", "Designer Collection", "Rental Service", "Custom Tailoring"],
      amenities: ["Fittings", "Alterations", "Accessories", "Dry Cleaning", "Storage", "Delivery"]
    },
    henna: {
      name: "Henna Artists",
      icon: "🎨",
      color: "from-orange-500 to-orange-600",
      requiredFields: ["experience"],
      specialties: ["Bridal Mehendi", "Traditional Designs", "Arabic Patterns", "Indo-Pak Style", "Modern Designs", "Kids Mehendi"],
      amenities: ["Natural Henna", "Design Consultation", "On-location Service", "Touch-up", "Aftercare Kit"]
    },
    decoration: {
      name: "Decoration",
      icon: "✨",
      color: "from-indigo-500 to-indigo-600",
      requiredFields: ["specialties"],
      specialties: ["Wedding Décor", "Flower Arrangements", "Lighting", "Stage Setup", "Entrance Décor", "Table Settings"],
      amenities: ["Setup & Teardown", "Flower Supply", "Lighting Equipment", "Props", "Coordination", "Maintenance"]
    },
    music: {
      name: "Music & Entertainment",
      icon: "🎵",
      color: "from-red-500 to-red-600",
      requiredFields: ["specialties"],
      specialties: ["Live Music", "DJ Services", "Classical Music", "Modern Songs", "Dance Performances", "Sound System"],
      amenities: ["Professional Equipment", "Song Requests", "MC Services", "Background Music", "Setup & Teardown"]
    }
  };

  const currentCategory = serviceCategories[category as keyof typeof serviceCategories];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayFieldChange = (field: string, value: string, action: 'add' | 'remove') => {
    setFormData(prev => ({
      ...prev,
      [field]: action === 'add' 
        ? [...prev[field as keyof typeof prev] as string[], value]
        : (prev[field as keyof typeof prev] as string[]).filter(item => item !== value)
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (files.length + uploadedImages.length > 10) {
      toast.error("Maximum 10 images allowed");
      return;
    }

    const validFiles = files.filter(file => {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} is too large. Maximum size is 5MB`);
        return false;
      }
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} is not an image file`);
        return false;
      }
      return true;
    });

    setUploadedImages(prev => [...prev, ...validFiles]);

    // Create preview URLs
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviewUrls(prev => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    if (!formData.serviceName || !formData.description || !formData.price) {
      toast.error("Please fill in all required fields");
      return false;
    }

    if (currentCategory?.requiredFields.includes("location") && !formData.location) {
      toast.error("Location is required for venue services");
      return false;
    }

    if (currentCategory?.requiredFields.includes("capacity") && !formData.capacity) {
      toast.error("Capacity is required for venue services");
      return false;
    }

    if (uploadedImages.length === 0) {
      toast.error("Please upload at least one image");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate service creation process
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast.success("Service listing created successfully!");
    setIsLoading(false);
    
    setTimeout(() => {
      navigate("/vendor-dashboard");
    }, 1000);
  };

  if (!currentCategory) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground mb-4">Invalid service category</p>
            <Button onClick={() => navigate("/vendor-dashboard")}>
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-rose-gold/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate("/vendor-dashboard")}
                className="text-muted-foreground hover:text-rose-gold"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className={`bg-gradient-to-r ${currentCategory.color} p-2 rounded-full`}>
                <span className="text-white text-lg">{currentCategory.icon}</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Add {currentCategory.name} Service</h1>
                <p className="text-sm text-muted-foreground">Create a new service listing</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="border-rose-gold/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className={`bg-gradient-to-r ${currentCategory.color} p-2 rounded-full`}>
                  <span className="text-white text-lg">{currentCategory.icon}</span>
                </span>
                <span>Add New {currentCategory.name} Service</span>
              </CardTitle>
              <CardDescription>
                Fill in the details below to create your service listing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Basic Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="serviceName" className="text-foreground">Service Name *</Label>
                      <Input
                        id="serviceName"
                        name="serviceName"
                        placeholder="Enter service name"
                        value={formData.serviceName}
                        onChange={handleInputChange}
                        className="border-rose-gold/30 focus:border-rose-gold"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="price" className="text-foreground">Starting Price *</Label>
                      <Input
                        id="price"
                        name="price"
                        placeholder="e.g., Rs. 50,000"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="border-rose-gold/30 focus:border-rose-gold"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-foreground">Description *</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Describe your service in detail..."
                      value={formData.description}
                      onChange={handleInputChange}
                      className="border-rose-gold/30 focus:border-rose-gold min-h-[100px]"
                      required
                    />
                  </div>

                  {/* Category-specific fields */}
                  {currentCategory.requiredFields.includes("location") && (
                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-foreground">Venue Location *</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="location"
                          name="location"
                          placeholder="Enter venue address"
                          value={formData.location}
                          onChange={handleInputChange}
                          className="pl-10 border-rose-gold/30 focus:border-rose-gold"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {currentCategory.requiredFields.includes("capacity") && (
                    <div className="space-y-2">
                      <Label htmlFor="capacity" className="text-foreground">Venue Capacity *</Label>
                      <Input
                        id="capacity"
                        name="capacity"
                        placeholder="e.g., 500-800 guests"
                        value={formData.capacity}
                        onChange={handleInputChange}
                        className="border-rose-gold/30 focus:border-rose-gold"
                        required
                      />
                    </div>
                  )}

                  {currentCategory.requiredFields.includes("experience") && (
                    <div className="space-y-2">
                      <Label htmlFor="experience" className="text-foreground">Years of Experience *</Label>
                      <Input
                        id="experience"
                        name="experience"
                        placeholder="e.g., 5+ years"
                        value={formData.experience}
                        onChange={handleInputChange}
                        className="border-rose-gold/30 focus:border-rose-gold"
                        required
                      />
                    </div>
                  )}
                </div>

                {/* Specialties */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Specialties</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {currentCategory.specialties.map((specialty) => (
                      <div key={specialty} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={specialty}
                          checked={formData.specialties.includes(specialty)}
                          onChange={(e) => handleArrayFieldChange(
                            'specialties', 
                            specialty, 
                            e.target.checked ? 'add' : 'remove'
                          )}
                          className="rounded border-rose-gold/30"
                        />
                        <label htmlFor={specialty} className="text-sm text-muted-foreground cursor-pointer">
                          {specialty}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Amenities & Services</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {currentCategory.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={amenity}
                          checked={formData.amenities.includes(amenity)}
                          onChange={(e) => handleArrayFieldChange(
                            'amenities', 
                            amenity, 
                            e.target.checked ? 'add' : 'remove'
                          )}
                          className="rounded border-rose-gold/30"
                        />
                        <label htmlFor={amenity} className="text-sm text-muted-foreground cursor-pointer">
                          {amenity}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contactNumber" className="text-foreground">Contact Number</Label>
                      <Input
                        id="contactNumber"
                        name="contactNumber"
                        placeholder="Enter contact number"
                        value={formData.contactNumber}
                        onChange={handleInputChange}
                        className="border-rose-gold/30 focus:border-rose-gold"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-foreground">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter email address"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="border-rose-gold/30 focus:border-rose-gold"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website" className="text-foreground">Website (Optional)</Label>
                    <Input
                      id="website"
                      name="website"
                      placeholder="https://yourwebsite.com"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="border-rose-gold/30 focus:border-rose-gold"
                    />
                  </div>
                </div>

                {/* Image Upload */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Service Images *</h3>
                  <p className="text-sm text-muted-foreground">
                    Upload high-quality images of your work. Maximum 10 images, 5MB each.
                  </p>
                  
                  <div className="border-2 border-dashed border-rose-gold/30 rounded-lg p-6 text-center">
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="border-rose-gold/30 hover:border-rose-gold"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Images
                    </Button>
                    <p className="text-sm text-muted-foreground mt-2">
                      Click to select images or drag and drop
                    </p>
                  </div>

                  {/* Image Previews */}
                  {imagePreviewUrls.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {imagePreviewUrls.map((url, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={url}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-4 pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/vendor-dashboard")}
                    className="border-rose-gold/30 hover:border-rose-gold"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="hero"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Creating Service...
                      </>
                    ) : (
                      "Create Service Listing"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddService;
