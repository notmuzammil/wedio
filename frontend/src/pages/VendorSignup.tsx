import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";
import { 
  Heart, 
  Mail, 
  Lock, 
  Building2,
  User,
  Phone,
  MapPin,
  Eye,
  EyeOff,
  ArrowLeft,
  Check,
  Upload,
  X,
  Image as ImageIcon,
  FileText,
  Plus,
  DollarSign
} from "lucide-react";
import { vendorSignup } from "@/services/auth"; // Add this import

const VendorSignup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  
  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "",
    ownerName: "",
    cnic: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    password: "",
    confirmPassword: "",
    serviceCategories: [] as string[],
    serviceDetails: {
      serviceName: "",
      description: "",
      pricing: "",
      maxPrice: "",
      highlights: [] as string[]
    },
    portfolio: {
      images: [] as File[],
      previewUrls: [] as string[]
    },
    termsAccepted: false,
    cnicDocument: null as File | null
  });

  const serviceCategories = [
    { id: "venues", name: "Venues", emoji: "🏛️", description: "Wedding halls, outdoor venues, farmhouses" },
    { id: "catering", name: "Catering", emoji: "🍽️", description: "Food services, menu planning, staff" },
    { id: "photography", name: "Photography", emoji: "📸", description: "Wedding photography, videography" },
    { id: "makeup", name: "Makeup Artists", emoji: "💄", description: "Bridal makeup, party makeup" },
    { id: "wardrobe", name: "Wardrobe", emoji: "👗", description: "Wedding dresses, designer outfits" },
    { id: "henna", name: "Henna Artists", emoji: "🎨", description: "Mehendi designs, traditional art" },
    { id: "decoration", name: "Decoration", emoji: "✨", description: "Wedding décor, floral arrangements" },
    { id: "music", name: "Music & Entertainment", emoji: "🎵", description: "Live music, DJ services" }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryToggle = (categoryId: string) => {
    setFormData(prev => ({
      ...prev,
      serviceCategories: prev.serviceCategories.includes(categoryId)
        ? prev.serviceCategories.filter(id => id !== categoryId)
        : [...prev.serviceCategories, categoryId]
    }));
  };

  const handleServiceDetailsChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      serviceDetails: {
        ...prev.serviceDetails,
        [field]: value
      }
    }));
  };

  const handleHighlightAdd = () => {
    const input = document.getElementById('highlight-input') as HTMLInputElement;
    if (input?.value.trim()) {
      setFormData(prev => ({
        ...prev,
        serviceDetails: {
          ...prev.serviceDetails,
          highlights: [...prev.serviceDetails.highlights, input.value.trim()]
        }
      }));
      input.value = '';
    }
  };

  const handleHighlightRemove = (index: number) => {
    setFormData(prev => ({
      ...prev,
      serviceDetails: {
        ...prev.serviceDetails,
        highlights: prev.serviceDetails.highlights.filter((_, i) => i !== index)
      }
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = files.filter(file => file.type.startsWith('image/'));
    
    if (newImages.length + formData.portfolio.images.length > 10) {
      toast.error('You can upload maximum 10 images');
      return;
    }

    const newPreviewUrls = newImages.map(file => URL.createObjectURL(file));
    
    setFormData(prev => ({
      ...prev,
      portfolio: {
        images: [...prev.portfolio.images, ...newImages],
        previewUrls: [...prev.portfolio.previewUrls, ...newPreviewUrls]
      }
    }));
  };

  const handleImageRemove = (index: number) => {
    setFormData(prev => ({
      ...prev,
      portfolio: {
        images: prev.portfolio.images.filter((_, i) => i !== index),
        previewUrls: prev.portfolio.previewUrls.filter((_, i) => i !== index)
      }
    }));
  };

  const handleCnicUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, cnicDocument: file }));
    }
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (formData.serviceCategories.length === 0) {
        toast.error("Please select at least one service category");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!formData.serviceDetails.serviceName || !formData.serviceDetails.description || !formData.serviceDetails.pricing) {
        toast.error("Please fill in all service details");
        return;
      }
      setStep(3);
    } else if (step === 3) {
      if (formData.portfolio.images.length === 0) {
        toast.error("Please upload at least one portfolio image");
        return;
      }
      setStep(4);
    }
  };

  const handlePrevStep = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }

    if (!formData.termsAccepted) {
      toast.error("Please accept the terms and conditions");
      return;
    }

    if (formData.serviceCategories.length === 0) {
      toast.error("Please select at least one service category");
      return;
    }

    setIsLoading(true);

    try {
      // Map frontend categories to backend enum values
      const categoryMapping: { [key: string]: "HALL" | "CATERING" | "CAR_RENTAL" | "BEAUTY" | "OTHER" } = {
        "venues": "HALL",
        "catering": "CATERING",
        "photography": "OTHER",
        "makeup": "BEAUTY",
        "wardrobe": "OTHER",
        "henna": "BEAUTY",
        "decoration": "OTHER",
        "music": "OTHER"
      };

      // Get the first selected category and map it to backend enum
      const primaryCategory = categoryMapping[formData.serviceCategories[0]];

      // Create the vendor signup payload
      const vendorData = {
        email: formData.email,
        name: formData.ownerName,
        password: formData.password,
        phone: formData.phone,
        role: "VENDOR" as const,
        businessName: formData.businessName,
        vendorCategory: primaryCategory,
        city: formData.city,
        area: formData.address.split(',')[0].trim(), // Using first part of address as area
        address: formData.address,
        description: formData.serviceDetails.description || `${formData.businessName} - Professional ${primaryCategory.toLowerCase()} services`,
        logoUrl: formData.portfolio.previewUrls[0] || "" // Using first portfolio image as logo
      };

      const response = await vendorSignup(vendorData);

      // Store authentication tokens
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);

      toast.success("Vendor account created successfully! Welcome to Aasaan Shaadi!");
      
      // Redirect to vendor dashboard
      setTimeout(() => {
        navigate("/vendor-dashboard");
      }, 1500);
    } catch (error: any) {
      console.error("Vendor signup error:", error);
      const errorMessage = error.response?.data?.message || 
                          "Failed to create vendor account. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Step 1: Choose Category
  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">Select Your Service Categories</h3>
        <p className="text-muted-foreground">Choose the services you want to offer to customers</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {serviceCategories.map((category) => (
          <div
            key={category.id}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
              formData.serviceCategories.includes(category.id)
                ? 'border-rose-gold bg-rose-gold/5'
                : 'border-rose-gold/20 hover:border-rose-gold/40'
            }`}
            onClick={() => handleCategoryToggle(category.id)}
          >
            <div className="flex items-center space-x-3">
              <div className="text-2xl">{category.emoji}</div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground">{category.name}</h4>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </div>
              {formData.serviceCategories.includes(category.id) && (
                <div className="bg-rose-gold text-white p-1 rounded-full">
                  <Check className="h-4 w-4" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Selected: <span className="font-semibold text-rose-gold">{formData.serviceCategories.length}</span> categories
        </p>
      </div>
    </div>
  );

  // Step 2: Service Details
  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">Enter Service Details</h3>
        <p className="text-muted-foreground">Tell us about your services and pricing</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="serviceName" className="text-foreground">Service Name *</Label>
          <Input
            id="serviceName"
            placeholder="e.g., Premium Wedding Photography"
            value={formData.serviceDetails.serviceName}
            onChange={(e) => handleServiceDetailsChange('serviceName', e.target.value)}
            className="border-rose-gold/30 focus:border-rose-gold"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-foreground">Service Description *</Label>
          <Textarea
            id="description"
            placeholder="Describe your services in detail..."
            value={formData.serviceDetails.description}
            onChange={(e) => handleServiceDetailsChange('description', e.target.value)}
            className="border-rose-gold/30 focus:border-rose-gold min-h-[100px]"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="pricing" className="text-foreground">Starting Price (PKR) *</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="pricing"
                placeholder="25,000"
                value={formData.serviceDetails.pricing}
                onChange={(e) => handleServiceDetailsChange('pricing', e.target.value)}
                className="pl-10 border-rose-gold/30 focus:border-rose-gold"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxPrice" className="text-foreground">Maximum Price (PKR)</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="maxPrice"
                placeholder="100,000"
                value={formData.serviceDetails.maxPrice}
                onChange={(e) => handleServiceDetailsChange('maxPrice', e.target.value)}
                className="pl-10 border-rose-gold/30 focus:border-rose-gold"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-foreground">Service Highlights</Label>
          <div className="flex space-x-2">
            <Input
              id="highlight-input"
              placeholder="Add a service highlight..."
              className="border-rose-gold/30 focus:border-rose-gold"
            />
            <Button type="button" variant="outline" onClick={handleHighlightAdd}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {formData.serviceDetails.highlights.length > 0 && (
            <div className="space-y-2">
              {formData.serviceDetails.highlights.map((highlight, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-rose-gold/5 rounded-lg">
                  <span className="text-sm">{highlight}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleHighlightRemove(index)}
                    className="h-6 w-6 p-0 hover:bg-rose-gold/20"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Step 3: Upload Portfolio
  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">Upload Portfolio Images</h3>
        <p className="text-muted-foreground">Showcase your work with high-quality images (Max 10 images)</p>
      </div>

      <div className="space-y-4">
        <div className="border-2 border-dashed border-rose-gold/30 rounded-lg p-8 text-center hover:border-rose-gold/60 transition-colors">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="portfolio-upload"
          />
          <label htmlFor="portfolio-upload" className="cursor-pointer">
            <ImageIcon className="h-12 w-12 text-rose-gold mx-auto mb-4" />
            <p className="text-foreground font-semibold mb-2">Click to upload images</p>
            <p className="text-sm text-muted-foreground">
              Supported formats: JPG, PNG, GIF (Max 5MB each)
            </p>
          </label>
        </div>

        {formData.portfolio.previewUrls.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {formData.portfolio.previewUrls.map((url, index) => (
              <div key={index} className="relative group">
                <img
                  src={url}
                  alt={`Portfolio ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg border border-rose-gold/20"
                />
                <button
                  type="button"
                  onClick={() => handleImageRemove(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="cnicUpload" className="text-foreground">Upload CNIC Document (For Verification)</Label>
          <div className="border-2 border-dashed border-rose-gold/30 rounded-lg p-4 text-center hover:border-rose-gold/60 transition-colors">
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleCnicUpload}
              className="hidden"
              id="cnic-upload"
            />
            <label htmlFor="cnic-upload" className="cursor-pointer">
              <FileText className="h-8 w-8 text-rose-gold mx-auto mb-2" />
              <p className="text-sm text-foreground">
                {formData.cnicDocument ? formData.cnicDocument.name : "Click to upload CNIC document"}
              </p>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  // Step 4: Preview & Submit
  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">Preview & Submit</h3>
        <p className="text-muted-foreground">Review your information before submitting</p>
      </div>

      <div className="space-y-6">
        {/* Business Info */}
        <Card className="border-rose-gold/20">
          <CardHeader>
            <CardTitle className="text-lg">Business Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Business Name *</Label>
                <Input
                  value={formData.businessName}
                  onChange={handleInputChange}
                  name="businessName"
                  placeholder="Enter business name"
                  className="border-rose-gold/30 focus:border-rose-gold"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Owner/Manager Name *</Label>
                <Input
                  value={formData.ownerName}
                  onChange={handleInputChange}
                  name="ownerName"
                  placeholder="Enter owner name"
                  className="border-rose-gold/30 focus:border-rose-gold"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>CNIC Number *</Label>
                <Input
                  value={formData.cnic}
                  onChange={handleInputChange}
                  name="cnic"
                  placeholder="00000-0000000-0"
                  className="border-rose-gold/30 focus:border-rose-gold"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Email *</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  name="email"
                  placeholder="Enter email"
                  className="border-rose-gold/30 focus:border-rose-gold"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Phone *</Label>
                <Input
                  value={formData.phone}
                  onChange={handleInputChange}
                  name="phone"
                  placeholder="Enter phone"
                  className="border-rose-gold/30 focus:border-rose-gold"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>City *</Label>
                <Input
                  value={formData.city}
                  onChange={handleInputChange}
                  name="city"
                  placeholder="Enter city"
                  className="border-rose-gold/30 focus:border-rose-gold"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Address *</Label>
              <Input
                value={formData.address}
                onChange={handleInputChange}
                name="address"
                placeholder="Enter address"
                className="border-rose-gold/30 focus:border-rose-gold"
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Account Setup */}
        <Card className="border-rose-gold/20">
          <CardHeader>
            <CardTitle className="text-lg">Account Setup</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Password *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    name="password"
                    placeholder="Create password"
                    className="pl-10 pr-10 border-rose-gold/30 focus:border-rose-gold"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-rose-gold"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Confirm Password *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    name="confirmPassword"
                    placeholder="Confirm password"
                    className="pl-10 pr-10 border-rose-gold/30 focus:border-rose-gold"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-rose-gold"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Terms and Conditions */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={formData.termsAccepted}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, termsAccepted: checked as boolean }))}
            className="border-rose-gold/30 data-[state=checked]:bg-rose-gold data-[state=checked]:border-rose-gold"
          />
          <label htmlFor="terms" className="text-sm text-muted-foreground">
            I agree to the{" "}
            <button type="button" className="text-rose-gold hover:underline">
              Terms of Service
            </button>{" "}
            and{" "}
            <button type="button" className="text-rose-gold hover:underline">
              Privacy Policy
            </button>
          </label>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pearl via-background to-blush flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative w-full max-w-2xl">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")} 
          className="mb-6 text-muted-foreground hover:text-rose-gold"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>

        {/* Logo & Welcome */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 group">
            <div className="bg-gradient-to-r from-rose-gold to-rose-gold-light p-3 rounded-full group-hover:shadow-lg transition-all duration-300">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-rose-gold to-rose-gold-dark bg-clip-text text-transparent">
              Aasaan Shaadi
            </span>
          </Link>
          <div className="mt-4 flex items-center justify-center space-x-2">
            <Building2 className="h-5 w-5 text-rose-gold" />
            <span className="text-lg font-semibold text-foreground">Vendor Registration</span>
          </div>
          <p className="text-muted-foreground mt-3">
            Join our vendor network and start offering your services to customers
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Step {step} of 4</span>
            <span className="text-sm text-muted-foreground">
              {step === 1 ? "Choose Category" : step === 2 ? "Service Details" : step === 3 ? "Upload Portfolio" : "Preview & Submit"}
            </span>
          </div>
          <div className="w-full bg-rose-gold/20 rounded-full h-2">
            <div 
              className="bg-rose-gold h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Registration Card */}
        <Card className="border-rose-gold/20 shadow-2xl backdrop-blur-sm bg-white/95">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-foreground">
              {step === 1 ? "Choose Categories" : step === 2 ? "Service Details" : step === 3 ? "Upload Portfolio" : "Preview & Submit"}
            </CardTitle>
            <CardDescription>
              {step === 1 
                ? "Select the services you want to offer" 
                : step === 2 
                ? "Enter your service information and pricing" 
                : step === 3
                ? "Upload your portfolio and documents"
                : "Review your information and create account"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 && renderStep1()}
              {step === 2 && renderStep2()}
              {step === 3 && renderStep3()}
              {step === 4 && renderStep4()}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-4">
                {step > 1 && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handlePrevStep}
                    className="border-rose-gold/30 hover:border-rose-gold"
                  >
                    Previous
                  </Button>
                )}
                
                {step < 4 ? (
                  <Button 
                    type="button" 
                    variant="hero" 
                    onClick={handleNextStep}
                    className="ml-auto"
                  >
                    Next Step
                  </Button>
                ) : (
                  <Button 
                    type="submit" 
                    variant="hero" 
                    className="ml-auto"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Creating Account...
                      </>
                    ) : (
                      "Create Vendor Account"
                    )}
                  </Button>
                )}
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have a vendor account?{" "}
                <Link to="/vendor-login" className="text-rose-gold hover:underline font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VendorSignup;