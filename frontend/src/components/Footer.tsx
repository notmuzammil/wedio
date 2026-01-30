import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Mail } from "lucide-react";

const Footer = () => {
  const company = [
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
    { name: "Vendors", href: "/vendors" },
    { name: "Blog", href: "/blog" },
  ];

  const services = [
    { name: "Photographers", href: "/vendors?category=photographers" },
    { name: "Bridal Makeup", href: "/vendors?category=makeup" },
    { name: "Wedding Venues", href: "/vendors?category=venues" },
    { name: "Henna Artists", href: "/vendors?category=henna" },
    { name: "Catering", href: "/vendors?category=catering" },
    { name: "Decor", href: "/vendors?category=decor" },
  ];

  const legal = [
    { name: "Terms and Conditions", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
  ];

  const downloadApp = [
    { name: "WedEase Planner App", href: "#" },
  ];

  return (
    <footer className="bg-gradient-to-b from-background to-pearl border-t border-rose-gold/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Section - Newsletter */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-rose-gold to-rose-gold-light p-2 rounded-full">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-rose-gold to-rose-gold-dark bg-clip-text text-transparent">
                WedEase
              </span>
            </Link>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Stay Updated</h3>
              <p className="text-muted-foreground">
                Get the latest wedding trends, vendor updates, and special offers delivered to your inbox.
              </p>
              <div className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 border-rose-gold/30 focus:border-rose-gold"
                />
                <Button variant="hero" size="icon">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Right Section - Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Company */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-rose-gold uppercase tracking-wide">
                Company
              </h4>
              <ul className="space-y-2">
                {company.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-muted-foreground hover:text-rose-gold transition-colors duration-300"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-rose-gold uppercase tracking-wide">
                Services
              </h4>
              <ul className="space-y-2">
                {services.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-muted-foreground hover:text-rose-gold transition-colors duration-300"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-rose-gold uppercase tracking-wide">
                Legal
              </h4>
              <ul className="space-y-2">
                {legal.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-muted-foreground hover:text-rose-gold transition-colors duration-300"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Download App */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-rose-gold uppercase tracking-wide">
                Download App
              </h4>
              <ul className="space-y-2">
                {downloadApp.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-muted-foreground hover:text-rose-gold transition-colors duration-300"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-rose-gold/20 text-center">
          <p className="text-muted-foreground">
            © 2024 Aasaan Shaadi. All rights reserved. Making weddings stress-free and memorable.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;