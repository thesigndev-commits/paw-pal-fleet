import { useState } from "react";
import { 
  Home, 
  Calendar, 
  MessageCircle, 
  Wallet, 
  User,
  Car,
  DollarSign,
  Settings,
  LayoutDashboard,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";
import { UserRole } from "@/store/appStore";

interface BottomNavProps {
  role: UserRole;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const customerTabs = [
  { id: "home", label: "Home", icon: Home },
  { id: "bookings", label: "Bookings", icon: Calendar },
  { id: "chat", label: "Chat", icon: MessageCircle },
  { id: "wallet", label: "Wallet", icon: Wallet },
  { id: "profile", label: "Profile", icon: User },
];

const driverTabs = [
  { id: "home", label: "Home", icon: Home },
  { id: "earnings", label: "Earnings", icon: DollarSign },
  { id: "chat", label: "Chat", icon: MessageCircle },
  { id: "profile", label: "Profile", icon: User },
];

const adminTabs = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "users", label: "Users", icon: Users },
  { id: "drivers", label: "Drivers", icon: Car },
  { id: "support", label: "Support", icon: MessageCircle },
  { id: "settings", label: "Settings", icon: Settings },
];

export function BottomNav({ role, activeTab, onTabChange }: BottomNavProps) {
  const tabs = role === "customer" ? customerTabs : role === "driver" ? driverTabs : adminTabs;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border safe-area-pb">
      <div className="flex justify-around items-center h-16 px-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <div className={cn(
                "p-1.5 rounded-xl transition-colors",
                isActive && "bg-primary/10"
              )}>
                <tab.icon className={cn("h-5 w-5", isActive && "stroke-[2.5px]")} />
              </div>
              <span className={cn(
                "text-[10px] mt-0.5 font-medium",
                isActive && "font-bold"
              )}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
