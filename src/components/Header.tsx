import { Bus, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();
  return (
    <header className="bg-card border-b border-border shadow-soft">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-primary rounded-lg shadow-glow">
              <Bus className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Matrusri Bus Tracking</h1>
              <p className="text-sm text-muted-foreground">Real-time bus tracking</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => navigate("/login")} className="flex items-center gap-2">
              <LogIn className="h-4 w-4" />
              Login
            </Button>
            <Button onClick={() => navigate("/signup")} className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}