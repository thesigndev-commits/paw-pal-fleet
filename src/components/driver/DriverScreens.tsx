import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Power, 
  MapPin, 
  Clock, 
  DollarSign,
  Phone,
  MessageCircle,
  Navigation,
  Camera,
  Check,
  X,
  ChevronRight,
  TrendingUp,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AppAvatar } from "@/components/ui/AppAvatar";
import { MapPlaceholder } from "@/components/ui/MapPlaceholder";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { mockBookings } from "@/lib/mockData";

interface DriverHomeProps {
  onJobAccepted: (job: any) => void;
  onEarnings: () => void;
  onChat: () => void;
}

export function DriverHome({ onJobAccepted, onEarnings, onChat }: DriverHomeProps) {
  const [isOnline, setIsOnline] = useState(false);
  const [showJobModal, setShowJobModal] = useState(false);
  const [currentJob, setCurrentJob] = useState<any>(null);

  const todayEarnings = 1250;
  const todayTrips = 5;

  // Simulate incoming job
  const simulateJob = () => {
    if (isOnline) {
      setTimeout(() => {
        setCurrentJob(mockBookings[1]);
        setShowJobModal(true);
      }, 3000);
    }
  };

  const toggleOnline = () => {
    const newStatus = !isOnline;
    setIsOnline(newStatus);
    if (newStatus) {
      simulateJob();
    }
  };

  const acceptJob = () => {
    setShowJobModal(false);
    onJobAccepted(currentJob);
  };

  const declineJob = () => {
    setShowJobModal(false);
    setCurrentJob(null);
    // Simulate another job after decline
    simulateJob();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Map */}
      <div className="flex-1 relative">
        <MapPlaceholder 
          className="absolute inset-0" 
          showMarker={isOnline}
          markerLabel={isOnline ? "You're online" : undefined}
        />
        
        {/* Status indicator */}
        <div className="absolute top-4 left-4 right-4 z-10">
          <Card variant="elevated" className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${isOnline ? "bg-success animate-pulse" : "bg-muted"}`} />
                <span className="font-medium">
                  {isOnline ? "You're Online" : "You're Offline"}
                </span>
              </div>
              {isOnline && (
                <span className="text-sm text-muted-foreground">
                  Waiting for requests...
                </span>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Bottom panel */}
      <div className="bg-card rounded-t-3xl shadow-xl p-6">
        {/* Earnings summary */}
        <div className="flex gap-4 mb-6">
          <Card 
            variant="flat" 
            className="flex-1 p-4 cursor-pointer"
            onClick={onEarnings}
          >
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">Today</span>
            </div>
            <p className="text-2xl font-bold">฿{todayEarnings.toLocaleString()}</p>
          </Card>
          <Card variant="flat" className="flex-1 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">Trips</span>
            </div>
            <p className="text-2xl font-bold">{todayTrips}</p>
          </Card>
        </div>

        {/* Go online/offline button */}
        <Button
          onClick={toggleOnline}
          size="xl"
          variant={isOnline ? "outline" : "default"}
          className="w-full"
        >
          <Power className="h-6 w-6 mr-2" />
          {isOnline ? "Go Offline" : "Go Online"}
        </Button>
      </div>

      {/* Incoming job modal */}
      <BottomSheet
        isOpen={showJobModal}
        onClose={declineJob}
        title="New Job Request"
      >
        {currentJob && (
          <div className="p-6">
            {/* Pet info */}
            <div className="flex items-center gap-4 pb-4 border-b border-border">
              <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center text-3xl">
                🐾
              </div>
              <div>
                <p className="font-bold text-lg">{currentJob.petName}</p>
                <p className="text-muted-foreground">{currentJob.petType}</p>
              </div>
            </div>

            {/* Route */}
            <div className="py-4 space-y-3">
              <div className="flex items-start gap-3">
                <div className="mt-1.5 w-3 h-3 rounded-full bg-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Pickup</p>
                  <p className="font-medium">{currentJob.pickupAddress}</p>
                </div>
              </div>
              <div className="ml-[5px] h-6 border-l-2 border-dashed border-muted" />
              <div className="flex items-start gap-3">
                <div className="mt-1.5 w-3 h-3 rounded-full bg-destructive" />
                <div>
                  <p className="text-xs text-muted-foreground">Drop-off</p>
                  <p className="font-medium">{currentJob.dropoffAddress}</p>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="flex justify-between py-4 border-t border-border">
              <div>
                <p className="text-sm text-muted-foreground">Distance</p>
                <p className="font-bold">{currentJob.distance} km</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Est. Time</p>
                <p className="font-bold">{currentJob.duration} min</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Fare</p>
                <p className="font-bold text-primary">฿{currentJob.fare}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-4">
              <Button variant="outline" className="flex-1" onClick={declineJob}>
                <X className="h-5 w-5 mr-2" />
                Decline
              </Button>
              <Button className="flex-1" onClick={acceptJob}>
                <Check className="h-5 w-5 mr-2" />
                Accept
              </Button>
            </div>
          </div>
        )}
      </BottomSheet>
    </div>
  );
}

interface DriverTripProps {
  job: any;
  onComplete: () => void;
  onChat: () => void;
}

export function DriverTrip({ job, onComplete, onChat }: DriverTripProps) {
  const [tripStatus, setTripStatus] = useState<"en-route" | "arrived" | "pickup" | "in-transit" | "complete">("en-route");
  const [showPhotoSheet, setShowPhotoSheet] = useState(false);

  const statusActions = {
    "en-route": { label: "I've Arrived", next: "arrived" as const },
    "arrived": { label: "Pet Onboard", next: "pickup" as const },
    "pickup": { label: "Start Trip", next: "in-transit" as const },
    "in-transit": { label: "Complete Trip", next: "complete" as const },
  };

  const handleAction = () => {
    const current = statusActions[tripStatus as keyof typeof statusActions];
    if (current) {
      if (tripStatus === "arrived") {
        setShowPhotoSheet(true);
      } else if (current.next === "complete") {
        onComplete();
      } else {
        setTripStatus(current.next);
      }
    }
  };

  const confirmPickup = () => {
    setShowPhotoSheet(false);
    setTripStatus("pickup");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Map */}
      <div className="flex-1 relative">
        <MapPlaceholder className="absolute inset-0" />
        
        {/* Navigation button */}
        <Button
          variant="secondary"
          className="absolute top-4 right-4 z-10"
          onClick={() => {}}
        >
          <Navigation className="h-5 w-5 mr-2" />
          Navigate
        </Button>
      </div>

      {/* Bottom panel */}
      <div className="bg-card rounded-t-3xl shadow-xl p-6">
        {/* Status */}
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-3 h-3 rounded-full ${
            tripStatus === "in-transit" ? "bg-primary animate-pulse" : "bg-success"
          }`} />
          <span className="font-medium capitalize">{tripStatus.replace("-", " ")}</span>
        </div>

        {/* Job info */}
        <Card variant="flat" className="p-4 mb-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center text-2xl">
              🐾
            </div>
            <div className="flex-1">
              <p className="font-bold">{job.petName}</p>
              <p className="text-sm text-muted-foreground">{job.petType}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="iconSm" onClick={() => {}}>
                <Phone className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="iconSm" onClick={onChat}>
                <MessageCircle className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Address */}
        <div className="space-y-2 mb-4">
          <div className="flex items-start gap-3">
            <div className="mt-1.5 w-3 h-3 rounded-full bg-primary" />
            <p className="text-sm">{job.pickupAddress}</p>
          </div>
          <div className="ml-[5px] h-4 border-l-2 border-dashed border-muted" />
          <div className="flex items-start gap-3">
            <div className="mt-1.5 w-3 h-3 rounded-full bg-destructive" />
            <p className="text-sm">{job.dropoffAddress}</p>
          </div>
        </div>

        {/* Action button */}
        {tripStatus !== "complete" && (
          <Button size="lg" className="w-full" onClick={handleAction}>
            {statusActions[tripStatus as keyof typeof statusActions]?.label}
          </Button>
        )}
      </div>

      {/* Photo confirmation sheet */}
      <BottomSheet
        isOpen={showPhotoSheet}
        onClose={() => setShowPhotoSheet(false)}
        title="Confirm Pickup"
      >
        <div className="p-6 text-center">
          <p className="text-muted-foreground mb-6">
            Please take a photo of the pet to confirm pickup
          </p>
          <div className="w-full h-48 rounded-2xl bg-muted flex flex-col items-center justify-center mb-6">
            <Camera className="h-12 w-12 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">Tap to take photo</p>
          </div>
          <Button size="lg" className="w-full" onClick={confirmPickup}>
            Confirm Pet Onboard
          </Button>
        </div>
      </BottomSheet>
    </div>
  );
}

