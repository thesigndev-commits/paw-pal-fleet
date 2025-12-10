import { cn } from "@/lib/utils";
import { Input } from "./input";
import { Button } from "./button";
import { Send, Image, Smile } from "lucide-react";
import { useState } from "react";

interface ChatInputBarProps {
  onSend: (message: string) => void;
  onAttachImage?: () => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function ChatInputBar({
  onSend,
  onAttachImage,
  placeholder = "Type a message...",
  disabled = false,
  className,
}: ChatInputBarProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={cn("flex items-center gap-2 p-4 bg-card border-t border-border", className)}>
      {onAttachImage && (
        <Button variant="ghost" size="iconSm" onClick={onAttachImage} disabled={disabled}>
          <Image className="h-5 w-5" />
        </Button>
      )}
      
      <div className="flex-1 relative">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full h-11 px-4 pr-10 rounded-full bg-muted border-0 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
          <Smile className="h-5 w-5" />
        </button>
      </div>
      
      <Button 
        size="icon" 
        onClick={handleSend} 
        disabled={disabled || !message.trim()}
        className="rounded-full"
      >
        <Send className="h-5 w-5" />
      </Button>
    </div>
  );
}
