import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  Heart,
  MessageCircle
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast.success("Message sent successfully! We'll get back to you ASAP.");
    setFormData({ name: "", contact: "", message: "" });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      info: "+92 311 3860984",
      description: "Mon-Sat, 9AM-8PM"
    },
    {
      icon: Mail,
      title: "Email Us",
      info: "hello@WedEase.pk",
      description: "We reply within 24 hours"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      info: "Clifton, Karachi, Pakistan",
      description: "By appointment only"
    },
    {
      icon: Clock,
      title: "Working Hours",
      info: "9:00 AM - 8:00 PM",
      description: "Monday to Saturday"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-pearl to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="flex items-center justify-center mb-6">
              <MessageCircle className="h-8 w-8 text-rose-gold mr-3" />
              <span className="text-rose-gold font-medium text-lg">Contact Us</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold text-foreground mb-8 leading-tight">
              Hey! Leave a message and we'll get
              <span className="block bg-gradient-to-r from-rose-gold to-rose-gold-light bg-clip-text text-transparent">
                back to you ASAP.
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We're here to help make your wedding planning journey smooth and memorable. 
              Reach out to us with any questions, ideas, or just to say hello!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="border-rose-gold/20 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-foreground flex items-center">
                  <Send className="h-6 w-6 text-rose-gold mr-3" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground font-medium">
                      Your Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="border-rose-gold/30 focus:border-rose-gold"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact" className="text-foreground font-medium">
                      Contact Number *
                    </Label>
                    <Input
                      id="contact"
                      name="contact"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.contact}
                      onChange={handleInputChange}
                      required
                      className="border-rose-gold/30 focus:border-rose-gold"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-foreground font-medium">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us about your wedding plans, questions, or how we can help you..."
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="border-rose-gold/30 focus:border-rose-gold resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    variant="hero" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Get in Touch
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Have questions about our services? Need help planning your special day? 
                  Or just want to chat about your wedding dreams? We're here for you!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contactInfo.map((item, index) => (
                  <Card key={index} className="border-rose-gold/20 hover:border-rose-gold/40 transition-all duration-300 hover:shadow-lg group">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-gradient-to-r from-rose-gold to-rose-gold-light rounded-full group-hover:scale-110 transition-transform duration-300">
                          <item.icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                          <p className="text-rose-gold font-medium mb-1">{item.info}</p>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* FAQ Quick Links */}
              <Card className="border-rose-gold/20 bg-gradient-to-br from-blush to-card">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-4 flex items-center">
                    <Heart className="h-5 w-5 text-rose-gold mr-2" />
                    Quick Questions?
                  </h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-rose-gold rounded-full"></span>
                      <span>How far in advance should I book?</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-rose-gold rounded-full"></span>
                      <span>What's included in your packages?</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-rose-gold rounded-full"></span>
                      <span>Do you offer payment plans?</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-rose-gold rounded-full"></span>
                      <span>Can I visit your office?</span>
                    </li>
                  </ul>
                  <p className="text-sm text-muted-foreground mt-4">
                    Send us a message above or call us directly for instant answers!
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="py-20 bg-gradient-to-b from-pearl to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Find Us in Karachi
            </h2>
            <p className="text-muted-foreground">
              Located in the heart of Clifton, we're easily accessible from anywhere in the city.
            </p>
          </div>
          
          <Card className="border-rose-gold/20 overflow-hidden">
            <div className="bg-gradient-to-br from-rose-gold/10 to-blush h-64 flex items-center justify-center">
              <div className="text-center space-y-4">
                <MapPin className="h-16 w-16 text-rose-gold mx-auto" />
                <div>
                  <h3 className="text-xl font-bold text-foreground">Aasaan Shaadi Office</h3>
                  <p className="text-muted-foreground">Clifton Block 2, Karachi</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Interactive map coming soon
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
