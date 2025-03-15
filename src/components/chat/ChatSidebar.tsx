
import { Link } from "react-router-dom";
import { LogOut, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AzureAIConfigForm } from "@/components/ui/azure-ai-config-form";

export function ChatSidebar() {
  return (
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
      
      <div className="p-4 border-t border-neutral-800 space-y-2">
        <AzureAIConfigForm />
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-2 text-red-400 hover:text-red-300 hover:bg-neutral-800"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </Button>
      </div>
    </div>
  );
}
