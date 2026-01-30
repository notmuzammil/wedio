import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";
import { 
  Heart, 
  Mail, 
  Lock, 
  Building2,
  Eye,
  EyeOff,
  ArrowLeft
} from "lucide-react";
import { signin } from "@/services/auth";

const VendorLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await signin({
        email: loginData.email,
        password: loginData.password
      });

      // Store tokens from the response
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);

      // Decode the JWT token to get user info
      const decodedToken = JSON.parse(atob(response.accessToken.split('.')[1]));
      
      // Check if the user is a vendor
      if (decodedToken.role !== 'VENDOR') {
        toast.error("This account is not registered as a vendor");
        return;
      }

      // Store user info from decoded token
      localStorage.setItem('user', JSON.stringify({
        id: decodedToken.id,
        email: decodedToken.email,
        role: decodedToken.role
      }));

      toast.success("Welcome back! Redirecting to your dashboard...");
      
      // Redirect to vendor dashboard
      setTimeout(() => {
        navigate("/vendor-dashboard");
      }, 1000);
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pearl via-background to-blush flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative w-full max-w-md">
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
            <span className="text-lg font-semibold text-foreground">Vendor Portal</span>
          </div>
          <p className="text-muted-foreground mt-3">
            Access your vendor dashboard to manage your services and bookings.
          </p>
        </div>

        {/* Login Card */}
        <Card className="border-rose-gold/20 shadow-2xl backdrop-blur-sm bg-white/95">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-foreground">
              Vendor Login
            </CardTitle>
            <CardDescription>
              Sign in to access your vendor dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">Business Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your business email"
                    value={loginData.email}
                    onChange={handleInputChange}
                    className="pl-10 border-rose-gold/30 focus:border-rose-gold"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={loginData.password}
                    onChange={handleInputChange}
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

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-rose-gold/30" />
                  <span className="text-muted-foreground">Remember me</span>
                </label>
                <button type="button" className="text-rose-gold hover:underline">
                  Forgot password?
                </button>
              </div>

              <Button 
                type="submit" 
                variant="hero" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signing In...
                  </>
                ) : (
                  "Access Dashboard"
                )}
              </Button>
            </form>

            <div className="mt-6">
              <div className="text-center text-sm text-muted-foreground">
                New vendor?{" "}
                <Link to="/vendor-signup" className="text-rose-gold hover:underline font-medium">
                  Register your business
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-muted-foreground">
          <p>
            Need help?{" "}
            <Link to="/contact" className="text-rose-gold hover:underline">
              Contact our support team
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VendorLogin;
