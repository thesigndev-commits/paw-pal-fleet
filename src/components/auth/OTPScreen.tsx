import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface OTPScreenProps {
  phone: string;
  onVerify: (otp: string) => void;
  onBack: () => void;
  onResend: () => void;
}

export function OTPScreen({ phone, onVerify, onBack, onResend }: OTPScreenProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(60);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto verify when complete
    if (newOtp.every((d) => d) && newOtp.join("").length === 6) {
      handleVerify(newOtp.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (code: string) => {
    setIsVerifying(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    onVerify(code);
    setIsVerifying(false);
  };

  const handleResend = () => {
    setCountdown(60);
    onResend();
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="p-4">
        <Button variant="ghost" size="iconSm" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex-1 px-6 pb-8">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-secondary mb-4">
            <span className="text-4xl">📱</span>
          </div>
          <h1 className="text-2xl font-bold">Enter OTP</h1>
          <p className="text-muted-foreground mt-2">
            We sent a code to <span className="font-medium text-foreground">{phone}</span>
          </p>
        </motion.div>

        {/* OTP inputs */}
        <div className="flex justify-center gap-3 mb-8">
          {otp.map((digit, index) => (
            <motion.input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className="w-12 h-14 text-center text-2xl font-bold rounded-xl border-2 border-input bg-card focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          ))}
        </div>

        {/* Verify button */}
        <Button
          onClick={() => handleVerify(otp.join(""))}
          disabled={!otp.every((d) => d) || isVerifying}
          size="lg"
          className="w-full"
        >
          {isVerifying ? "Verifying..." : "Verify"}
        </Button>

        {/* Resend */}
        <div className="text-center mt-6">
          {countdown > 0 ? (
            <p className="text-muted-foreground">
              Resend code in <span className="font-medium text-foreground">{countdown}s</span>
            </p>
          ) : (
            <button onClick={handleResend} className="text-primary font-semibold hover:underline">
              Resend Code
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
