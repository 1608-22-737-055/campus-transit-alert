import { cn } from "@/lib/utils";

export type BusStatus = "on-time" | "delayed" | "cancelled" | "unknown";

interface StatusBadgeProps {
  status: BusStatus;
  className?: string;
}

const statusConfig = {
  "on-time": {
    label: "On Time",
    className: "bg-status-on-time text-white",
    icon: "🟢"
  },
  "delayed": {
    label: "Delayed",
    className: "bg-status-delayed text-white",
    icon: "🟡"
  },
  "cancelled": {
    label: "Cancelled",
    className: "bg-status-cancelled text-white",
    icon: "🔴"
  },
  "unknown": {
    label: "Unknown",
    className: "bg-status-unknown text-white",
    icon: "⚪"
  }
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <div className={cn(
      "inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium shadow-soft",
      config.className,
      className
    )}>
      <span>{config.icon}</span>
      <span>{config.label}</span>
    </div>
  );
}