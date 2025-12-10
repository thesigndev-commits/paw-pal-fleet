import { useState } from "react";
import { Bell, BellOff, Check, Settings, Smartphone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { NotificationItem } from "@/components/ui/NotificationItem";
import { motion, AnimatePresence } from "framer-motion";

const mockNotifications = [
  {
    id: "1",
    title: "Driver Matched!",
    message: "Somchai is on his way to pick up your pet. He'll arrive in approximately 8 minutes.",
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    type: "driver-matched" as const,
    isRead: false,
  },
  {
    id: "2",
    title: "Trip Started",
    message: "Your pet Milo is now on the way to the destination. Track the trip in real-time.",
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    type: "trip-started" as const,
    isRead: false,
  },
  {
    id: "3",
    title: "ETA Updated",
    message: "Due to traffic, your pet will arrive 5 minutes later than expected. New ETA: 3:45 PM",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    type: "eta-update" as const,
    isRead: true,
  },
  {
    id: "4",
    title: "🎉 Weekend Special!",
    message: "Get 20% off on all Pet SUV rides this weekend. Use code: PETWEEKEND",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    type: "promo" as const,
    isRead: true,
  },
  {
    id: "5",
    title: "App Update Available",
    message: "A new version of Pet Transport is available with improved features and bug fixes.",
    timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    type: "system" as const,
    isRead: true,
  },
  {
    id: "6",
    title: "Trip Completed",
    message: "Your pet Luna has arrived safely! Don't forget to rate your driver.",
    timestamp: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
    type: "trip-started" as const,
    isRead: true,
  },
];

interface PushNotificationMockupProps {
  notification: typeof mockNotifications[0];
  onDismiss: () => void;
}

function PushNotificationMockup({ notification, onDismiss }: PushNotificationMockupProps) {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      className="fixed top-4 left-4 right-4 z-50"
    >
      <Card variant="elevated" className="p-4 backdrop-blur-xl bg-card/95 border border-border/50 shadow-2xl">
        <div className="flex items-start gap-3">
          <div className="shrink-0 h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
            <Smartphone className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground font-medium">PET TRANSPORT</p>
              <span className="text-xs text-muted-foreground">now</span>
            </div>
            <h4 className="text-sm font-semibold mt-0.5">{notification.title}</h4>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-0.5">
              {notification.message}
            </p>
          </div>
          <Button
            variant="ghost"
            size="iconSm"
            onClick={onDismiss}
            className="shrink-0 -mt-1 -mr-1"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}

export function NotificationScreen() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [showPushMockup, setShowPushMockup] = useState(false);
  const [pushNotification, setPushNotification] = useState(mockNotifications[0]);

  const filteredNotifications = filter === "all" 
    ? notifications 
    : notifications.filter(n => !n.isRead);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const triggerPushMockup = () => {
    const unreadNotif = notifications.find(n => !n.isRead) || notifications[0];
    setPushNotification(unreadNotif);
    setShowPushMockup(true);
    setTimeout(() => setShowPushMockup(false), 5000);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <AnimatePresence>
        {showPushMockup && (
          <PushNotificationMockup 
            notification={pushNotification} 
            onDismiss={() => setShowPushMockup(false)} 
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Bell className="h-6 w-6 text-primary" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </div>
              <h1 className="text-xl font-bold">Notifications</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="iconSm" onClick={triggerPushMockup}>
                <Smartphone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="iconSm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2 mt-4">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
            >
              All
            </Button>
            <Button
              variant={filter === "unread" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("unread")}
              className="relative"
            >
              Unread
              {unreadCount > 0 && (
                <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-primary-foreground/20 text-xs">
                  {unreadCount}
                </span>
              )}
            </Button>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="ml-auto text-primary"
              >
                <Check className="h-4 w-4 mr-1" />
                Mark all read
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Push Notification Demo Card */}
      <div className="px-4 py-3">
        <Card variant="glass" className="p-4 bg-primary/5 border-primary/20">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Smartphone className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold">Push Notification Preview</h4>
              <p className="text-xs text-muted-foreground">Tap to see how notifications appear</p>
            </div>
            <Button size="sm" onClick={triggerPushMockup}>
              Preview
            </Button>
          </div>
        </Card>
      </div>

      {/* Notification List */}
      <div className="divide-y divide-border">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              title={notification.title}
              message={notification.message}
              timestamp={notification.timestamp}
              type={notification.type}
              isRead={notification.isRead}
              onClick={() => markAsRead(notification.id)}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <BellOff className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold">No unread notifications</h3>
            <p className="text-sm text-muted-foreground text-center mt-1">
              You're all caught up! Check back later for updates.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
