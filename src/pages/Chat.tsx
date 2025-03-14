
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, User, LogOut, PlusCircle, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your LEXIA AI legal assistant. How can I help you with your legal questions today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responseMessages = [
        "I've analyzed relevant case law and found three precedents that apply to your situation. The most applicable is Smith v. Jones (2019), which established...",
        "Based on current regulations, you have several options available. I recommend considering...",
        "Your contract clause appears to have a potential issue. According to legal standards in your jurisdiction...",
        "The statute of limitations for this type of claim is typically 3 years from the date of discovery, but there are exceptions that might apply in your case..."
      ];

      const randomResponse = responseMessages[Math.floor(Math.random() * responseMessages.length)];
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-screen bg-black">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col bg-neutral-900 border-r border-neutral-800">
        <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-white">LEXIA</Link>
          <Button variant="ghost" size="icon" className="rounded-full">
            <PlusCircle className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="flex-1 overflow-auto p-3 space-y-2">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-left text-sm text-gray-300 hover:bg-neutral-800"
          >
            <span className="truncate">Legal contract review</span>
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start text-left text-sm text-gray-300 hover:bg-neutral-800"
          >
            <span className="truncate">Copyright infringement case</span>
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start text-left text-sm text-gray-300 hover:bg-neutral-800"
          >
            <span className="truncate">Property dispute analysis</span>
          </Button>
        </div>
        
        <div className="p-4 border-t border-neutral-800">
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-2 text-red-400 hover:text-red-300 hover:bg-neutral-800"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </Button>
        </div>
      </div>
      
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-auto p-4">
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
                        : "bg-neutral-800 text-white"
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
                  <div className="rounded-lg px-4 py-2 bg-neutral-800 text-white">
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
        </main>
        
        <div className="p-4 border-t border-neutral-800 bg-neutral-900">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-end gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask a legal question..."
                className="min-h-10 resize-none bg-neutral-800 border-neutral-700 focus:border-neutral-600"
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={!input.trim() || loading}
                size="icon"
                className={input.trim() ? "bg-blue-600 hover:bg-blue-700" : ""}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              LEXIA provides legal information, not legal advice. Always consult with a qualified attorney for legal advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
