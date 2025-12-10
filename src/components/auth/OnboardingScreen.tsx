import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface OnboardingScreenProps {
  onComplete: () => void;
}

const slides = [
  {
    title: "Safe Pet Transport",
    description: "Your furry friends travel in comfort with verified pet-loving drivers",
    emoji: "🐕",
    bgColor: "from-pet-mint to-secondary",
  },
  {
    title: "Track in Real-Time",
    description: "Know exactly where your pet is with live GPS tracking",
    emoji: "📍",
    bgColor: "from-secondary to-pet-purple-light",
  },
  {
    title: "Peace of Mind",
    description: "Fully insured rides with trained pet handlers",
    emoji: "💚",
    bgColor: "from-pet-purple-light to-pet-mint",
  },
];

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Skip button */}
      <div className="flex justify-end p-4">
        <Button variant="ghost" onClick={onComplete}>
          Skip
        </Button>
      </div>

      {/* Slides */}
      <div className="flex-1 flex items-center justify-center px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            {/* Illustration */}
            <div className={`mx-auto mb-8 w-64 h-64 rounded-full bg-gradient-to-br ${slides[currentSlide].bgColor} flex items-center justify-center shadow-xl`}>
              <motion.span
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="text-8xl"
              >
                {slides[currentSlide].emoji}
              </motion.span>
            </div>

            {/* Text */}
            <h1 className="text-3xl font-bold mb-4 text-foreground">
              {slides[currentSlide].title}
            </h1>
            <p className="text-muted-foreground text-lg max-w-sm mx-auto">
              {slides[currentSlide].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom section */}
      <div className="p-8 pb-12">
        {/* Dots */}
        <div className="flex justify-center gap-2 mb-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "w-8 bg-primary"
                  : "w-2 bg-muted hover:bg-muted-foreground/50"
              }`}
            />
          ))}
        </div>

        {/* Button */}
        <Button onClick={nextSlide} size="lg" className="w-full">
          {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
