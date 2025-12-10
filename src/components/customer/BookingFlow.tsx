import { useState } from "react";
import { motion } from "framer-motion";
import { 
  MapPin, 
  ArrowLeft,
  Search,
  Clock,
  Star,
  Check,
  ChevronRight,
  Car,
  Truck,
  Bus,
  Thermometer,
  Box,
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { MapPlaceholder } from "@/components/ui/MapPlaceholder";
import { serviceTypes, mockPets } from "@/lib/mockData";
import { useAppStore } from "@/store/appStore";

interface BookingFlowProps {
  onBack: () => void;
  onConfirmBooking: (booking: any) => void;
}

type Step = "location" | "pet" | "service" | "options" | "confirm";

export function BookingFlow({ onBack, onConfirmBooking }: BookingFlowProps) {
  const { selectedPet, pets } = useAppStore();
  const [step, setStep] = useState<Step>("location");
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [selectedService, setSelectedService] = useState(serviceTypes[0]);
  const [tripMode, setTripMode] = useState<"one-way" | "round-trip" | "hourly">("one-way");
  const [scheduleType, setScheduleType] = useState<"now" | "later">("now");
  const [options, setOptions] = useState({ cage: true, ac: true, extraCare: false });
  const [showFareSheet, setShowFareSheet] = useState(false);

  const displayPets = pets.length > 0 ? pets : mockPets;
  const currentPet = selectedPet || displayPets[0];

  // Calculate fare
  const baseFare = selectedService.basePrice;
  const distanceFare = 85;
  const optionsFare = (options.cage ? 50 : 0) + (options.extraCare ? 100 : 0);
  const modeMultiplier = tripMode === "round-trip" ? 1.8 : tripMode === "hourly" ? 2 : 1;
  const totalFare = Math.round((baseFare + distanceFare + optionsFare) * modeMultiplier);

  const handleContinue = () => {
    switch (step) {
      case "location":
        setStep("pet");
        break;
      case "pet":
        setStep("service");
        break;
      case "service":
        setStep("options");
        break;
      case "options":
        setShowFareSheet(true);
        break;
    }
  };

  const handleConfirm = () => {
    onConfirmBooking({
      pickup,
      dropoff,
      pet: currentPet,
      service: selectedService,
      tripMode,
      options,
      fare: totalFare,
    });
  };

  const getStepTitle = () => {
    switch (step) {
      case "location": return "Set Locations";
      case "pet": return "Select Pet";
      case "service": return "Choose Service";
      case "options": return "Trip Options";
      default: return "Book a Ride";
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center gap-4 border-b border-border">
        <Button variant="ghost" size="iconSm" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">{getStepTitle()}</h1>
      </div>

      {/* Progress */}
      <div className="px-6 py-4">
        <div className="flex gap-2">
          {["location", "pet", "service", "options"].map((s, i) => (
            <div 
              key={s}
              className={`h-1 flex-1 rounded-full transition-colors ${
                ["location", "pet", "service", "options"].indexOf(step) >= i
                  ? "bg-primary"
                  : "bg-muted"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pb-6 overflow-y-auto">
        {step === "location" && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <MapPlaceholder className="h-48 mb-4" markerLabel="Select location" />
            
            <Input
              label="Pickup Location"
              placeholder="Enter pickup address"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              prefix={<div className="w-3 h-3 rounded-full bg-primary" />}
            />
            
            <Input
              label="Drop-off Location"
              placeholder="Enter destination"
              value={dropoff}
              onChange={(e) => setDropoff(e.target.value)}
              prefix={<div className="w-3 h-3 rounded-full bg-destructive" />}
            />

            {/* Quick locations */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Recent</p>
              {["Siam Paragon, Pathum Wan", "Central World, Ratchadamri"].map((loc) => (
                <button
                  key={loc}
                  onClick={() => !pickup ? setPickup(loc) : setDropoff(loc)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors"
                >
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm">{loc}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === "pet" && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <p className="text-muted-foreground">Select which pet will be traveling</p>
            
            <div className="space-y-3">
              {displayPets.map((pet) => (
                <Card
                  key={pet.id}
                  variant={currentPet?.id === pet.id ? "outline" : "default"}
                  className={`p-4 cursor-pointer transition-all ${
                    currentPet?.id === pet.id ? "border-primary border-2" : ""
                  }`}
                  onClick={() => useAppStore.getState().selectPet(pet)}
                >
                  <div className="flex items-center gap-4">
                    <img 
                      src={pet.photo} 
                      alt={pet.name}
                      className="w-16 h-16 rounded-2xl object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-bold">{pet.name}</p>
                      <p className="text-sm text-muted-foreground">{pet.breed}</p>
                      <p className="text-xs text-muted-foreground">{pet.weight} kg</p>
                    </div>
                    {currentPet?.id === pet.id && (
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <Check className="h-4 w-4 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            <Button variant="outline" className="w-full">
              + Add New Pet
            </Button>
          </motion.div>
        )}

        {step === "service" && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Service type */}
            <div className="space-y-3">
              <p className="text-sm font-medium">Vehicle Type</p>
              {serviceTypes.map((service) => (
                <Card
                  key={service.id}
                  variant={selectedService.id === service.id ? "outline" : "default"}
                  className={`p-4 cursor-pointer transition-all ${
                    selectedService.id === service.id ? "border-primary border-2" : ""
                  }`}
                  onClick={() => setSelectedService(service)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center text-3xl">
                      {service.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold">{service.name}</p>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                      <p className="text-xs text-muted-foreground">{service.capacity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">฿{service.basePrice}</p>
                      <p className="text-xs text-muted-foreground">base</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Trip mode */}
            <div className="space-y-3">
              <p className="text-sm font-medium">Trip Type</p>
              <div className="grid grid-cols-3 gap-2">
                {([
                  { id: "one-way", label: "One-way", icon: "→" },
                  { id: "round-trip", label: "Round-trip", icon: "⟲" },
                  { id: "hourly", label: "Hourly", icon: "⏱" },
                ] as const).map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setTripMode(mode.id)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      tripMode === mode.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-muted-foreground"
                    }`}
                  >
                    <span className="text-2xl block mb-1">{mode.icon}</span>
                    <span className="text-sm font-medium">{mode.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Schedule */}
            <div className="space-y-3">
              <p className="text-sm font-medium">When</p>
              <div className="flex bg-muted rounded-xl p-1">
                <button
                  onClick={() => setScheduleType("now")}
                  className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all ${
                    scheduleType === "now"
                      ? "bg-card shadow-sm text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  Now
                </button>
                <button
                  onClick={() => setScheduleType("later")}
                  className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all ${
                    scheduleType === "later"
                      ? "bg-card shadow-sm text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  Schedule Later
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {step === "options" && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <p className="text-muted-foreground">Select additional options for your pet's comfort</p>
            
            {[
              { id: "cage", label: "Pet Cage", desc: "Secure carrier provided", icon: Box, price: 50 },
              { id: "ac", label: "Air Conditioning", desc: "Climate controlled ride", icon: Thermometer, price: 0 },
              { id: "extraCare", label: "Extra Care", desc: "Additional attention for anxious pets", icon: Heart, price: 100 },
            ].map((option) => (
              <Card
                key={option.id}
                variant={options[option.id as keyof typeof options] ? "outline" : "default"}
                className={`p-4 cursor-pointer transition-all ${
                  options[option.id as keyof typeof options] ? "border-primary border-2" : ""
                }`}
                onClick={() => setOptions({ ...options, [option.id]: !options[option.id as keyof typeof options] })}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                    <option.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{option.label}</p>
                    <p className="text-sm text-muted-foreground">{option.desc}</p>
                  </div>
                  <div className="text-right">
                    {option.price > 0 && (
                      <p className="text-sm font-medium">+฿{option.price}</p>
                    )}
                    <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${
                      options[option.id as keyof typeof options]
                        ? "bg-primary border-primary"
                        : "border-muted-foreground"
                    }`}>
                      {options[option.id as keyof typeof options] && (
                        <Check className="h-4 w-4 text-primary-foreground" />
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </motion.div>
        )}
      </div>

      {/* Bottom action */}
      <div className="p-6 border-t border-border bg-card">
        <Button onClick={handleContinue} size="lg" className="w-full">
          {step === "options" ? `View Fare Estimate` : "Continue"}
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Fare estimate sheet */}
      <BottomSheet
        isOpen={showFareSheet}
        onClose={() => setShowFareSheet(false)}
        title="Fare Estimate"
      >
        <div className="p-6 space-y-4">
          {/* Summary */}
          <div className="flex items-center gap-4 pb-4 border-b border-border">
            <img 
              src={currentPet?.photo} 
              alt={currentPet?.name}
              className="w-14 h-14 rounded-2xl object-cover"
            />
            <div>
              <p className="font-bold">{currentPet?.name}</p>
              <p className="text-sm text-muted-foreground">{selectedService.name} • {tripMode}</p>
            </div>
          </div>

          {/* Route */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <p className="text-sm">{pickup || "Siam Paragon"}</p>
            </div>
            <div className="ml-[5px] h-4 border-l-2 border-dashed border-muted" />
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-destructive" />
              <p className="text-sm">{dropoff || "Central World"}</p>
            </div>
          </div>

          {/* Breakdown */}
          <div className="space-y-2 pt-4 border-t border-border">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Base fare</span>
              <span>฿{baseFare}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Distance (3.2 km)</span>
              <span>฿{distanceFare}</span>
            </div>
            {options.cage && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pet Cage</span>
                <span>฿50</span>
              </div>
            )}
            {options.extraCare && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Extra Care</span>
                <span>฿100</span>
              </div>
            )}
            {tripMode !== "one-way" && (
              <div className="flex justify-between text-primary">
                <span>{tripMode === "round-trip" ? "Round-trip" : "Hourly"}</span>
                <span>×{modeMultiplier}</span>
              </div>
            )}
          </div>

          {/* Total */}
          <div className="flex justify-between pt-4 border-t border-border">
            <span className="text-lg font-bold">Total</span>
            <span className="text-2xl font-bold text-primary">฿{totalFare}</span>
          </div>

          <Button onClick={handleConfirm} size="lg" className="w-full mt-4">
            Confirm Booking
          </Button>
        </div>
      </BottomSheet>
    </div>
  );
}
