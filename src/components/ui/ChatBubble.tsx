import { cn } from "@/lib/utils";
import { AppAvatar } from "./AppAvatar";
import { Check, CheckCheck } from "lucide-react";

interface ChatBubbleProps {
  content: string;
  senderName?: string;
  senderAvatar?: string;
  timestamp: string;
  isOwn: boolean;
  status?: "sent" | "delivered" | "read";
  type?: "text" | "image" | "quick-action";
  className?: string;
}

export function ChatBubble({
  content,
  senderName,
  senderAvatar,
  timestamp,
  isOwn,
  status = "sent",
  type = "text",
  className,
}: ChatBubbleProps) {
  const formatTime = (ts: string) => {
    return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div
      className={cn(
        "flex gap-2 max-w-[85%]",
        isOwn ? "ml-auto flex-row-reverse" : "mr-auto",
        className
      )}
    >
      {!isOwn && (
        <AppAvatar src={senderAvatar} alt={senderName} size="sm" fallback={senderName?.charAt(0)} />
      )}
      
      <div className={cn("flex flex-col", isOwn ? "items-end" : "items-start")}>
        {!isOwn && senderName && (
          <span className="text-xs text-muted-foreground mb-1 px-2">{senderName}</span>
        )}
        
        <div
          className={cn(
            "rounded-2xl px-4 py-2.5 shadow-sm",
            isOwn
              ? "gradient-primary text-primary-foreground rounded-br-md"
              : "bg-muted text-foreground rounded-bl-md",
            type === "quick-action" && "bg-secondary border-2 border-primary"
          )}
        >
          {type === "image" ? (
            <img src={content} alt="Shared image" className="rounded-lg max-w-xs" />
          ) : (
            <p className="text-sm whitespace-pre-wrap">{content}</p>
          )}
        </div>
        
        <div className="flex items-center gap-1 mt-1 px-2">
          <span className="text-[10px] text-muted-foreground">{formatTime(timestamp)}</span>
          {isOwn && (
            <span className="text-muted-foreground">
              {status === "read" ? (
                <CheckCheck className="h-3 w-3 text-primary" />
              ) : status === "delivered" ? (
                <CheckCheck className="h-3 w-3" />
              ) : (
                <Check className="h-3 w-3" />
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

interface QuickActionButtonProps {
  label: string;
  onClick: () => void;
}

export function QuickActionButton({ label, onClick }: QuickActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-full border-2 border-primary text-primary text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
    >
      {label}
    </button>
  );
}
