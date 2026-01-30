import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Heart, Menu, X, Search, Bookmark, Bell, User, MapPin, Calendar } from "lucide-react";
import NotificationSystem from "@/components/NotificationSystem";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [wishlistCount] = useState(3); // Mock wishlist count
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/vendors?search=${encodeURIComponent(searchTerm.trim())}`);
      setIsSearchOpen(false);
      setSearchTerm('');
    }
  };

  const quickSearchSuggestions = [
    { name: "Wedding Venues", category: "venues", icon: "🏛️" },
    { name: "Photographers", category: "photographers", icon: "📸" },
    { name: "Caterers", category: "catering", icon: "🍽️" },
    { name: "Makeup Artists", category: "makeup", icon: "💄" }
  ];

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Vendors", href: "/vendors" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-rose-gold/20 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-r from-rose-gold to-rose-gold-light p-2 rounded-full group-hover:shadow-lg transition-all duration-300">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-rose-gold to-rose-gold-dark bg-clip-text text-transparent">
              WedEase
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-foreground hover:text-rose-gold transition-colors duration-300 font-medium relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-gold transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search */}
            <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon" className="border-rose-gold/30 hover:border-rose-gold">
                  <Search className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle className="flex items-center space-x-2">
                    <Search className="h-5 w-5 text-rose-gold" />
                    <span>Search Wedding Services</span>
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSearch} className="space-y-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search vendors, services, locations..."
                      className="pl-10 h-12 text-lg border-rose-gold/30 focus:border-rose-gold"
                      autoFocus
                    />
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3 text-sm text-muted-foreground">Quick Search</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {quickSearchSuggestions.map((suggestion) => (
                        <Button
                          key={suggestion.category}
                          variant="outline"
                          onClick={() => {
                            navigate(`/vendors?category=${suggestion.category}`);
                            setIsSearchOpen(false);
                          }}
                          className="justify-start h-auto p-3 border-rose-gold/20 hover:border-rose-gold hover:bg-rose-gold/5"
                        >
                          <span className="mr-2 text-lg">{suggestion.icon}</span>
                          <span className="text-sm">{suggestion.name}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button type="submit" variant="hero" className="flex-1">
                      Search
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setIsSearchOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>

            {/* Wishlist */}
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => navigate("/wishlist")}
              className="border-rose-gold/30 hover:border-rose-gold relative"
            >
              <Bookmark className="h-4 w-4" />
              {wishlistCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs bg-rose-gold">
                  {wishlistCount}
                </Badge>
              )}
            </Button>

            {/* Notifications */}
            <NotificationSystem />

            <Button variant="elegant" onClick={handleLoginClick}>
              <User className="h-4 w-4 mr-2" />
              Login
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate("/vendor-login")}
              className="border-rose-gold/30 hover:border-rose-gold"
            >
              Vendor Portal
            </Button>
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setIsSearchOpen(true)}
              className="border-rose-gold/30 hover:border-rose-gold"
            >
              <Search className="h-4 w-4" />
            </Button>
            <button
              className="p-2 rounded-md text-foreground hover:text-rose-gold transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-rose-gold/20">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-foreground hover:text-rose-gold transition-colors duration-300 font-medium px-2 py-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/wishlist")}
                  className="w-full border-rose-gold/30 hover:border-rose-gold justify-start"
                >
                  <Bookmark className="h-4 w-4 mr-2" />
                  My Wishlist ({wishlistCount})
                </Button>
                <Button variant="elegant" onClick={handleLoginClick} className="w-full">
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/vendor-login")}
                  className="w-full border-rose-gold/30 hover:border-rose-gold"
                >
                  Vendor Portal
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;