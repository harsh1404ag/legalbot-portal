
import { useRef, useEffect } from "react";
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant" | "system";
  timestamp: Date;
}

interface MessageListProps {
  messages: Message[];
  loading: boolean;
}

export function MessageList({ messages, loading }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="max-w-3xl mx-auto">
      {messages.map((message) => (
        <div 
          key={message.id}
          className={cn(
            "mb-6 flex",
            message.role === "user" ? "justify-end" : "justify-start"
          )}
        >
          <div 
            className={cn(
              "flex gap-3 max-w-[80%]",
              message.role === "user" ? "flex-row-reverse" : "flex-row"
            )}
          >
            <div 
              className={cn(
                "flex h-8 w-8 rounded-full items-center justify-center",
                message.role === "user" ? "bg-blue-600" : "bg-neutral-700"
              )}
            >
              {message.role === "user" ? (
                <User className="h-5 w-5 text-white" />
              ) : (
                <Bot className="h-5 w-5 text-white" />
              )}
            </div>
            
            <div 
              className={cn(
                "rounded-lg px-4 py-2 shadow-md",
                message.role === "user" 
                  ? "bg-blue-600 text-white" 
                  : "bg-neutral-800/90 text-white glass-morphism"
              )}
            >
              <p className="text-sm">{message.content}</p>
              <div 
                className={cn(
                  "text-xs mt-1 opacity-70",
                  message.role === "user" ? "text-right" : "text-left"
                )}
              >
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {loading && (
        <div className="flex justify-start mb-6">
          <div className="flex gap-3">
            <div className="flex h-8 w-8 rounded-full items-center justify-center bg-neutral-700">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div className="rounded-lg px-4 py-2 bg-neutral-800/90 text-white glass-morphism">
              <div className="flex space-x-2">
                <div className="h-2 w-2 rounded-full bg-white animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div className="h-2 w-2 rounded-full bg-white animate-bounce" style={{ animationDelay: "300ms" }}></div>
                <div className="h-2 w-2 rounded-full bg-white animate-bounce" style={{ animationDelay: "600ms" }}></div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
}
