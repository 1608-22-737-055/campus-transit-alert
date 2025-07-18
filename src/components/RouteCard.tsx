import { useState } from "react";
import { Clock, MapPin, User, Bus } from "lucide-react";
import { StatusBadge, type BusStatus } from "./StatusBadge";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const [selectedStop, setSelectedStop] = useState<string>("");
  const [stopETA, setStopETA] = useState<string>("");

  // Parse stops from destination string
  const stops = destination.split(" → ");

  // Mock ETA calculation based on selected stop
  const calculateETA = (stop: string) => {
    const stopIndex = stops.indexOf(stop);
    if (stopIndex === -1) return "";
    
    // Mock calculation: base time + 3 minutes per stop
    const baseMinutes = 10;
    const etaMinutes = baseMinutes + (stopIndex * 3);
    const now = new Date();
    const eta = new Date(now.getTime() + etaMinutes * 60000);
    return eta.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleStopSelect = (stop: string) => {
    setSelectedStop(stop);
    setStopETA(calculateETA(stop));
  };

  // Calculate bus position based on status
  const getBusPosition = () => {
    const totalStops = stops.length;
    let position = 0;
    
    switch (status) {
      case "on-time":
        position = Math.floor(totalStops * 0.3); // 30% through route
        break;
      case "delayed":
        position = Math.floor(totalStops * 0.5); // 50% through route
        break;
      case "cancelled":
        position = 0; // Bus not moving
        break;
      case "unknown":
        position = Math.floor(totalStops * 0.2); // 20% through route
        break;
      default:
        position = 0;
    }
    
    return { position, percentage: (position / (totalStops - 1)) * 100 };
  };

  const busPosition = getBusPosition();
  const busPositionPercent = busPosition.percentage;
  const currentArea = stops[busPosition.position] || stops[0];
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

      <div className="space-y-3">
        {/* Route Visualization */}
        <div className="relative bg-muted/30 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <div className="text-xs text-muted-foreground">Current Route Progress</div>
            <div className="flex items-center gap-1 text-xs text-primary font-medium">
              <MapPin className="h-3 w-3" />
              <span>Currently at: {currentArea}</span>
            </div>
          </div>
          {/* Route Line */}
          <div className="relative h-2 bg-muted rounded-full">
            <div 
              className="absolute h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${busPositionPercent}%` }}
            />
            {/* Transparent Bus Icon */}
            <div 
              className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 transition-all duration-500"
              style={{ left: `${Math.max(8, Math.min(92, busPositionPercent))}%` }}
            >
              <div className="bg-primary/20 backdrop-blur-sm rounded-full p-1 shadow-sm">
                <Bus className="h-4 w-4 text-primary opacity-80" />
              </div>
            </div>
          </div>
          {/* Stop markers */}
          <div className="flex justify-between mt-1">
            {stops.slice(0, 3).map((stop, index) => (
              <div key={index} className="text-xs text-muted-foreground">
                {index === 0 ? stops[0] : index === 1 ? "..." : stops[stops.length - 1]}
              </div>
            ))}
          </div>
        </div>

        {/* Stop Selector */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Select Stop:</label>
          <Select onValueChange={handleStopSelect}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose your stop" />
            </SelectTrigger>
            <SelectContent>
              {stops.map((stop, index) => (
                <SelectItem key={index} value={stop}>
                  {stop}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* ETA Display */}
        {selectedStop && stopETA && (
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-primary" />
            <span className="text-foreground font-medium">
              ETA to {selectedStop}: {stopETA}
            </span>
          </div>
        )}

        <div className="space-y-2 text-sm text-muted-foreground">
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
      </div>

      {message && (
        <div className="mt-4 p-3 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>
      )}
    </Card>
  );
}