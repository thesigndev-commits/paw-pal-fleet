import { useState } from "react";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Search, 
  Bell, 
  ChevronRight,
  Car,
  Truck,
  Bus,
  Clock,
  Star,
  Gift
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AppAvatar } from "@/components/ui/AppAvatar";
import { useAppStore } from "@/store/appStore";
import { mockPets, mockPromotions, serviceTypes, mockBookings } from "@/lib/mockData";

interface CustomerHomeProps {
  onBooking: () => void;
  onNotifications: () => void;
  onSelectPet: () => void;
  onPromoDetails: (promoId: string) => void;
  onBookingHistory: () => void;
}

const serviceIcons = {
  "pet-car": Car,
  "pet-suv": Truck,
  "pet-van": Bus,
};

export function CustomerHome({ 
  onBooking, 
  onNotifications, 
  onSelectPet,
  onPromoDetails,
  onBookingHistory 
}: CustomerHomeProps) {
  const { user, selectedPet, pets } = useAppStore();
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");

  const displayPets = pets.length > 0 ? pets : mockPets;
  const currentPet = selectedPet || displayPets[0];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="gradient-primary px-6 pt-12 pb-8 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-primary-foreground/80 text-sm">Hello 👋</p>
            <h1 className="text-xl font-bold text-primary-foreground">
              {user?.name || "Pet Lover"}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="glass" size="iconSm" onClick={onNotifications}>
              <Bell className="h-5 w-5" />
            </Button>
            <AppAvatar src={user?.avatar} alt={user?.name} size="md" fallback={user?.name?.charAt(0)} />
          </div>
        </div>

        {/* Search Card */}
        <Card variant="elevated" className="p-4">
          <p className="text-sm font-medium text-muted-foreground mb-3">
            Where does your pet need to go?
          </p>
          
          {/* Pickup */}
          <button 
            onClick={onBooking}
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors"
          >
            <div className="w-3 h-3 rounded-full bg-primary" />
            <div className="flex-1 text-left">
              <p className="text-xs text-muted-foreground">Pickup</p>
              <p className="font-medium text-foreground">
                {pickup || "Enter pickup location"}
              </p>
            </div>
          </button>
          
          <div className="ml-[22px] h-4 border-l-2 border-dashed border-muted" />
          
          {/* Dropoff */}
          <button 
            onClick={onBooking}
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors"
          >
            <div className="w-3 h-3 rounded-full bg-destructive" />
            <div className="flex-1 text-left">
              <p className="text-xs text-muted-foreground">Drop-off</p>
              <p className="font-medium text-foreground">
                {dropoff || "Enter destination"}
              </p>
            </div>
          </button>
        </Card>
      </div>

      <div className="px-6 -mt-2">
        {/* Selected Pet */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card 
            variant="outline" 
            className="p-4 flex items-center gap-4 cursor-pointer hover:border-primary transition-colors mt-4"
            onClick={onSelectPet}
          >
            <img 
              src={currentPet?.photo || "https://images.unsplash.com/photo-1552053831-71594a27632d?w=100&h=100&fit=crop"} 
              alt={currentPet?.name}
              className="w-14 h-14 rounded-2xl object-cover"
            />
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Traveling with</p>
              <p className="font-bold text-foreground">{currentPet?.name || "Select a pet"}</p>
              <p className="text-xs text-muted-foreground">{currentPet?.breed}</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </Card>
        </motion.div>

        {/* Services */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-6"
        >
          <h2 className="text-lg font-bold mb-4">Our Services</h2>
          <div className="grid grid-cols-3 gap-3">
            {serviceTypes.map((service) => {
              const Icon = serviceIcons[service.id as keyof typeof serviceIcons] || Car;
              return (
                <button
                  key={service.id}
                  onClick={onBooking}
                  className="flex flex-col items-center p-4 rounded-2xl bg-card border border-border hover:border-primary hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-2">
                    <span className="text-2xl">{service.icon}</span>
                  </div>
                  <p className="font-semibold text-sm">{service.name}</p>
                  <p className="text-xs text-muted-foreground">฿{service.basePrice}+</p>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Promotions */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Promotions</h2>
            <button className="text-sm text-primary font-medium">See All</button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
            {mockPromotions.map((promo, index) => (
              <motion.div
                key={promo.id}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card 
                  variant="primary"
                  className="w-64 shrink-0 p-4 cursor-pointer"
                  onClick={() => onPromoDetails(promo.id)}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Gift className="h-5 w-5" />
                    <span className="text-xs font-medium opacity-80">{promo.code}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-1">{promo.title}</h3>
                  <p className="text-sm opacity-80">{promo.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Trips */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Recent Trips</h2>
            <button onClick={onBookingHistory} className="text-sm text-primary font-medium">
              See All
            </button>
          </div>
          <div className="space-y-3">
            {mockBookings.slice(0, 2).map((booking) => (
              <Card key={booking.id} variant="default" className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-2xl">
                    🐾
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{booking.petName}</p>
                    <p className="text-sm text-muted-foreground truncate">
                      {booking.pickupAddress} → {booking.dropoffAddress}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        booking.status === "completed" 
                          ? "bg-success/10 text-success" 
                          : "bg-warning/10 text-warning"
                      }`}>
                        {booking.status}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ฿{booking.fare}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
