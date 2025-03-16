
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MessageList } from "@/components/chat/MessageList";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { ChatInput } from "@/components/chat/ChatInput";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { BackgroundParticles } from "@/components/chat/BackgroundParticles";
import { getAzureAIConfig, sendMessageToAzureAI } from "@/lib/azure-ai-client";
import { isAuthenticated, getCurrentUser } from "@/lib/auth-service";
import { storeQueryInAzure } from "@/lib/query-storage-service";
import { toast } from "sonner";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant" | "system";
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
  const [loading, setLoading] = useState(false);
  const [isAzureConfigured, setIsAzureConfigured] = useState(false);
  const navigate = useNavigate();
  
  // Check authentication and Azure AI configuration
  useEffect(() => {
    // Redirect to sign in if not authenticated
    if (!isAuthenticated()) {
      toast.error("Please sign in to access the chat");
      navigate("/signin");
      return;
    }

    // Check Azure configuration
    const config = getAzureAIConfig();
    setIsAzureConfigured(!!config);
    
    if (!config) {
      toast.warning("Please configure Azure AI settings to use the chat", {
        duration: 5000,
      });
    }
    
    // Get user info and set welcome message
    const user = getCurrentUser();
    if (user) {
      setMessages([
        {
          id: "1",
          content: `Hello ${user.name || "there"}! I'm your LEXIA AI legal assistant. How can I help you with your legal questions today?`,
          role: "assistant",
          timestamp: new Date(),
        },
      ]);
    }
  }, [navigate]);

  const handleSendMessage = async (inputText: string) => {
    if (!inputText.trim()) return;

    // Check if Azure AI is configured
    const azureConfig = getAzureAIConfig();
    if (!azureConfig) {
      toast.error("Please configure Azure AI settings first");
      return;
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputText,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      // Get user info for personalized context
      const user = getCurrentUser();
      
      // Format messages for Azure AI
      const promptMessages = messages
        .slice(-10) // Limit context window
        .concat(userMessage)
        .map(msg => ({
          role: msg.role,
          content: msg.content
        }));

      // Add a system message if there isn't one
      if (!promptMessages.some(msg => msg.role === "system")) {
        promptMessages.unshift({
          role: "system",
          content: `You are LEXIA, a legal assistant AI that provides helpful, accurate, and thoughtful information about legal topics. ${
            user ? `You are speaking with ${user.name || 'a user'} (${user.email || 'authenticated user'}).` : ''
          }`
        });
      }

      // Send request to Azure AI
      const aiResponse = await sendMessageToAzureAI(promptMessages);
      
      // Add AI response to messages
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        role: "assistant",
        timestamp: new Date(),
      };

      // Store the query and response in Azure
      await storeQueryInAzure(inputText, aiResponse);

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      toast.error("Failed to get AI response. Please check your Azure AI configuration.");
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I encountered an error processing your request. Please check your Azure AI configuration and try again.",
        role: "assistant",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-black">
      <BackgroundParticles />
      
      <ChatSidebar />
      
      <div className="flex-1 flex flex-col">
        <ChatHeader />
        
        <main className="flex-1 overflow-auto p-4 bg-neutral-900/50">
          <MessageList messages={messages} loading={loading} />
        </main>
        
        <ChatInput 
          isAzureConfigured={isAzureConfigured}
          handleSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
}
