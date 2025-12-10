import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Car,
  Calendar,
  DollarSign,
  MessageCircle,
  Bell,
  Settings,
  TrendingUp,
  ChevronRight,
  Check,
  X,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AppAvatar } from "@/components/ui/AppAvatar";
import { mockDrivers, mockBookings, mockConversations } from "@/lib/mockData";

interface AdminDashboardProps {
  onNavigate: (screen: string) => void;
}

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const stats = [
    { label: "Active Drivers", value: "24", icon: Car, color: "text-primary", change: "+3" },
    { label: "Today's Bookings", value: "156", icon: Calendar, color: "text-success", change: "+12%" },
    { label: "Revenue", value: "฿45.2K", icon: DollarSign, color: "text-warning", change: "+8%" },
    { label: "Pending Approvals", value: "7", icon: Users, color: "text-destructive", change: "" },
  ];

  const menuItems = [
    { id: "users", label: "Manage Users", icon: Users },
    { id: "drivers", label: "Manage Drivers", icon: Car },
    { id: "bookings", label: "Bookings", icon: Calendar },
    { id: "support", label: "Support Chats", icon: MessageCircle, badge: 5 },
    { id: "notifications", label: "Send Notification", icon: Bell },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="gradient-primary px-6 pt-12 pb-8 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-primary-foreground/80 text-sm">Admin Panel</p>
            <h1 className="text-xl font-bold text-primary-foreground">Dashboard</h1>
          </div>
          <AppAvatar fallback="A" size="md" />
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card variant="glass" className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  {stat.change && (
                    <span className="text-xs text-success font-medium">{stat.change}</span>
                  )}
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Menu */}
        <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
        <div className="space-y-3">
          {menuItems.map((item) => (
            <Card
              key={item.id}
              variant="default"
              className="p-4 cursor-pointer hover:border-primary transition-colors"
              onClick={() => onNavigate(item.id)}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="flex-1 font-medium">{item.label}</span>
                {item.badge && (
                  <span className="px-2 py-1 rounded-full bg-destructive text-destructive-foreground text-xs font-bold">
                    {item.badge}
                  </span>
                )}
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </Card>
          ))}
        </div>

        {/* Recent activity */}
        <h2 className="text-lg font-bold mt-8 mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {mockBookings.slice(0, 3).map((booking) => (
            <Card key={booking.id} variant="flat" className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  🐾
                </div>
                <div className="flex-1">
                  <p className="font-medium">{booking.petName}</p>
                  <p className="text-xs text-muted-foreground">
                    {booking.pickupAddress.split(",")[0]} → {booking.dropoffAddress.split(",")[0]}
                  </p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  booking.status === "completed" 
                    ? "bg-success/10 text-success"
                    : "bg-warning/10 text-warning"
                }`}>
                  {booking.status}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

interface AdminDriversProps {
  onBack: () => void;
}

export function AdminDrivers({ onBack }: AdminDriversProps) {
  const [filter, setFilter] = useState<"all" | "pending" | "approved">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const pendingDrivers = [
    { id: "p1", name: "New Driver 1", phone: "+66 81 111 1111", status: "pending", avatar: "", rating: 0, totalTrips: 0 },
    { id: "p2", name: "New Driver 2", phone: "+66 82 222 2222", status: "pending", avatar: "", rating: 0, totalTrips: 0 },
  ];

  const allDrivers = [...pendingDrivers, ...mockDrivers.map(d => ({ ...d, status: "approved" }))];
  const filteredDrivers = allDrivers.filter(d => 
    filter === "all" || d.status === filter
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="iconSm" onClick={onBack}>
            <X className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Manage Drivers</h1>
        </div>

        <Input
          placeholder="Search drivers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          prefix={<Search className="h-5 w-5" />}
        />

        {/* Filter tabs */}
        <div className="flex gap-2 mt-4">
          {(["all", "pending", "approved"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${
                filter === f
                  ? "gradient-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {f}
              {f === "pending" && " (2)"}
            </button>
          ))}
        </div>
      </div>

      {/* Driver list */}
      <div className="p-4 space-y-3">
        {filteredDrivers.map((driver) => (
          <Card key={driver.id} variant="default" className="p-4">
            <div className="flex items-center gap-4">
              <AppAvatar 
                src={driver.avatar || undefined} 
                fallback={driver.name.charAt(0)} 
                size="lg" 
              />
              <div className="flex-1">
                <p className="font-bold">{driver.name}</p>
                <p className="text-sm text-muted-foreground">{driver.phone}</p>
                {driver.rating > 0 && (
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-warning">★</span>
                    <span className="text-sm">{driver.rating}</span>
                    <span className="text-xs text-muted-foreground">
                      ({driver.totalTrips} trips)
                    </span>
                  </div>
                )}
              </div>
              {driver.status === "pending" ? (
                <div className="flex gap-2">
                  <Button variant="outline" size="iconSm">
                    <X className="h-4 w-4 text-destructive" />
                  </Button>
                  <Button size="iconSm">
                    <Check className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <span className="text-xs px-2 py-1 rounded-full bg-success/10 text-success">
                  Approved
                </span>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

interface AdminSupportProps {
  onBack: () => void;
  onOpenChat: (chatId: string) => void;
}

export function AdminSupport({ onBack, onOpenChat }: AdminSupportProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="iconSm" onClick={onBack}>
            <X className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Support Chats</h1>
        </div>
      </div>

      {/* Chat list */}
      <div className="divide-y divide-border">
        {mockConversations.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onOpenChat(chat.id)}
            className="w-full p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors"
          >
            <div className="relative">
              <AppAvatar 
                src={chat.participantAvatars[1]} 
                fallback={chat.participantNames[1].charAt(0)} 
                size="lg" 
              />
              {chat.unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center font-bold">
                  {chat.unreadCount}
                </span>
              )}
            </div>
            <div className="flex-1 text-left">
              <div className="flex items-center justify-between">
                <p className="font-bold">{chat.participantNames[1]}</p>
                <span className="text-xs text-muted-foreground">
                  {new Date(chat.lastMessageTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
              <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
              <span className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block ${
                chat.type === "customer-support" 
                  ? "bg-primary/10 text-primary"
                  : "bg-accent/10 text-accent"
              }`}>
                {chat.type === "customer-support" ? "Customer" : "Driver"}
              </span>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </button>
        ))}
      </div>
    </div>
  );
}
