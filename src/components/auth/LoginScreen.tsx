import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useAppStore } from "@/store/appStore";

interface LoginScreenProps {
  onRegister: () => void;
  onForgotPassword: () => void;
  onBack: () => void;
}

export function LoginScreen({ onRegister, onForgotPassword, onBack }: LoginScreenProps) {
  const [loginMethod, setLoginMethod] = useState<"phone" | "email">("phone");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { setUser } = useAppStore();

  const handleLogin = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Mock login - set user
    setUser({
      id: "c1",
      name: "Pet Lover",
      email: email || "user@petgo.com",
      phone: phone || "+66 91 234 5678",
      role: "customer",
    });
    
    setIsLoading(false);
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
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl gradient-primary shadow-glow mb-4">
            <span className="text-4xl">🐾</span>
          </div>
          <h1 className="text-3xl font-bold text-gradient">PetGo</h1>
          <p className="text-muted-foreground mt-2">Welcome back!</p>
        </motion.div>

        {/* Login method toggle */}
        <div className="flex bg-muted rounded-xl p-1 mb-6">
          <button
            onClick={() => setLoginMethod("phone")}
            className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all ${
              loginMethod === "phone"
                ? "bg-card shadow-sm text-foreground"
                : "text-muted-foreground"
            }`}
          >
            Phone
          </button>
          <button
            onClick={() => setLoginMethod("email")}
            className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all ${
              loginMethod === "email"
                ? "bg-card shadow-sm text-foreground"
                : "text-muted-foreground"
            }`}
          >
            Email
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {loginMethod === "phone" ? (
            <Input
              label="Phone Number"
              type="tel"
              placeholder="+66 XX XXX XXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              prefix={<Phone className="h-5 w-5" />}
            />
          ) : (
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              prefix={<Mail className="h-5 w-5" />}
            />
          )}

          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
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

          <div className="text-right">
            <button
              onClick={onForgotPassword}
              className="text-sm text-primary font-medium hover:underline"
            >
              Forgot Password?
            </button>
          </div>
        </div>

        {/* Login button */}
        <Button
          onClick={handleLogin}
          disabled={isLoading}
          size="lg"
          className="w-full mt-8"
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>

        {/* Divider */}
        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-px bg-border" />
          <span className="text-sm text-muted-foreground">or continue with</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Social login */}
        <div className="flex gap-4">
          <Button variant="outline" className="flex-1">
            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google
          </Button>
          <Button variant="outline" className="flex-1">
            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            Facebook
          </Button>
        </div>

        {/* Register link */}
        <p className="text-center mt-8 text-muted-foreground">
          Don't have an account?{" "}
          <button onClick={onRegister} className="text-primary font-semibold hover:underline">
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}
