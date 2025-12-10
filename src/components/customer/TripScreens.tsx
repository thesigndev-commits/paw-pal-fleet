import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Phone, 
  MessageCircle, 
  X, 
  Navigation,
  AlertCircle,
  Check,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AppAvatar } from "@/components/ui/AppAvatar";
import { RatingStars } from "@/components/ui/RatingStars";
import { MapPlaceholder } from "@/components/ui/MapPlaceholder";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { mockDrivers } from "@/lib/mockData";

interface DriverSearchProps {
  booking: any;
  onDriverFound: (driver: any) => void;
  onCancel: () => void;
}

export function DriverSearch({ booking, onDriverFound, onCancel }: DriverSearchProps) {
  const [status, setStatus] = useState<"searching" | "found">("searching");
  const [driver, setDriver] = useState(mockDrivers[0]);

  useEffect(() => {
    // Simulate driver search
    const timer = setTimeout(() => {
      setDriver(mockDrivers[0]);
      setStatus("found");
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (status === "found") {
      const timer = setTimeout(() => {
        onDriverFound(driver);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [status, driver, onDriverFound]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Map */}
      <div className="flex-1 relative">
        <MapPlaceholder className="absolute inset-0" showMarker={false} />
        
        {/* Cancel button */}
        <Button
          variant="secondary"
          size="iconSm"
          className="absolute top-4 right-4 z-10"
          onClick={onCancel}
        >
          <X className="h-5 w-5" />
        </Button>

        {/* Searching animation */}
        <AnimatePresence>
          {status === "searching" && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="relative">
                {/* Pulse rings */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 rounded-full border-4 border-primary"
                    initial={{ scale: 1, opacity: 0.6 }}
                    animate={{ scale: 2.5, opacity: 0 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.6,
                      ease: "easeOut",
                    }}
                  />
                ))}
                {/* Center icon */}
                <div className="relative z-10 w-24 h-24 rounded-full gradient-primary flex items-center justify-center shadow-glow">
                  <span className="text-4xl">🐾</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Found animation */}
        <AnimatePresence>
          {status === "found" && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 10 }}
                className="w-32 h-32 rounded-full bg-success flex items-center justify-center shadow-xl"
              >
                <Check className="h-16 w-16 text-success-foreground" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom card */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="bg-card rounded-t-3xl shadow-xl p-6"
      >
        {status === "searching" ? (
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="inline-block text-4xl mb-4"
            >
              🔍
            </motion.div>
            <h2 className="text-xl font-bold mb-2">Finding your driver...</h2>
            <p className="text-muted-foreground mb-4">
              Looking for pet-loving drivers nearby
            </p>
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        ) : (
          <div className="text-center">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-4xl mb-4"
            >
              🎉
            </motion.div>
            <h2 className="text-xl font-bold mb-2">Driver Matched!</h2>
            <div className="flex items-center justify-center gap-3 mb-4">
              <AppAvatar src={driver.avatar} size="lg" />
              <div className="text-left">
                <p className="font-bold">{driver.name}</p>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-warning text-warning" />
                  <span className="text-sm">{driver.rating}</span>
                  <span className="text-muted-foreground text-sm">
                    ({driver.totalTrips} trips)
                  </span>
                </div>
              </div>
            </div>
            <p className="text-muted-foreground">
              {driver.vehicleModel} • {driver.vehiclePlate}
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

interface LiveTripProps {
  booking: any;
  driver: any;
  onChat: () => void;
  onComplete: () => void;
  onCancel: () => void;
}

export function LiveTrip({ booking, driver, onChat, onComplete, onCancel }: LiveTripProps) {
  const [tripStatus, setTripStatus] = useState<"pickup" | "in-transit" | "arrived">("pickup");
  const [eta, setEta] = useState(8);
  const [showCancelSheet, setShowCancelSheet] = useState(false);
  const [showRatingSheet, setShowRatingSheet] = useState(false);
  const [rating, setRating] = useState(5);
  const [tip, setTip] = useState(0);

  useEffect(() => {
    // Simulate trip progress
    const timer1 = setTimeout(() => setTripStatus("in-transit"), 5000);
    const timer2 = setTimeout(() => {
      setTripStatus("arrived");
      setShowRatingSheet(true);
    }, 10000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  useEffect(() => {
    // ETA countdown
    if (eta > 0 && tripStatus !== "arrived") {
      const timer = setTimeout(() => setEta(eta - 1), 10000);
      return () => clearTimeout(timer);
    }
  }, [eta, tripStatus]);

  const statusMessages = {
    pickup: "Driver is on the way",
    "in-transit": "Your pet is on the way",
    arrived: "Trip Complete!",
  };

  const statusIcons = {
    pickup: "🚗",
    "in-transit": "🐾",
    arrived: "🏁",
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Map */}
      <div className="flex-1 relative">
        <MapPlaceholder className="absolute inset-0" markerLabel={`ETA: ${eta} min`} />
        
        {/* Status bar */}
        <div className="absolute top-4 left-4 right-4 z-10">
          <Card variant="elevated" className="p-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{statusIcons[tripStatus]}</span>
              <div className="flex-1">
                <p className="font-bold">{statusMessages[tripStatus]}</p>
                {tripStatus !== "arrived" && (
                  <p className="text-sm text-muted-foreground">
                    Estimated arrival in {eta} minutes
                  </p>
                )}
              </div>
            </div>
            
            {/* Progress */}
            <div className="flex gap-2 mt-4">
              {["pickup", "in-transit", "arrived"].map((s, i) => (
                <div 
                  key={s}
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    ["pickup", "in-transit", "arrived"].indexOf(tripStatus) >= i
                      ? "bg-primary"
                      : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Bottom card */}
      <div className="bg-card rounded-t-3xl shadow-xl p-6">
        {/* Driver info */}
        <div className="flex items-center gap-4 pb-4 border-b border-border">
          <AppAvatar src={driver.avatar} size="lg" />
          <div className="flex-1">
            <p className="font-bold">{driver.name}</p>
            <p className="text-sm text-muted-foreground">
              {driver.vehicleModel} • {driver.vehiclePlate}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <Star className="h-4 w-4 fill-warning text-warning" />
              <span className="text-sm">{driver.rating}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-4">
          <Button variant="outline" className="flex-1" onClick={() => {}}>
            <Phone className="h-5 w-5 mr-2" />
            Call
          </Button>
          <Button variant="outline" className="flex-1" onClick={onChat}>
            <MessageCircle className="h-5 w-5 mr-2" />
            Chat
          </Button>
        </div>

        {tripStatus !== "arrived" && (
          <Button 
            variant="ghost" 
            className="w-full mt-4 text-destructive"
            onClick={() => setShowCancelSheet(true)}
          >
            Cancel Trip
          </Button>
        )}
      </div>

      {/* Cancel confirmation */}
      <BottomSheet
        isOpen={showCancelSheet}
        onClose={() => setShowCancelSheet(false)}
        title="Cancel Trip?"
      >
        <div className="p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>
          <p className="text-muted-foreground mb-6">
            Are you sure you want to cancel this trip? A cancellation fee may apply.
          </p>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => setShowCancelSheet(false)}>
              Keep Trip
            </Button>
            <Button variant="destructive" className="flex-1" onClick={onCancel}>
              Cancel Trip
            </Button>
          </div>
        </div>
      </BottomSheet>

      {/* Rating sheet */}
      <BottomSheet
        isOpen={showRatingSheet}
        onClose={() => {}}
        title="Trip Complete!"
      >
        <div className="p-6 text-center">
          <div className="text-5xl mb-4">🎉</div>
          <p className="text-lg font-bold mb-2">Your pet arrived safely!</p>
          <p className="text-muted-foreground mb-6">How was your experience with {driver.name}?</p>
          
          {/* Rating */}
          <div className="flex justify-center mb-6">
            <RatingStars 
              rating={rating} 
              size="lg" 
              interactive 
              onChange={setRating}
            />
          </div>

          {/* Tip */}
          <p className="text-sm font-medium mb-3">Add a tip?</p>
          <div className="flex justify-center gap-2 mb-6">
            {[0, 20, 50, 100].map((amount) => (
              <button
                key={amount}
                onClick={() => setTip(amount)}
                className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                  tip === amount
                    ? "gradient-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {amount === 0 ? "No tip" : `฿${amount}`}
              </button>
            ))}
          </div>

          <Button size="lg" className="w-full" onClick={onComplete}>
            Done
          </Button>
        </div>
      </BottomSheet>
    </div>
  );
}
