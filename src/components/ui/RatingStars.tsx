import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onChange?: (rating: number) => void;
  className?: string;
}

const sizeClasses = {
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-6 w-6",
};

export function RatingStars({
  rating,
  maxRating = 5,
  size = "md",
  interactive = false,
  onChange,
  className,
}: RatingStarsProps) {
  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {Array.from({ length: maxRating }).map((_, index) => {
        const filled = index < Math.floor(rating);
        const partial = index === Math.floor(rating) && rating % 1 > 0;
        
        return (
          <button
            key={index}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onChange?.(index + 1)}
            className={cn(
              "relative transition-transform",
              interactive && "hover:scale-110 cursor-pointer",
              !interactive && "cursor-default"
            )}
          >
            <Star
              className={cn(
                sizeClasses[size],
                "transition-colors",
                filled
                  ? "fill-warning text-warning"
                  : "fill-muted text-muted"
              )}
            />
            {partial && (
              <Star
                className={cn(
                  sizeClasses[size],
                  "absolute inset-0 fill-warning text-warning"
                )}
                style={{
                  clipPath: `inset(0 ${100 - (rating % 1) * 100}% 0 0)`,
                }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
