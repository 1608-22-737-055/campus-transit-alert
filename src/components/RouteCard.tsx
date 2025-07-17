import { Clock, MapPin, User } from "lucide-react";
import { StatusBadge, type BusStatus } from "./StatusBadge";
import { Card } from "@/components/ui/card";

interface RouteCardProps {
  routeName: string;
  destination: string;
  status: BusStatus;
  lastUpdate: string;
  driver?: string;
  estimatedTime?: string;
  message?: string;
}

export function RouteCard({
  routeName,
  destination,
  status,
  lastUpdate,
  driver,
  estimatedTime,
  message
}: RouteCardProps) {
  return (
    <Card className="p-6 hover:shadow-medium transition-all duration-300 animate-fade-in">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{routeName}</h3>
          <div className="flex items-center gap-1 text-muted-foreground mt-1">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{destination}</span>
          </div>
        </div>
        <StatusBadge status={status} />
      </div>

      <div className="space-y-2 text-sm text-muted-foreground">
        {estimatedTime && (
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Est. arrival: {estimatedTime}</span>
          </div>
        )}
        
        {driver && (
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Driver: {driver}</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>Last updated: {lastUpdate}</span>
        </div>
      </div>

      {message && (
        <div className="mt-4 p-3 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>
      )}
    </Card>
  );
}