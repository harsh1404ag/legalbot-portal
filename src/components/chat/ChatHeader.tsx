
import { Link, useNavigate } from "react-router-dom";
import { AzureAIConfigForm } from "@/components/ui/azure-ai-config-form";
import { Button } from "@/components/ui/button";
import { getCurrentUser, signOut } from "@/lib/auth-service";
import { LogOut, Settings, User } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export function ChatHeader() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleSignOut = () => {
    signOut();
    toast.success("You have been signed out");
    navigate("/signin");
  };

  return (
    <header className="flex items-center justify-between p-4 border-b border-neutral-800 bg-neutral-900/80">
      <h1 className="text-xl font-bold text-white">LEXIA AI</h1>
      
      <div className="flex items-center gap-4">
        <div className="md:hidden">
          <AzureAIConfigForm />
        </div>
        
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                {user.photoUrl ? (
                  <img 
                    src={user.photoUrl} 
                    alt={user.name || "User"}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <User className="h-4 w-4" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled className="flex flex-col items-start">
                <span className="font-medium">{user.name || "User"}</span>
                <span className="text-xs text-gray-500">{user.email || ""}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => handleSignOut()} className="text-red-500">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        
        <div className="hidden md:block">
          <AzureAIConfigForm />
        </div>
      </div>
    </header>
  );
}
