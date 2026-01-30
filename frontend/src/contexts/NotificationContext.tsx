import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from 'sonner';

export interface NotificationData {
  id: string;
  type: 'booking' | 'review' | 'promotion' | 'reminder' | 'system' | 'payment' | 'inquiry';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  priority: 'low' | 'medium' | 'high';
  metadata?: Record<string, any>;
}

interface NotificationState {
  notifications: NotificationData[];
  unreadCount: number;
}

type NotificationAction =
  | { type: 'ADD_NOTIFICATION'; payload: Omit<NotificationData, 'id' | 'timestamp'> }
  | { type: 'MARK_AS_READ'; payload: string }
  | { type: 'MARK_ALL_AS_READ' }
  | { type: 'REMOVE_NOTIFICATION'; payload: string }
  | { type: 'CLEAR_ALL_NOTIFICATIONS' }
  | { type: 'SET_NOTIFICATIONS'; payload: NotificationData[] };

const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
};

const notificationReducer = (state: NotificationState, action: NotificationAction): NotificationState => {
  switch (action.type) {
    case 'ADD_NOTIFICATION': {
      const newNotification: NotificationData = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: new Date(),
      };

      const updatedNotifications = [newNotification, ...state.notifications];
      return {
        notifications: updatedNotifications,
        unreadCount: updatedNotifications.filter(n => !n.read).length,
      };
    }

    case 'MARK_AS_READ': {
      const updatedNotifications = state.notifications.map(notification =>
        notification.id === action.payload
          ? { ...notification, read: true }
          : notification
      );

      return {
        notifications: updatedNotifications,
        unreadCount: updatedNotifications.filter(n => !n.read).length,
      };
    }

    case 'MARK_ALL_AS_READ': {
      const updatedNotifications = state.notifications.map(notification => ({
        ...notification,
        read: true,
      }));

      return {
        notifications: updatedNotifications,
        unreadCount: 0,
      };
    }

    case 'REMOVE_NOTIFICATION': {
      const updatedNotifications = state.notifications.filter(
        notification => notification.id !== action.payload
      );

      return {
        notifications: updatedNotifications,
        unreadCount: updatedNotifications.filter(n => !n.read).length,
      };
    }

    case 'CLEAR_ALL_NOTIFICATIONS': {
      return {
        notifications: [],
        unreadCount: 0,
      };
    }

    case 'SET_NOTIFICATIONS': {
      return {
        notifications: action.payload,
        unreadCount: action.payload.filter(n => !n.read).length,
      };
    }

    default:
      return state;
  }
};

interface NotificationContextType {
  state: NotificationState;
  addNotification: (notification: Omit<NotificationData, 'id' | 'timestamp'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
  showToastNotification: (notification: Omit<NotificationData, 'id' | 'timestamp'>) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: React.ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  // Load notifications from localStorage on mount
  useEffect(() => {
    const savedNotifications = localStorage.getItem('aasaan-shaadi-notifications');
    if (savedNotifications) {
      try {
        const parsed = JSON.parse(savedNotifications);
        const notifications = parsed.map((n: any) => ({
          ...n,
          timestamp: new Date(n.timestamp),
        }));
        dispatch({ type: 'SET_NOTIFICATIONS', payload: notifications });
      } catch (error) {
        console.error('Failed to parse saved notifications:', error);
      }
    } else {
      // Initialize with some demo notifications
      const demoNotifications: NotificationData[] = [
        {
          id: "demo-1",
          type: "booking",
          title: "Booking Confirmed!",
          message: "Your booking with Royal Gardens Banquet has been confirmed for March 15, 2024.",
          timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
          read: false,
          priority: "high",
          actionUrl: "/bookings/1"
        },
        {
          id: "demo-2",
          type: "review",
          title: "New Review Received",
          message: "You have received a 5-star review from Sarah Ahmed. Check it out!",
          timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
          read: false,
          priority: "medium",
          actionUrl: "/reviews"
        },
        {
          id: "demo-3",
          type: "promotion",
          title: "Spring Sale - 25% Off!",
          message: "Limited time spring wedding packages available. Book now to save!",
          timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
          read: true,
          priority: "medium",
          actionUrl: "/vendors"
        }
      ];
      dispatch({ type: 'SET_NOTIFICATIONS', payload: demoNotifications });
    }
  }, []);

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('aasaan-shaadi-notifications', JSON.stringify(state.notifications));
  }, [state.notifications]);

  const addNotification = (notification: Omit<NotificationData, 'id' | 'timestamp'>) => {
    dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
  };

  const markAsRead = (id: string) => {
    dispatch({ type: 'MARK_AS_READ', payload: id });
  };

  const markAllAsRead = () => {
    dispatch({ type: 'MARK_ALL_AS_READ' });
  };

  const removeNotification = (id: string) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
  };

  const clearAllNotifications = () => {
    dispatch({ type: 'CLEAR_ALL_NOTIFICATIONS' });
  };

  const showToastNotification = (notification: Omit<NotificationData, 'id' | 'timestamp'>) => {
    // Add to notification center
    addNotification(notification);
    
    // Show toast based on priority
    const toastOptions = {
      description: notification.message,
      duration: notification.priority === 'high' ? 6000 : 4000,
    };

    switch (notification.priority) {
      case 'high':
        toast.error(notification.title, toastOptions);
        break;
      case 'medium':
        toast.success(notification.title, toastOptions);
        break;
      case 'low':
        toast.info(notification.title, toastOptions);
        break;
      default:
        toast(notification.title, toastOptions);
    }

    // Show browser notification if permission granted
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        tag: notification.id,
        requireInteraction: notification.priority === 'high',
      });
    }
  };

  const value: NotificationContextType = {
    state,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAllNotifications,
    showToastNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

// Utility functions for common notification types
export const createBookingNotification = (
  vendorName: string,
  date: string,
  isConfirmed: boolean = true
): Omit<NotificationData, 'id' | 'timestamp'> => ({
  type: 'booking',
  title: isConfirmed ? 'Booking Confirmed!' : 'Booking Request Received',
  message: `Your booking with ${vendorName} has been ${isConfirmed ? 'confirmed' : 'received'} for ${date}.`,
  read: false,
  priority: 'high',
  actionUrl: '/bookings',
});

export const createPaymentNotification = (
  vendorName: string,
  amount: number,
  dueDate: string
): Omit<NotificationData, 'id' | 'timestamp'> => ({
  type: 'payment',
  title: 'Payment Reminder',
  message: `Payment of ₹${amount.toLocaleString()} for ${vendorName} is due on ${dueDate}.`,
  read: false,
  priority: 'high',
  actionUrl: '/payments',
});

export const createReviewNotification = (
  reviewerName: string,
  rating: number
): Omit<NotificationData, 'id' | 'timestamp'> => ({
  type: 'review',
  title: 'New Review Received',
  message: `You have received a ${rating}-star review from ${reviewerName}. Check it out!`,
  read: false,
  priority: 'medium',
  actionUrl: '/reviews',
});

export const createPromotionNotification = (
  title: string,
  description: string
): Omit<NotificationData, 'id' | 'timestamp'> => ({
  type: 'promotion',
  title,
  message: description,
  read: false,
  priority: 'medium',
  actionUrl: '/vendors',
});

export const createInquiryNotification = (
  clientName: string,
  eventDate: string
): Omit<NotificationData, 'id' | 'timestamp'> => ({
  type: 'inquiry',
  title: 'New Inquiry Received',
  message: `${clientName} is interested in your services for their wedding on ${eventDate}.`,
  read: false,
  priority: 'medium',
  actionUrl: '/inquiries',
});

export default NotificationProvider;
