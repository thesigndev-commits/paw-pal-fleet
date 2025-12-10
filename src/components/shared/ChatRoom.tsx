import { useState } from "react";
import { ArrowLeft, Send, Image, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppAvatar } from "@/components/ui/AppAvatar";
import { ChatBubble, QuickActionButton } from "@/components/ui/ChatBubble";
import { ChatInputBar } from "@/components/ui/ChatInputBar";
import { mockMessages } from "@/lib/mockData";

interface ChatRoomProps {
  chatId: string;
  participantName: string;
  participantAvatar?: string;
  userRole: "customer" | "driver" | "admin";
  onBack: () => void;
}

export function ChatRoom({ chatId, participantName, participantAvatar, userRole, onBack }: ChatRoomProps) {
  const [messages, setMessages] = useState(mockMessages);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (content: string) => {
    const newMessage = {
      id: `m${messages.length + 1}`,
      conversationId: chatId,
      senderId: "me",
      senderName: "You",
      senderAvatar: "",
      content,
      type: "text" as const,
      timestamp: new Date().toISOString(),
      status: "sent" as const,
    };
    
    setMessages([...messages, newMessage]);

    // Simulate typing indicator
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      // Simulate response
      const response = {
        id: `m${messages.length + 2}`,
        conversationId: chatId,
        senderId: "other",
        senderName: participantName,
        senderAvatar: participantAvatar || "",
        content: "Got it! Thanks for letting me know. 🐾",
        type: "text" as const,
        timestamp: new Date().toISOString(),
        status: "delivered" as const,
      };
      setMessages((prev) => [...prev, response]);
    }, 2000);
  };

  const handleQuickAction = (action: string) => {
    handleSend(action);
  };

  const quickActions = userRole === "driver" 
    ? ["I'm here", "Arrive in 5 min", "Picking up now"]
    : ["On my way", "At the pickup point", "Thanks!"];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border bg-card flex items-center gap-4">
        <Button variant="ghost" size="iconSm" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <AppAvatar src={participantAvatar} fallback={participantName.charAt(0)} size="md" />
        <div className="flex-1">
          <p className="font-bold">{participantName}</p>
          {isTyping ? (
            <p className="text-xs text-primary">Typing...</p>
          ) : (
            <p className="text-xs text-muted-foreground">Online</p>
          )}
        </div>
        <Button variant="ghost" size="iconSm">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatBubble
            key={message.id}
            content={message.content}
            senderName={message.senderName}
            senderAvatar={message.senderAvatar}
            timestamp={message.timestamp}
            isOwn={message.senderId === "me" || message.senderId === "c1"}
            status={message.status}
            type={message.type}
          />
        ))}
        
        {isTyping && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="flex gap-1">
              <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
            <span className="text-sm">{participantName} is typing...</span>
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div className="px-4 py-2 flex gap-2 overflow-x-auto">
        {quickActions.map((action) => (
          <QuickActionButton
            key={action}
            label={action}
            onClick={() => handleQuickAction(action)}
          />
        ))}
      </div>

      {/* Input */}
      <ChatInputBar
        onSend={handleSend}
        onAttachImage={() => {}}
        placeholder="Type a message..."
      />
    </div>
  );
}
