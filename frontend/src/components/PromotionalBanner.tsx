import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Sparkles, Calendar, Gift, Clock, ArrowRight } from "lucide-react";

interface PromotionalBannerProps {
  variant?: 'seasonal' | 'discount' | 'event' | 'announcement';
  dismissible?: boolean;
  className?: string;
}

const PromotionalBanner = ({ variant = 'seasonal', dismissible = false, className = "" }: PromotionalBannerProps) => {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  const bannerContent = {
    seasonal: {
      title: "🌸 Spring Wedding Season is Here!",
      description: "Book your dream vendors now and get exclusive early bird discounts",
      offer: "Up to 25% OFF",
      cta: "Explore Vendors",
      bgGradient: "from-pink-500/10 via-rose-gold/10 to-orange-400/10",
      borderColor: "border-rose-gold/30",
      icon: <Sparkles className="h-5 w-5 text-rose-gold" />,
      countdown: "Limited time offer - Spring bookings end March 31st"
    },
    discount: {
      title: "💎 Premium Vendor Package",
      description: "Get the complete wedding experience with our premium vendor bundle",
      offer: "Save ₹50,000",
      cta: "View Package",
      bgGradient: "from-purple-500/10 via-rose-gold/10 to-pink-500/10",
      borderColor: "border-purple-400/30",
      icon: <Gift className="h-5 w-5 text-purple-600" />,
      countdown: "Only 15 packages left at this price"
    },
    event: {
      title: "🎉 Wedding Expo 2024",
      description: "Meet top vendors, get exclusive deals & win amazing prizes",
      offer: "Free Entry",
      cta: "Register Now",
      bgGradient: "from-blue-500/10 via-cyan-400/10 to-teal-500/10",
      borderColor: "border-blue-400/30",
      icon: <Calendar className="h-5 w-5 text-blue-600" />,
      countdown: "Event: February 15-17, 2024 | Expo Centre Karachi"
    },
    announcement: {
      title: "🚀 New Feature: AI Wedding Planner",
      description: "Get personalized vendor recommendations powered by AI",
      offer: "Beta Access",
      cta: "Try Now",
      bgGradient: "from-green-500/10 via-emerald-400/10 to-teal-500/10",
      borderColor: "border-green-400/30",
      icon: <Sparkles className="h-5 w-5 text-green-600" />,
      countdown: "Limited beta access - Join 500+ couples already planning"
    }
  };

  const content = bannerContent[variant];

  return (
    <div className={`relative overflow-hidden rounded-2xl border ${content.borderColor} bg-gradient-to-r ${content.bgGradient} backdrop-blur-sm ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent"></div>
      
      <div className="relative p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-3">
              {content.icon}
              <div>
                <h3 className="text-lg font-bold text-foreground">{content.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{content.description}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center space-x-4">
                <Badge className="bg-rose-gold text-white px-3 py-1">
                  {content.offer}
                </Badge>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  {content.countdown}
                </div>
              </div>

              <Button 
                variant="hero" 
                size="sm" 
                className="group shadow-lg"
              >
                {content.cta}
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          {dismissible && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDismissed(true)}
              className="h-6 w-6 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
          <div className="absolute top-4 right-4 w-3 h-3 bg-rose-gold rounded-full animate-pulse"></div>
          <div className="absolute top-8 right-8 w-2 h-2 bg-rose-gold-light rounded-full animate-pulse delay-300"></div>
          <div className="absolute top-12 right-12 w-1 h-1 bg-rose-gold rounded-full animate-pulse delay-700"></div>
        </div>
      </div>
    </div>
  );
};

// Seasonal Banner Carousel Component
export const SeasonalBanners = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const banners: Array<'seasonal' | 'discount' | 'event' | 'announcement'> = ['seasonal', 'discount', 'event', 'announcement'];

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div className="relative">
      <PromotionalBanner 
        variant={banners[currentBanner]} 
        dismissible={false}
        className="mb-4"
      />
      
      {/* Navigation dots */}
      <div className="flex justify-center space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentBanner(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentBanner ? 'bg-rose-gold' : 'bg-rose-gold/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default PromotionalBanner;
