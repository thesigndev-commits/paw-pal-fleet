import { cn } from "@/lib/utils";
import { AppAvatar } from "./AppAvatar";
import { formatDistanceToNow } from "date-fns";

interface NotificationItemProps {
  title: string;
  message: string;
  timestamp: string;
  type: "driver-matched" | "trip-started" | "eta-update" | "promo" | "system";
  isRead: boolean;
  onClick?: () => void;
  className?: string;
}

const typeIcons: Record<NotificationItemProps["type"], string> = {
  "driver-matched": "🚗",
  "trip-started": "🐾",
  "eta-update": "⏱️",
  "promo": "🎉",
  "system": "📢",
};

export function NotificationItem({
  title,
  message,
  timestamp,
  type,
  isRead,
  onClick,
  className,
}: NotificationItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-start gap-3 p-4 text-left transition-colors hover:bg-muted/50",
        !isRead && "bg-primary/5",
        className
      )}
    >
      <div className="shrink-0 h-10 w-10 rounded-full bg-muted flex items-center justify-center text-lg">
        {typeIcons[type]}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className={cn("text-sm font-semibold truncate", !isRead && "text-primary")}>
            {title}
          </h4>
          {!isRead && (
            <span className="shrink-0 h-2 w-2 rounded-full bg-primary" />
          )}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-0.5">{message}</p>
        <span className="text-xs text-muted-foreground mt-1">
          {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
        </span>
      </div>
    </button>
  );
}

interface WalletItemProps {
  type: "topup" | "payment" | "refund" | "cashback";
  amount: number;
  description: string;
  timestamp: string;
  status: "pending" | "completed" | "failed";
  className?: string;
}

const walletIcons: Record<WalletItemProps["type"], string> = {
  topup: "💳",
  payment: "🚗",
  refund: "↩️",
  cashback: "🎁",
};

export function WalletItem({
  type,
  amount,
  description,
  timestamp,
  status,
  className,
}: WalletItemProps) {
  const isPositive = amount > 0;
  
  return (
    <div className={cn("flex items-center gap-3 p-4", className)}>
      <div className="shrink-0 h-10 w-10 rounded-full bg-muted flex items-center justify-center text-lg">
        {walletIcons[type]}
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium truncate">{description}</h4>
        <span className="text-xs text-muted-foreground">
          {new Date(timestamp).toLocaleDateString()}
        </span>
      </div>
      
      <div className="text-right">
        <p className={cn(
          "text-sm font-bold",
          isPositive ? "text-success" : "text-foreground"
        )}>
          {isPositive ? "+" : ""}฿{Math.abs(amount).toLocaleString()}
        </p>
        <span className={cn(
          "text-xs capitalize",
          status === "completed" ? "text-success" : 
          status === "pending" ? "text-warning" : "text-destructive"
        )}>
          {status}
        </span>
      </div>
    </div>
  );
}
