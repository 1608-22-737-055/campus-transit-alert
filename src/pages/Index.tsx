import { useState } from "react";
import { Header } from "@/components/Header";
import { RouteCard } from "@/components/RouteCard";
import { RefreshCw, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data for routes
const mockRoutes = [
  {
    id: 1,
    routeName: "Route A - Ameerpet to College",
    destination: "Ameerpet → Punjagutta → Irrum Manzil → Khairatabad → Lakdi Ka Pul → Nampally → Osmania Medical College → Malakpet → Chanchalguda → Campus",
    status: "on-time" as const,
    lastUpdate: "2 mins ago",
    driver: "Abhiram",
    estimatedTime: "15:30",
    message: ""
  },
  {
    id: 2,
    routeName: "Route B - Uppal to College",
    destination: "Uppal → Nagole → Supraja Hospital → Kamineni Hospital → LB Nagar → Victoria Memorial → Chitanayapuri → Dilsuknagar → Musarambagh → Campus",
    status: "delayed" as const,
    lastUpdate: "5 mins ago",
    driver: "Saketh",
    estimatedTime: "15:45",
    message: "Heavy traffic near Uppal - 10 minute delay expected"
  },
  {
    id: 3,
    routeName: "Route C - Secunderabad to College",
    destination: "Secunderabad → Gandhi Hospital → Musheerabad → RTC x Roads → Chikkadpally → Narayanguda → Sultan Bazar → Malakpet → Chanchalguda → Campus",
    status: "cancelled" as const,
    lastUpdate: "1 hour ago",
    driver: "Anudeep",
    estimatedTime: "",
    message: "Bus breakdown - maintenance team dispatched. Alternative transport arranged."
  },
  {
    id: 4,
    routeName: "Route D - Nacharam to College",
    destination: "Nacharam → Habsiguda → Tarnaka → OU → Ramnagar → DD Colony → Amberpet → Ali Cafe → Musarambagh → Campus",
    status: "on-time" as const,
    lastUpdate: "30 secs ago",
    driver: "Mohan",
    estimatedTime: "15:25",
    message: ""
  }
];

const Index = () => {
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [routes, setRoutes] = useState(mockRoutes);

  const handleRefresh = () => {
    // Simulate fetching updated data
    setLastRefresh(new Date());
    // In a real app, this would fetch from an API
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Live Bus Tracking
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Real-time updates for all campus transportation routes
            </p>
            
            <div className="flex items-center justify-center gap-4 mb-6">
              <Button 
                variant="outline" 
                onClick={handleRefresh}
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                Last updated: {lastRefresh.toLocaleTimeString()}
              </div>
            </div>
          </div>

          {/* Routes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {routes.map((route, index) => (
              <div 
                key={route.id}
                style={{ animationDelay: `${index * 100}ms` }}
                className="animate-fade-in"
              >
                <RouteCard {...route} />
              </div>
            ))}
          </div>

          {/* Status Summary */}
          <div className="mt-12 p-6 bg-card rounded-lg border border-border shadow-soft">
            <h2 className="text-xl font-semibold mb-4">System Status</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-status-on-time">2</div>
                <div className="text-sm text-muted-foreground">On Time</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-status-delayed">1</div>
                <div className="text-sm text-muted-foreground">Delayed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-status-cancelled">1</div>
                <div className="text-sm text-muted-foreground">Cancelled</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">4</div>
                <div className="text-sm text-muted-foreground">Total Routes</div>
              </div>
            </div>
          </div>

          {/* Emergency Notice */}
          <div className="mt-6 p-4 bg-gradient-warning rounded-lg text-white">
            <p className="text-center font-medium">
              📢 Weather Advisory: Light rain expected. Buses may experience minor delays.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
