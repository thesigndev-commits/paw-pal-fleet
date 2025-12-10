import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Phone, Mail, Lock, Eye, EyeOff, ArrowLeft, Check } from "lucide-react";
import { useAppStore } from "@/store/appStore";

interface RegisterScreenProps {
  onLogin: () => void;
  onBack: () => void;
}

export function RegisterScreen({ onLogin, onBack }: RegisterScreenProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { setUser } = useAppStore();

  const handleRegister = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setUser({
      id: "c1",
      name: name || "Pet Lover",
      email: email,
      phone: phone,
      role: "customer",
    });
    
    setIsLoading(false);
  };

  const isFormValid = name && phone && email && password && confirmPassword === password && agreeTerms;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="p-4 flex items-center gap-4">
        <Button variant="ghost" size="iconSm" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Create Account</h1>
      </div>

      <div className="flex-1 px-6 pb-8 overflow-y-auto">
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex justify-center mb-6"
        >
          <button className="relative">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
              <User className="h-10 w-10 text-muted-foreground" />
            </div>
            <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full gradient-primary flex items-center justify-center shadow-md">
              <span className="text-sm">📷</span>
            </div>
          </button>
        </motion.div>

        {/* Form */}
        <div className="space-y-4">
          <Input
            label="Full Name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            prefix={<User className="h-5 w-5" />}
          />

          <Input
            label="Phone Number"
            type="tel"
            placeholder="+66 XX XXX XXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            prefix={<Phone className="h-5 w-5" />}
          />

          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            prefix={<Mail className="h-5 w-5" />}
          />

          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            prefix={<Lock className="h-5 w-5" />}
            suffix={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            }
          />

          <Input
            label="Confirm Password"
            type={showPassword ? "text" : "password"}
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            prefix={<Lock className="h-5 w-5" />}
            error={confirmPassword && password !== confirmPassword ? "Passwords don't match" : undefined}
          />

          {/* Terms checkbox */}
          <button
            onClick={() => setAgreeTerms(!agreeTerms)}
            className="flex items-start gap-3 text-left"
          >
            <div className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
              agreeTerms ? "bg-primary border-primary" : "border-muted-foreground"
            }`}>
              {agreeTerms && <Check className="h-3 w-3 text-primary-foreground" />}
            </div>
            <span className="text-sm text-muted-foreground">
              I agree to the{" "}
              <span className="text-primary font-medium">Terms of Service</span> and{" "}
              <span className="text-primary font-medium">Privacy Policy</span>
            </span>
          </button>
        </div>

        {/* Register button */}
        <Button
          onClick={handleRegister}
          disabled={!isFormValid || isLoading}
          size="lg"
          className="w-full mt-8"
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>

        {/* Login link */}
        <p className="text-center mt-6 text-muted-foreground">
          Already have an account?{" "}
          <button onClick={onLogin} className="text-primary font-semibold hover:underline">
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}
