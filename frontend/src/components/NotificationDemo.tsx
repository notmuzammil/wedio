import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Bell, Calendar, Star, Gift, Clock, AlertTriangle, CheckCircle, Info, CreditCard, MessageSquare } from "lucide-react";
import { 
  useNotifications, 
  createBookingNotification,
  createPaymentNotification,
  createReviewNotification,
  createPromotionNotification,
  createInquiryNotification
} from "@/contexts/NotificationContext";
import { usePushNotifications } from "@/components/NotificationSystem";

const NotificationDemo = () => {
  const { showToastNotification, addNotification } = useNotifications();
  const { permission, requestPermission } = usePushNotifications();

  const demoNotifications = [
    {
      title: "Booking Confirmation",
      description: "Simulate a wedding venue booking confirmation",
      icon: <Calendar className="h-4 w-4" />,
      color: "text-blue-600",
      action: () => showToastNotification(createBookingNotification("Royal Gardens Banquet", "March 15, 2024", true))
    },
    {
      title: "Payment Reminder", 
      description: "Send a payment due notification",
      icon: <CreditCard className="h-4 w-4" />,
      color: "text-red-600",
      action: () => showToastNotification(createPaymentNotification("Capture Moments Photography", 50000, "March 10, 2024"))
    },
    {
      title: "New Review",
      description: "Notify about a new 5-star review",
      icon: <Star className="h-4 w-4" />,
      color: "text-yellow-500",
      action: () => showToastNotification(createReviewNotification("Priya Sharma", 5))
    },
    {
      title: "Special Promotion",
      description: "Announce a limited-time wedding package offer", 
      icon: <Gift className="h-4 w-4" />,
      color: "text-purple-600",
      action: () => showToastNotification(createPromotionNotification("Weekend Wedding Special!", "Book your weekend wedding and save 30% on all photography packages. Limited time offer!"))
    },
    {
      title: "New Inquiry",
      description: "Client interested in wedding services",
      icon: <MessageSquare className="h-4 w-4" />,
      color: "text-green-600",
      action: () => showToastNotification(createInquiryNotification("Rajesh & Meera", "December 15, 2024"))
    }
  ];

  const systemNotifications = [
    {
      title: "Success Notification",
      description: "Show a general success message",
      variant: "success" as const,
      action: () => addNotification({
        type: 'system',
        title: 'Profile Updated Successfully!',
        message: 'Your vendor profile has been updated with the latest information.',
        read: false,
        priority: 'low',
        actionUrl: '/profile'
      })
    },
    {
      title: "Warning Notification", 
      description: "Display a warning alert",
      variant: "warning" as const,
      action: () => addNotification({
        type: 'reminder',
        title: 'Document Verification Pending',
        message: 'Please upload your business license to complete your vendor verification.',
        read: false,
        priority: 'medium',
        actionUrl: '/verification'
      })
    },
    {
      title: "Critical Alert",
      description: "Send an urgent system alert", 
      variant: "critical" as const,
      action: () => addNotification({
        type: 'system',
        title: 'Account Security Alert',
        message: 'Unusual login activity detected. Please review your account security settings.',
        read: false,
        priority: 'high',
        actionUrl: '/security'
      })
    }
  ];

  const getVariantIcon = (variant: string) => {
    switch (variant) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'critical':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <Info className="h-4 w-4 text-blue-600" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-rose-gold to-rose-gold-dark bg-clip-text text-transparent mb-2">
          Notification System Demo
        </h1>
        <p className="text-muted-foreground">
          Test the comprehensive notification system for WedEase platform
        </p>
      </div>

      {/* Browser Notification Permission */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-rose-gold" />
            <span>Browser Notifications</span>
          </CardTitle>
          <CardDescription>
            Enable browser notifications to receive real-time alerts even when the page is not active.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Badge variant={permission === 'granted' ? 'success' : permission === 'denied' ? 'destructive' : 'secondary'}>
                {permission === 'granted' ? 'Enabled' : permission === 'denied' ? 'Blocked' : 'Not Set'}
              </Badge>
              <span className="text-sm text-muted-foreground">
                Current permission status: {permission}
              </span>
            </div>
            {permission !== 'granted' && (
              <Button onClick={requestPermission} variant="outline" className="border-rose-gold/30 hover:border-rose-gold">
                Enable Notifications
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Wedding-Related Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Wedding Service Notifications</CardTitle>
          <CardDescription>
            Simulate real-world notifications that users would receive during their wedding planning journey.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {demoNotifications.map((demo, index) => (
              <div key={index} className="p-4 border border-rose-gold/20 rounded-lg hover:border-rose-gold/40 transition-colors">
                <div className="flex items-start space-x-3 mb-3">
                  <div className={`${demo.color} mt-1`}>
                    {demo.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{demo.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{demo.description}</p>
                  </div>
                </div>
                <Button 
                  onClick={demo.action}
                  size="sm"
                  variant="outline"
                  className="w-full border-rose-gold/30 hover:border-rose-gold"
                >
                  Trigger Notification
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* System Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>System Notifications</CardTitle>
          <CardDescription>
            Test different types of system alerts and status notifications.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {systemNotifications.map((notification, index) => (
              <div key={index} className="p-4 border border-rose-gold/20 rounded-lg hover:border-rose-gold/40 transition-colors">
                <div className="flex items-start space-x-3 mb-3">
                  <div className="mt-1">
                    {getVariantIcon(notification.variant)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{notification.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{notification.description}</p>
                  </div>
                </div>
                <Button 
                  onClick={notification.action}
                  size="sm"
                  variant="outline"
                  className="w-full border-rose-gold/30 hover:border-rose-gold"
                >
                  Send Alert
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className="bg-rose-gold/5 border-rose-gold/30">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Info className="h-5 w-5 text-rose-gold" />
            <span>How to Use</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-sm space-y-2">
            <p className="flex items-start space-x-2">
              <span className="text-rose-gold font-semibold">1.</span>
              <span>Click the notification bell icon in the header to view all notifications</span>
            </p>
            <p className="flex items-start space-x-2">
              <span className="text-rose-gold font-semibold">2.</span>
              <span>Use the buttons above to trigger different types of notifications</span>
            </p>
            <p className="flex items-start space-x-2">
              <span className="text-rose-gold font-semibold">3.</span>
              <span>Enable browser notifications for desktop alerts</span>
            </p>
            <p className="flex items-start space-x-2">
              <span className="text-rose-gold font-semibold">4.</span>
              <span>Notifications are automatically saved and persist across browser sessions</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationDemo;
