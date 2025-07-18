import { useState } from "react";
import { X, Bus, User, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "login" | "signup";
  onModeSwitch: () => void;
}

export function AuthModal({ isOpen, onClose, mode, onModeSwitch }: AuthModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<"student" | "driver">("student");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement authentication logic
    console.log({ email, password, userType, mode });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md p-6 animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-primary rounded-lg shadow-glow">
              <Bus className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-xl font-bold">
              {mode === "login" ? "Welcome Back" : "Join Matrusri Bus Tracking"}
            </h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>I am a:</Label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setUserType("student")}
                className={`flex-1 p-3 rounded-lg border-2 transition-all duration-300 ${
                  userType === "student"
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-center gap-2 justify-center">
                  <User className="h-4 w-4" />
                  <span className="font-medium">Student</span>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setUserType("driver")}
                className={`flex-1 p-3 rounded-lg border-2 transition-all duration-300 ${
                  userType === "driver"
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-center gap-2 justify-center">
                  <Key className="h-4 w-4" />
                  <span className="font-medium">Driver</span>
                </div>
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full">
            {mode === "login" ? "Sign In" : "Create Account"}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <span className="text-sm text-muted-foreground">
            {mode === "login" ? "Don't have an account?" : "Already have an account?"}
          </span>
          <Button variant="link" onClick={onModeSwitch} className="ml-1 p-0">
            {mode === "login" ? "Sign up" : "Sign in"}
          </Button>
        </div>
      </Card>
    </div>
  );
}