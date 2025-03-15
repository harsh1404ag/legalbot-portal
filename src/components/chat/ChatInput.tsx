
import { Settings } from "lucide-react";
import { AIInputWithLoading } from "@/components/ui/ai-input-with-loading";
import { AzureAIConfigForm } from "@/components/ui/azure-ai-config-form";

interface ChatInputProps {
  isAzureConfigured: boolean;
  handleSendMessage: (inputText: string) => Promise<void>;
}

export function ChatInput({ isAzureConfigured, handleSendMessage }: ChatInputProps) {
  return (
    <div className="p-4 border-t border-neutral-800 bg-neutral-900/80">
      <div className="max-w-3xl mx-auto">
        {!isAzureConfigured && (
          <div className="mb-4 p-3 bg-yellow-900/30 border border-yellow-600/50 rounded-md text-yellow-300 text-sm">
            <p className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Please configure your Azure AI settings to start chatting.
            </p>
            <div className="mt-2">
              <AzureAIConfigForm />
            </div>
          </div>
        )}
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
  );
}
