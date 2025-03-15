
import { Link } from "react-router-dom";
import { AzureAIConfigForm } from "@/components/ui/azure-ai-config-form";

export function ChatHeader() {
  return (
    <header className="flex items-center justify-between p-4 border-b border-neutral-800 bg-neutral-900/80">
      <h1 className="text-xl font-bold text-white">LEXIA AI</h1>
      <div className="md:hidden">
        <AzureAIConfigForm />
      </div>
    </header>
  );
}
