
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, User, LogOut, PlusCircle, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { AIInputWithLoading } from "@/components/ui/ai-input-with-loading";
import { SparklesCore } from "@/components/ui/sparkles";

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

  const handleSendMessage = async (inputText: string) => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputText,
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

  return (
    <div className="flex h-screen bg-black">
      {/* Enhanced colorful background particles */}
      <div className="fixed inset-0 w-full h-full -z-10">
        <SparklesCore
          id="tsparticlesblue"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={40}
          className="w-full h-full"
          particleColor="#0EA5E9" // Blue
          speed={0.5}
        />
      </div>
      
      <div className="fixed inset-0 w-full h-full -z-10">
        <SparklesCore
          id="tsparticlesgreen"
          background="transparent"
          minSize={0.4}
          maxSize={1.2}
          particleDensity={30}
          className="w-full h-full"
          particleColor="#10B981" // Green
          speed={0.3}
        />
      </div>
      
      <div className="fixed inset-0 w-full h-full -z-10">
        <SparklesCore
          id="tsparticlesyellow"
          background="transparent"
          minSize={0.5}
          maxSize={1.3}
          particleDensity={25}
          className="w-full h-full"
          particleColor="#F59E0B" // Yellow
          speed={0.4}
        />
      </div>
      
      <div className="fixed inset-0 w-full h-full -z-10">
        <SparklesCore
          id="tsparticlesred"
          background="transparent"
          minSize={0.3}
          maxSize={1.1}
          particleDensity={30}
          className="w-full h-full"
          particleColor="#EF4444" // Red
          speed={0.6}
        />
      </div>
      
      <div className="fixed inset-0 w-full h-full -z-10">
        <SparklesCore
          id="tsparticlesviolet"
          background="transparent"
          minSize={0.2}
          maxSize={1.0}
          particleDensity={15}
          className="w-full h-full"
          particleColor="#8B5CF6" // Violet
          speed={0.7}
        />
      </div>
      
      {/* Added more colorful stars */}
      <div className="fixed inset-0 w-full h-full -z-10">
        <SparklesCore
          id="tsparticlesorange"
          background="transparent"
          minSize={0.4}
          maxSize={1.0}
          particleDensity={20}
          className="w-full h-full"
          particleColor="#F97316" // Orange
          speed={0.45}
        />
      </div>
      
      <div className="fixed inset-0 w-full h-full -z-10">
        <SparklesCore
          id="tsparticlesteal"
          background="transparent"
          minSize={0.3}
          maxSize={0.9}
          particleDensity={18}
          className="w-full h-full"
          particleColor="#14B8A6" // Teal
          speed={0.55}
        />
      </div>
      
      <div className="fixed inset-0 w-full h-full -z-10">
        <SparklesCore
          id="tsparticleslime"
          background="transparent"
          minSize={0.2}
          maxSize={0.8}
          particleDensity={22}
          className="w-full h-full"
          particleColor="#84CC16" // Lime
          speed={0.5}
        />
      </div>
      
      <div className="fixed inset-0 w-full h-full -z-10">
        <SparklesCore
          id="tsparticlespink"
          background="transparent"
          minSize={0.3}
          maxSize={1.0}
          particleDensity={15}
          className="w-full h-full"
          particleColor="#EC4899" // Pink
          speed={0.35}
        />
      </div>
      
      {/* Gradient overlay for better readability */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/30 via-black/70 to-black/90 -z-10"></div>
      
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col bg-neutral-900 border-r border-neutral-800 z-10">
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
        <main className="flex-1 overflow-auto p-4 bg-neutral-900/50">
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
        </main>
        
        <div className="p-4 border-t border-neutral-800 bg-neutral-900/80">
          <div className="max-w-3xl mx-auto">
            <AIInputWithLoading 
              placeholder="Ask a legal question..."
              onSubmit={handleSendMessage}
              loadingDuration={1500}
              className="mb-2"
            />
            <p className="text-xs text-gray-500 mt-2 text-center">
              LEXIA provides legal information, not legal advice. Always consult with a qualified attorney for legal advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
