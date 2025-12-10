import { useState, useEffect } from "react";
import { useAppStore, UserRole } from "@/store/appStore";

// Auth screens
import { OnboardingScreen } from "@/components/auth/OnboardingScreen";
import { LoginScreen } from "@/components/auth/LoginScreen";
import { RegisterScreen } from "@/components/auth/RegisterScreen";

// Customer screens
import { CustomerHome } from "@/components/customer/CustomerHome";
import { BookingFlow } from "@/components/customer/BookingFlow";
import { DriverSearch, LiveTrip } from "@/components/customer/TripScreens";

// Driver screens
import { DriverHome, DriverTrip, DriverEarnings } from "@/components/driver/DriverScreens";

// Admin screens
import { AdminDashboard, AdminDrivers, AdminSupport } from "@/components/admin/AdminScreens";

// Shared screens
import { BottomNav } from "@/components/shared/BottomNav";
import { ChatRoom } from "@/components/shared/ChatRoom";
import { WalletScreen } from "@/components/shared/WalletScreen";

// Types
type AuthScreen = "onboarding" | "login" | "register";

const Index = () => {
  const { isAuthenticated, user, setTheme, theme } = useAppStore();
  
  // Auth state
  const [authScreen, setAuthScreen] = useState<AuthScreen>("onboarding");
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  
  // App state
  const [activeTab, setActiveTab] = useState("home");
  const [currentScreen, setCurrentScreen] = useState<string>("home");
  
  // Booking/Trip state
  const [currentBooking, setCurrentBooking] = useState<any>(null);
  const [currentDriver, setCurrentDriver] = useState<any>(null);
  const [currentJob, setCurrentJob] = useState<any>(null);

  // Apply theme on mount
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Role switcher for demo
  const switchRole = (role: UserRole) => {
    useAppStore.getState().switchRole(role);
    setActiveTab(role === 'admin' ? 'dashboard' : 'home');
    setCurrentScreen(role === 'admin' ? 'dashboard' : 'home');
  };

  // Auth flow handlers
  const handleOnboardingComplete = () => {
    setHasSeenOnboarding(true);
    setAuthScreen("login");
  };

  // Customer flow handlers
  const handleStartBooking = () => setCurrentScreen("booking-flow");
  const handleConfirmBooking = (booking: any) => {
    setCurrentBooking(booking);
    setCurrentScreen("driver-search");
  };
  const handleDriverFound = (driver: any) => {
    setCurrentDriver(driver);
    setCurrentScreen("live-trip");
  };
  const handleTripComplete = () => {
    setCurrentBooking(null);
    setCurrentDriver(null);
    setCurrentScreen("home");
    setActiveTab("home");
  };

  // Driver flow handlers
  const handleJobAccepted = (job: any) => {
    setCurrentJob(job);
    setCurrentScreen("trip");
  };
  const handleJobComplete = () => {
    setCurrentJob(null);
    setCurrentScreen("home");
  };

  // Navigation
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentScreen(tab);
  };

  const handleBack = () => {
    setCurrentScreen(activeTab);
  };

  // Render auth screens
  if (!isAuthenticated) {
    if (authScreen === "onboarding" && !hasSeenOnboarding) {
      return <OnboardingScreen onComplete={handleOnboardingComplete} />;
    }
    if (authScreen === "login") {
      return (
        <LoginScreen
          onRegister={() => setAuthScreen("register")}
          onForgotPassword={() => {}}
          onBack={() => setAuthScreen("onboarding")}
        />
      );
    }
    if (authScreen === "register") {
      return (
        <RegisterScreen
          onLogin={() => setAuthScreen("login")}
          onBack={() => setAuthScreen("login")}
        />
      );
    }
  }

  const role = user?.role || "customer";

  // Role switcher component
  const RoleSwitcher = () => (
    <div className="fixed top-4 right-4 z-50 flex gap-1 bg-card/90 backdrop-blur rounded-full p-1 shadow-lg border border-border">
      <button 
        onClick={() => switchRole("customer")}
        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${role === "customer" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
      >
        Customer
      </button>
      <button 
        onClick={() => switchRole("driver")}
        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${role === "driver" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
      >
        Driver
      </button>
      <button 
        onClick={() => switchRole("admin")}
        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${role === "admin" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
      >
        Admin
      </button>
    </div>
  );

  // Render customer screens
  if (role === "customer") {
    return (
      <>
        <RoleSwitcher />

        {currentScreen === "home" && (
          <CustomerHome
            onBooking={handleStartBooking}
            onNotifications={() => {}}
            onSelectPet={() => {}}
            onPromoDetails={() => {}}
            onBookingHistory={() => {}}
          />
        )}
        {currentScreen === "booking-flow" && (
          <BookingFlow
            onBack={handleBack}
            onConfirmBooking={handleConfirmBooking}
          />
        )}
        {currentScreen === "driver-search" && (
          <DriverSearch
            booking={currentBooking}
            onDriverFound={handleDriverFound}
            onCancel={handleBack}
          />
        )}
        {currentScreen === "live-trip" && currentDriver && (
          <LiveTrip
            booking={currentBooking}
            driver={currentDriver}
            onChat={() => setCurrentScreen("chat-room")}
            onComplete={handleTripComplete}
            onCancel={handleBack}
          />
        )}
        {currentScreen === "wallet" && <WalletScreen />}
        {currentScreen === "chat-room" && (
          <ChatRoom
            chatId="conv1"
            participantName={currentDriver?.name || "Driver"}
            participantAvatar={currentDriver?.avatar}
            userRole="customer"
            onBack={handleBack}
          />
        )}

        {!["booking-flow", "driver-search", "live-trip", "chat-room"].includes(currentScreen) && (
          <BottomNav role="customer" activeTab={activeTab} onTabChange={handleTabChange} />
        )}
      </>
    );
  }

  // Render driver screens
  if (role === "driver") {
    return (
      <>
        <RoleSwitcher />

        {currentScreen === "home" && (
          <DriverHome
            onJobAccepted={handleJobAccepted}
            onEarnings={() => setCurrentScreen("earnings")}
            onChat={() => setCurrentScreen("chat-room")}
          />
        )}
        {currentScreen === "trip" && currentJob && (
          <DriverTrip
            job={currentJob}
            onComplete={handleJobComplete}
            onChat={() => setCurrentScreen("chat-room")}
          />
        )}
        {currentScreen === "earnings" && (
          <DriverEarnings onBack={handleBack} />
        )}
        {currentScreen === "chat-room" && (
          <ChatRoom
            chatId="conv1"
            participantName="Customer"
            userRole="driver"
            onBack={handleBack}
          />
        )}

        {!["trip", "earnings", "chat-room"].includes(currentScreen) && (
          <BottomNav role="driver" activeTab={activeTab} onTabChange={handleTabChange} />
        )}
      </>
    );
  }

  // Render admin screens
  if (role === "admin") {
    return (
      <>
        <RoleSwitcher />

        {currentScreen === "dashboard" && (
          <AdminDashboard onNavigate={(screen) => setCurrentScreen(screen)} />
        )}
        {currentScreen === "drivers" && (
          <AdminDrivers onBack={handleBack} />
        )}
        {currentScreen === "support" && (
          <AdminSupport 
            onBack={handleBack} 
            onOpenChat={(chatId) => setCurrentScreen("chat-room")}
          />
        )}
        {currentScreen === "chat-room" && (
          <ChatRoom
            chatId="conv1"
            participantName="User"
            userRole="admin"
            onBack={handleBack}
          />
        )}

        {!["drivers", "support", "chat-room"].includes(currentScreen) && (
          <BottomNav role="admin" activeTab={activeTab} onTabChange={handleTabChange} />
        )}
      </>
    );
  }

  return null;
};

export default Index;
