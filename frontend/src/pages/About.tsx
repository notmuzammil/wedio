import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  Heart, 
  Users, 
  CheckCircle, 
  Star,
  Target,
  Award,
  Sparkles
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  const navigate = useNavigate();

  const stats = [
    { number: "1000+", label: "Happy Couples", icon: Heart },
    { number: "500+", label: "Verified Vendors", icon: Users },
    { number: "50+", label: "Cities Covered", icon: Target },
    { number: "99%", label: "Satisfaction Rate", icon: Star }
  ];

  const values = [
    {
      title: "Transparency",
      description: "We believe in clear, upfront pricing with no hidden costs. Every detail is discussed openly with our clients.",
      icon: "🔍"
    },
    {
      title: "Quality",
      description: "All our vendors are thoroughly vetted to ensure they meet our high standards for your special day.",
      icon: "⭐"
    },
    {
      title: "Innovation",
      description: "We leverage technology to make wedding planning digital, seamless, and accessible to everyone.",
      icon: "💡"
    },
    {
      title: "Care",
      description: "Your wedding is as important to us as it is to you. We treat every celebration with personal attention.",
      icon: "❤️"
    }
  ];

  const team = [
    {
      name: "Muzammil Ahmed",
      role: "Co-founder & CEO",
      description: "Visionary leader with 10+ years in event management",
      image: "👨‍💼"
    },
    {
      name: "Hamza Ahmed",
      role: "Co-founder & Head of Operations",
      description: "Logistics expert ensuring seamless wedding experiences",
      image: "👨‍💼"
    },
    {
      name: "Abdul Rehman",
      role: "Head of Finance",
      description: "Financial expert managing budgets and cost optimization",
      image: "👨‍💼"
    },
    {
      name: "Abdur Rafay",
      role: "Head of Tech Lead",
      description: "Tech innovator building digital wedding solutions",
      image: "👨‍💻"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-pearl to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="h-8 w-8 text-rose-gold mr-3" />
              <span className="text-rose-gold font-medium text-lg">About WedEase</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold text-foreground mb-8 leading-tight">
              Your Wedding
              <span className="block bg-gradient-to-r from-rose-gold to-rose-gold-light bg-clip-text text-transparent">
                Partner for Life
              </span>
            </h1>
            <div className="bg-gradient-to-r from-blush to-pearl p-8 rounded-2xl border border-rose-gold/20 shadow-lg">
              <p className="text-xl text-foreground leading-relaxed mb-6">
                <strong>WedEase is not just a service — it's a wedding partner.</strong> We aim to revolutionize 
                how weddings are planned in Pakistan by making the entire process digital, transparent, and affordable.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                With a growing network of trusted vendors, transparent pricing, and a dedicated team of planners, 
                we make sure your special day is exactly how you imagined it — <em>stress-free and spectacular</em>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-rose-gold/20 hover:border-rose-gold/40 transition-all duration-300 hover:shadow-lg group">
                <CardContent className="pt-8">
                  <div className="mx-auto mb-4 p-3 bg-gradient-to-r from-rose-gold to-rose-gold-light rounded-full w-fit group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-rose-gold mb-2">{stat.number}</div>
                  <div className="text-muted-foreground font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-to-b from-pearl to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="bg-rose-gold/10 text-rose-gold border-rose-gold/20 mb-6">
                Our Mission
              </Badge>
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Making Weddings Accessible to Everyone
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                We believe that every couple deserves their dream wedding, regardless of their budget or background. 
                Our mission is to democratize wedding planning by providing transparent, affordable, and high-quality services.
              </p>
              <ul className="space-y-4">
                {[
                  "Eliminate hidden costs and surprise fees",
                  "Connect couples with verified, reliable vendors",
                  "Simplify the planning process through technology",
                  "Provide personalized support at every step"
                ].map((point, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-rose-gold flex-shrink-0" />
                    <span className="text-muted-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <Card className="p-6 border-rose-gold/20 bg-gradient-to-br from-blush to-card">
                <Award className="h-12 w-12 text-rose-gold mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-3">Our Vision</h3>
                <p className="text-muted-foreground">
                  To become Pakistan's leading digital wedding platform, making every shaadi planning experience 
                  seamless, joyful, and memorable for couples across the nation.
                </p>
              </Card>
              <Card className="p-6 border-rose-gold/20 bg-gradient-to-br from-champagne to-card">
                <Target className="h-12 w-12 text-rose-gold mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-3">Our Goal</h3>
                <p className="text-muted-foreground">
                  To revolutionize the wedding industry in Pakistan by creating a transparent, efficient, 
                  and affordable ecosystem that benefits both couples and vendors.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Our Core Values
            </h2>
            <p className="text-xl text-muted-foreground">
              The principles that guide everything we do at Aasaan Shaadi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center border-rose-gold/20 hover:border-rose-gold/40 transition-all duration-300 hover:shadow-lg group">
                <CardContent className="pt-8">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-rose-gold transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-b from-pearl to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-muted-foreground">
              The passionate people behind Aasaan Shaadi, dedicated to making your wedding dreams come true
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center border-rose-gold/20 hover:border-rose-gold/40 transition-all duration-300 hover:shadow-lg group">
                <CardContent className="pt-8">
                  <div className="text-6xl mb-4">{member.image}</div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">{member.name}</h3>
                  <p className="text-rose-gold font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{member.description}</p>
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
            Ready to Begin Your Journey?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Join the Aasaan Shaadi family and let us help you create the wedding of your dreams. 
            Your perfect day is just a click away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-rose-gold"
              onClick={() => navigate("/login")}
            >
              Start Planning
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-rose-gold"
              onClick={() => navigate("/contact")}
            >
              Get in Touch
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
