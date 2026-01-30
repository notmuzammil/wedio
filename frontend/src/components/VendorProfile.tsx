import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { 
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe,
  Star,
  CheckCircle,
  Edit,
  Plus,
  X,
  Shield,
  Award,
  Clock,
  Camera,
  FileText,
  Upload
} from "lucide-react";

interface VendorProfileData {
  businessName: string;
  businessType: string;
  location: string;
  description: string;
  phone: string;
  email: string;
  website?: string;
  rating: number;
  reviewCount: number;
  responseTime: string;
  availability: string;
  highlights: string[];
  verificationStatus: 'pending' | 'verified' | 'rejected' | 'not_submitted';
  cnicVerified: boolean;
  experienceYears?: string;
  totalBookings?: number;
}

interface VendorProfileProps {
  vendorData: VendorProfileData;
  isOwner?: boolean;
  onProfileUpdate?: (data: Partial<VendorProfileData>) => void;
}

const VendorProfile = ({ vendorData, isOwner = false, onProfileUpdate }: VendorProfileProps) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isHighlightsEditOpen, setIsHighlightsEditOpen] = useState(false);
  const [profileForm, setProfileForm] = useState(vendorData);
  const [newHighlight, setNewHighlight] = useState("");
  const [cnicFile, setCnicFile] = useState<File | null>(null);

  const handleProfileSave = () => {
    if (onProfileUpdate) {
      onProfileUpdate(profileForm);
    }
    setIsEditOpen(false);
    toast.success("Profile updated successfully!");
  };

  const handleHighlightAdd = () => {
    if (newHighlight.trim() && profileForm.highlights.length < 8) {
      setProfileForm(prev => ({
        ...prev,
        highlights: [...prev.highlights, newHighlight.trim()]
      }));
      setNewHighlight("");
    }
  };

  const handleHighlightRemove = (index: number) => {
    setProfileForm(prev => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index)
    }));
  };

  const handleHighlightsSave = () => {
    if (onProfileUpdate) {
      onProfileUpdate({ highlights: profileForm.highlights });
    }
    setIsHighlightsEditOpen(false);
    toast.success("Service highlights updated!");
  };

  const handleCnicUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCnicFile(file);
      toast.success("CNIC document uploaded. Verification in progress...");
    }
  };

  const getVerificationBadge = () => {
    switch (vendorData.verificationStatus) {
      case 'verified':
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <Shield className="h-3 w-3 mr-1" />
            Verified Vendor
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <Clock className="h-3 w-3 mr-1" />
            Verification Pending
          </Badge>
        );
      case 'rejected':
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <X className="h-3 w-3 mr-1" />
            Verification Failed
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 border-gray-200">
            <Shield className="h-3 w-3 mr-1" />
            Not Verified
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Profile Card */}
      <Card className="border-rose-gold/20">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-rose-gold to-rose-gold-light p-3 rounded-full">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-2xl font-bold text-foreground">{vendorData.businessName}</h2>
                  {getVerificationBadge()}
                </div>
                <p className="text-lg text-muted-foreground">{vendorData.businessType}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-semibold">{vendorData.rating}</span>
                    <span className="text-sm text-muted-foreground">({vendorData.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-muted-foreground">{vendorData.responseTime}</span>
                  </div>
                </div>
              </div>
            </div>

            {isOwner && (
              <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="border-rose-gold/30 hover:border-rose-gold">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Edit Vendor Profile</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Business Name</Label>
                        <Input
                          value={profileForm.businessName}
                          onChange={(e) => setProfileForm(prev => ({ ...prev, businessName: e.target.value }))}
                          className="border-rose-gold/30 focus:border-rose-gold"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Business Type</Label>
                        <Input
                          value={profileForm.businessType}
                          onChange={(e) => setProfileForm(prev => ({ ...prev, businessType: e.target.value }))}
                          className="border-rose-gold/30 focus:border-rose-gold"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          value={profileForm.location}
                          onChange={(e) => setProfileForm(prev => ({ ...prev, location: e.target.value }))}
                          className="pl-10 border-rose-gold/30 focus:border-rose-gold"
                          placeholder="Enter your business location"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        value={profileForm.description}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, description: e.target.value }))}
                        className="min-h-[100px] border-rose-gold/30 focus:border-rose-gold"
                        placeholder="Describe your business and services..."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            value={profileForm.phone}
                            onChange={(e) => setProfileForm(prev => ({ ...prev, phone: e.target.value }))}
                            className="pl-10 border-rose-gold/30 focus:border-rose-gold"
                            placeholder="Enter phone number"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="email"
                            value={profileForm.email}
                            onChange={(e) => setProfileForm(prev => ({ ...prev, email: e.target.value }))}
                            className="pl-10 border-rose-gold/30 focus:border-rose-gold"
                            placeholder="Enter email address"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Website (Optional)</Label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          value={profileForm.website || ""}
                          onChange={(e) => setProfileForm(prev => ({ ...prev, website: e.target.value }))}
                          className="pl-10 border-rose-gold/30 focus:border-rose-gold"
                          placeholder="Enter website URL"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                      <Button 
                        variant="outline" 
                        onClick={() => setIsEditOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        variant="hero" 
                        onClick={handleProfileSave}
                      >
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">{vendorData.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-rose-gold" />
                <span className="text-foreground">{vendorData.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-rose-gold" />
                <span className="text-foreground">{vendorData.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-rose-gold" />
                <span className="text-foreground">{vendorData.email}</span>
              </div>
              {vendorData.website && (
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-rose-gold" />
                  <a 
                    href={`https://${vendorData.website}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-rose-gold hover:underline"
                  >
                    {vendorData.website}
                  </a>
                </div>
              )}
            </div>

            {/* Additional Stats for Verified Vendors */}
            {vendorData.verificationStatus === 'verified' && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-rose-gold/20">
                {vendorData.experienceYears && (
                  <div className="text-center">
                    <Award className="h-5 w-5 text-rose-gold mx-auto mb-1" />
                    <p className="text-sm text-muted-foreground">Experience</p>
                    <p className="font-semibold text-foreground">{vendorData.experienceYears}</p>
                  </div>
                )}
                {vendorData.totalBookings && (
                  <div className="text-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mx-auto mb-1" />
                    <p className="text-sm text-muted-foreground">Total Bookings</p>
                    <p className="font-semibold text-foreground">{vendorData.totalBookings}</p>
                  </div>
                )}
                <div className="text-center">
                  <Star className="h-5 w-5 text-yellow-500 mx-auto mb-1 fill-current" />
                  <p className="text-sm text-muted-foreground">Rating</p>
                  <p className="font-semibold text-foreground">{vendorData.rating}/5</p>
                </div>
                <div className="text-center">
                  <Clock className="h-5 w-5 text-blue-500 mx-auto mb-1" />
                  <p className="text-sm text-muted-foreground">Response</p>
                  <p className="font-semibold text-foreground">{vendorData.responseTime}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Service Highlights */}
      <Card className="border-rose-gold/20">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-rose-gold" />
              <span>Service Highlights</span>
            </CardTitle>
            {isOwner && (
              <Dialog open={isHighlightsEditOpen} onOpenChange={setIsHighlightsEditOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="border-rose-gold/30 hover:border-rose-gold">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Service Highlights</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-4">
                      {profileForm.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Input
                            value={highlight}
                            onChange={(e) => {
                              const newHighlights = [...profileForm.highlights];
                              newHighlights[index] = e.target.value;
                              setProfileForm(prev => ({ ...prev, highlights: newHighlights }));
                            }}
                            className="flex-1 border-rose-gold/30 focus:border-rose-gold"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleHighlightRemove(index)}
                            className="border-red-200 hover:border-red-500 hover:text-red-500"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>

                    {profileForm.highlights.length < 8 && (
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Input
                            value={newHighlight}
                            onChange={(e) => setNewHighlight(e.target.value)}
                            placeholder="Add new highlight..."
                            className="flex-1 border-rose-gold/30 focus:border-rose-gold"
                          />
                          <Button
                            variant="outline"
                            onClick={handleHighlightAdd}
                            className="border-rose-gold/30 hover:border-rose-gold"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsHighlightsEditOpen(false)}>
                        Cancel
                      </Button>
                      <Button variant="hero" onClick={handleHighlightsSave}>
                        Save Highlights
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {vendorData.highlights.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {vendorData.highlights.map((highlight, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 bg-rose-gold/5 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-rose-gold flex-shrink-0" />
                  <span className="text-sm font-medium text-foreground">{highlight}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No service highlights added yet</p>
              {isOwner && (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 border-rose-gold/30 hover:border-rose-gold"
                  onClick={() => setIsHighlightsEditOpen(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Highlights
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Verification Status Card */}
      {isOwner && (
        <Card className="border-rose-gold/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-rose-gold" />
              <span>Trust & Verification</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${
                    vendorData.cnicVerified 
                      ? 'bg-green-100' 
                      : 'bg-yellow-100'
                  }`}>
                    <FileText className={`h-4 w-4 ${
                      vendorData.cnicVerified 
                        ? 'text-green-600' 
                        : 'text-yellow-600'
                    }`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">CNIC Verification</h4>
                    <p className="text-sm text-muted-foreground">
                      {vendorData.cnicVerified 
                        ? "Identity verified successfully" 
                        : "Upload CNIC for verification"
                      }
                    </p>
                  </div>
                </div>
                
                {!vendorData.cnicVerified && (
                  <div>
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png,.pdf"
                      onChange={handleCnicUpload}
                      className="hidden"
                      id="cnic-verification-upload"
                    />
                    <label htmlFor="cnic-verification-upload">
                      <Button variant="outline" size="sm" className="cursor-pointer">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload CNIC
                      </Button>
                    </label>
                  </div>
                )}

                {vendorData.cnicVerified && (
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${
                    vendorData.verificationStatus === 'verified' 
                      ? 'bg-green-100' 
                      : 'bg-yellow-100'
                  }`}>
                    <Shield className={`h-4 w-4 ${
                      vendorData.verificationStatus === 'verified' 
                        ? 'text-green-600' 
                        : 'text-yellow-600'
                    }`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Business Verification</h4>
                    <p className="text-sm text-muted-foreground">
                      {vendorData.verificationStatus === 'verified' 
                        ? "Business verified by Aasaan Shaadi" 
                        : "Verification in progress"
                      }
                    </p>
                  </div>
                </div>
                
                {getVerificationBadge()}
              </div>

              {vendorData.verificationStatus === 'verified' && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-semibold text-green-800">Verified Vendor Benefits</span>
                  </div>
                  <ul className="mt-2 text-sm text-green-700 space-y-1">
                    <li>• Higher visibility in search results</li>
                    <li>• Verified vendor badge on your profile</li>
                    <li>• Priority customer support</li>
                    <li>• Access to premium features</li>
                  </ul>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Portfolio Gallery Preview */}
      <Card className="border-rose-gold/20">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center space-x-2">
              <Camera className="h-5 w-5 text-rose-gold" />
              <span>Portfolio Gallery</span>
            </CardTitle>
            {isOwner && (
              <Button variant="outline" size="sm" className="border-rose-gold/30 hover:border-rose-gold">
                <Upload className="h-4 w-4 mr-2" />
                Upload Images
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Placeholder for portfolio images */}
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                <Camera className="h-8 w-8 text-gray-400" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorProfile;
