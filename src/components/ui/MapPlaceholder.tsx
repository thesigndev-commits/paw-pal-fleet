import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";

interface MapPlaceholderProps {
  className?: string;
  showMarker?: boolean;
  markerLabel?: string;
}

export function MapPlaceholder({ className, showMarker = true, markerLabel }: MapPlaceholderProps) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-2xl overflow-hidden bg-gradient-to-br from-pet-mint to-secondary",
        className
      )}
    >
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary/30" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* Fake roads */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-0 right-0 h-1 bg-primary/50" />
        <div className="absolute top-1/2 left-0 right-0 h-2 bg-primary/60" />
        <div className="absolute top-3/4 left-0 right-0 h-1 bg-primary/50" />
        <div className="absolute left-1/4 top-0 bottom-0 w-1 bg-primary/50" />
        <div className="absolute left-1/2 top-0 bottom-0 w-2 bg-primary/60" />
        <div className="absolute left-3/4 top-0 bottom-0 w-1 bg-primary/50" />
      </div>
      
      {showMarker && (
        <div className="relative z-10 flex flex-col items-center animate-bounce-in">
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/20 rounded-full animate-pulse-soft" />
            <div className="relative bg-primary text-primary-foreground p-3 rounded-full shadow-glow">
              <MapPin className="h-6 w-6" />
            </div>
          </div>
          {markerLabel && (
            <div className="mt-2 px-3 py-1 bg-card rounded-full shadow-md text-sm font-medium">
              {markerLabel}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
