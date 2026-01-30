import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  Calendar, 
  Users, 
  Palette, 
  Camera, 
  Utensils, 
  MapPin,
  Heart,
  Star,
  CheckCircle
} from "lucide-react";
import heroImage from "@/assets/hero-wedding.jpg";
import venue1 from "@/assets/venue1.jpg";
import venue2 from "@/assets/venue2.jpg";
import catering1 from "@/assets/catering1.jpg";
import catering2 from "@/assets/catering2.jpg";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Home = () => {
  const navigate = useNavigate();

  const services = [
    {
      id: 1,
      title: "Booking Service",
      description: "Easily book your favorite wedding essentials – from venues and caterers to photographers and stylists – all in just a few clicks.",
      icon: Calendar,
      features: ["Browse verified vendors", "Compare prices", "Lock your dates hassle-free"]
    },
    {
      id: 2,
      title: "Customization Packages",
      description: "Choose from our flexible, customizable packages – whether it's a traditional Mehndi or a modern Nikah ceremony.",
      icon: Palette,
      features: ["Traditional Mehndi packages", "Modern Nikah ceremonies", "Tailored to your style & budget"]
    },
    {
      id: 3,
      title: "End-to-End Service",
      description: "Sit back and relax while we handle it all. From planning to execution, we offer complete wedding management service.",
      icon: Users,
      features: ["Venue bookings", "Vendor coordination", "Décor & logistics", "Guest management"]
    }
  ];

  const miniEvents = [
    {
      id: 1,
      title: "Birthday Parties",
      description: "Celebrate your special day with style! From intimate gatherings to grand celebrations, we make every birthday memorable.",
      icon: "🎂",
      features: ["Theme decoration", "Catering services", "Entertainment options", "Photography packages"],
      price: "Starting from Rs. 15,000"
    },
    {
      id: 2,
      title: "Bridal Showers",
      description: "Make the bride-to-be feel special with our curated bridal shower packages. Intimate, elegant, and unforgettable.",
      icon: "💍",
      features: ["Intimate venue setup", "Gourmet catering", "Decoration & styling", "Photography included"],
      price: "Starting from Rs. 25,000"
    },
    {
      id: 3,
      title: "Mini Get-Togethers",
      description: "Perfect for family reunions, friend meetups, or any small celebration. Cozy, comfortable, and hassle-free.",
      icon: "🎉",
      features: ["Cozy venue options", "Flexible catering", "Basic decoration", "Easy booking"],
      price: "Starting from Rs. 10,000"
    }
  ];

  const featuredVenues = [
    {
      id: 1,
      name: "Royal Gardens Banquet",
      location: "Clifton, Karachi",
      image: venue1,
      rating: 4.8,
      price: "Rs. 2,50,000",
      capacity: "500-800 guests"
    },
    {
      id: 2,
      name: "Continental Banquet",
      location: "Gulistan-e-Johar, Karachi",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWGlxpdUEJNpIQZcadVp_6ZA38cYCxHgKtqg&s",
      rating: 4.9,
      price: "Rs. 3,50,000",
      capacity: "300-500 guests"
    }
  ];

  const featuredCaterers = [
    {
      id: 1,
      name: "Traditional Delights",
      location: "Gulshan-e-Iqbal, Karachi",
      image: catering1,
      rating: 4.7,
      price: "Rs. 2,500/person",
      specialty: "Pakistani Cuisine"
    },
    {
      id: 2,
      name: "Royal Feast Catering",
      location: "PECHS, Karachi",
      image: catering2,
      rating: 4.8,
      price: "Rs. 3,200/person",
      specialty: "International & Local"
    }
  ];

  const handleBookNow = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Beautiful wedding ceremony" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-lg px-6 py-2">
              Making Shaadi Planning Aasaan
            </Badge>
            
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Your Dream Wedding
              <span className="block bg-gradient-to-r from-rose-gold to-rose-gold-light bg-clip-text text-transparent">
                Made Simple
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              At Aasaan Shaadi, we bring every wedding need under one roof — making your special day stress-free, stylish, and truly memorable.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button 
                variant="hero" 
                size="lg" 
                className="text-lg px-8 py-4"
                onClick={handleBookNow}
              >
                Start Planning Now
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-foreground"
                onClick={() => navigate("/services")}
              >
                Explore Services
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-b from-background to-pearl">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              What We Offer
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need for your perfect wedding, all in one place
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.id} className="bg-card/50 backdrop-blur-sm border-rose-gold/20 hover:border-rose-gold/40 transition-all duration-300 hover:shadow-xl group">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-rose-gold to-rose-gold-light rounded-full group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-foreground group-hover:text-rose-gold transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-rose-gold flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    variant="elegant" 
                    className="w-full mt-6"
                    onClick={handleBookNow}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mini Events Section */}
      <section className="py-20 bg-pearl">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Mini Events & Celebrations
            </h2>
            <p className="text-xl text-muted-foreground">
              Not just weddings! We make every celebration special with our mini event packages
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {miniEvents.map((event) => (
              <Card key={event.id} className="bg-card/50 backdrop-blur-sm border-rose-gold/20 hover:border-rose-gold/40 transition-all duration-300 hover:shadow-xl group">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-rose-gold to-rose-gold-light rounded-full group-hover:scale-110 transition-transform duration-300 w-16 h-16 flex items-center justify-center">
                    <span className="text-2xl">{event.icon}</span>
                  </div>
                  <CardTitle className="text-2xl font-bold text-foreground group-hover:text-rose-gold transition-colors">
                    {event.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground text-base">
                    {event.description}
                  </CardDescription>
                  <div className="mt-4">
                    <Badge variant="secondary" className="bg-rose-gold text-white text-sm">
                      {event.price}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {event.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-rose-gold flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    variant="elegant" 
                    className="w-full"
                    onClick={handleBookNow}
                  >
                    Book Mini Event
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Venues Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Featured Venues in Karachi
              </h2>
              <p className="text-xl text-muted-foreground">
                Discover the most beautiful wedding venues in the city
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate("/vendors?category=venues")}
            >
              View All Venues
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredVenues.map((venue) => (
              <Card key={venue.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-rose-gold/20">
                <div className="relative">
                  <img 
                    src={venue.image} 
                    alt={venue.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{venue.rating}</span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">{venue.name}</h3>
                  <div className="flex items-center space-x-2 text-muted-foreground mb-4">
                    <MapPin className="h-4 w-4" />
                    <span>{venue.location}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Starting from</p>
                      <p className="text-lg font-bold text-rose-gold">{venue.price}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Capacity</p>
                      <p className="text-sm font-medium">{venue.capacity}</p>
                    </div>
                  </div>
                  <Button 
                    variant="hero" 
                    className="w-full"
                    onClick={handleBookNow}
                  >
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Caterers Section */}
      <section className="py-20 bg-pearl">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Featured Caterers in Karachi
              </h2>
              <p className="text-xl text-muted-foreground">
                Delicious cuisine for your special celebration
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate("/vendors?category=catering")}
            >
              View All Caterers
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredCaterers.map((caterer) => (
              <Card key={caterer.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-rose-gold/20">
                <div className="relative">
                  <img 
                    src={caterer.image} 
                    alt={caterer.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{caterer.rating}</span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <Badge variant="secondary" className="bg-rose-gold text-white">
                      {caterer.specialty}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">{caterer.name}</h3>
                  <div className="flex items-center space-x-2 text-muted-foreground mb-4">
                    <MapPin className="h-4 w-4" />
                    <span>{caterer.location}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Starting from</p>
                      <p className="text-lg font-bold text-rose-gold">{caterer.price}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Utensils className="h-4 w-4 text-rose-gold" />
                    </div>
                  </div>
                  <Button 
                    variant="hero" 
                    className="w-full"
                    onClick={handleBookNow}
                  >
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-rose-gold to-rose-gold-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="h-16 w-16 text-white mx-auto mb-6" />
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to Plan Your Dream Wedding?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Join thousands of couples who made their wedding planning aasaan with us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-rose-gold"
              onClick={handleBookNow}
            >
              Start Your Journey
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-rose-gold"
              onClick={() => navigate("/vendor-signup")}
            >
              Become a Vendor
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;