interface DriverEarningsProps {
  onBack: () => void;
}

export function DriverEarnings({ onBack }: DriverEarningsProps) {
  const [period, setPeriod] = useState<"today" | "week" | "month">("today");
  
  const earnings = {
    today: { amount: 1250, trips: 5, hours: 4.5 },
    week: { amount: 8750, trips: 32, hours: 28 },
    month: { amount: 35000, trips: 128, hours: 112 },
  };

  const current = earnings[period];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-primary px-6 pt-12 pb-8 rounded-b-3xl">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="glass" size="iconSm" onClick={onBack}>
            <X className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-primary-foreground">Earnings</h1>
        </div>

        {/* Period tabs */}
        <div className="flex bg-primary-foreground/20 rounded-xl p-1 mb-6">
          {(["today", "week", "month"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                period === p
                  ? "bg-primary-foreground text-primary"
                  : "text-primary-foreground/80"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Amount */}
        <motion.div
          key={period}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <p className="text-primary-foreground/80 text-sm mb-1">Total Earnings</p>
          <p className="text-5xl font-bold text-primary-foreground">
            ฿{current.amount.toLocaleString()}
          </p>
        </motion.div>
      </div>

      <div className="px-6 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card variant="default" className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">Hours Online</span>
            </div>
            <p className="text-2xl font-bold">{current.hours}</p>
          </Card>
          <Card variant="default" className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">Trips</span>
            </div>
            <p className="text-2xl font-bold">{current.trips}</p>
          </Card>
        </div>

        {/* Chart placeholder */}
        <Card variant="flat" className="p-4 mb-6">
          <h3 className="font-semibold mb-4">Earnings Chart</h3>
          <div className="h-32 flex items-end justify-between gap-2">
            {[65, 45, 80, 55, 90, 70, 85].map((height, i) => (
              <div
                key={i}
                className="flex-1 bg-primary/20 rounded-t-lg relative overflow-hidden"
                style={{ height: `${height}%` }}
              >
                <div 
                  className="absolute bottom-0 left-0 right-0 gradient-primary"
                  style={{ height: `${height * 0.6}%` }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </Card>

        {/* Recent transactions */}
        <h3 className="font-semibold mb-4">Recent Trips</h3>
        <div className="space-y-3">
          {mockBookings.map((booking) => (
            <Card key={booking.id} variant="default" className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                  🐾
                </div>
                <div className="flex-1">
                  <p className="font-medium">{booking.petName}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <p className="font-bold text-success">+฿{booking.fare}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
