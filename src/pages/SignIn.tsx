
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { initGoogleAuth, signInWithGoogle, isAuthenticated } from "@/lib/auth-service";
import { getAzureAIConfig } from "@/lib/azure-ai-client";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [googleInitialized, setGoogleInitialized] = useState(false);
  const navigate = useNavigate();

  // Initialize Google authentication
  useEffect(() => {
    const initAuth = async () => {
      try {
        await initGoogleAuth();
        setGoogleInitialized(true);
      } catch (error) {
        console.error("Failed to initialize Google auth:", error);
        toast.error("Failed to initialize Google authentication");
      }
    };

    initAuth();

    // Redirect if already authenticated
    if (isAuthenticated()) {
      navigate("/chat");
    }
  }, [navigate]);

  // Check if Azure AI is configured
  useEffect(() => {
    const azureConfig = getAzureAIConfig();
    if (!azureConfig) {
      toast.warning("Please configure Azure AI settings before signing in", {
        duration: 5000,
      });
    }
  }, []);

  const handleGoogleSignIn = async () => {
    if (!googleInitialized) {
      toast.error("Google authentication is still initializing. Please try again.");
      return;
    }

    const azureConfig = getAzureAIConfig();
    if (!azureConfig) {
      toast.error("Please configure Azure AI settings before signing in");
      return;
    }

    setIsLoading(true);
    try {
      await signInWithGoogle();
      toast.success("Successfully signed in with Google!");
      navigate("/chat");
    } catch (error) {
      console.error("Google sign-in error:", error);
      toast.error("Failed to sign in with Google. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // This is a placeholder for email/password auth
    // In a real implementation, you would validate against your Azure backend
    toast.error("Email/password authentication not implemented. Please use Google Sign-In.");
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <div className="flex-1 flex justify-center items-center px-4 py-12">
        <div className="w-full max-w-md glass-morphism rounded-2xl p-8 animate-fade-in">
          <div className="text-center mb-8">
            <Link to="/" className="inline-block">
              <h1 className="text-3xl font-bold metallic-text">LEXIA</h1>
            </Link>
            <p className="text-gray-400 mt-2">Sign in to your account</p>
          </div>
          
          <Button
            type="button"
            variant="outline"
            className="w-full flex items-center justify-center gap-2 mb-6"
            onClick={handleGoogleSignIn}
            disabled={isLoading || !googleInitialized}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
            </svg>
            {isLoading ? "Signing in..." : "Sign in with Google"}
          </Button>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-black px-2 text-gray-500">Or continue with email</span>
            </div>
          </div>
          
          <form onSubmit={handleEmailSignIn} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="bg-transparent border-gray-700 focus:border-gray-500"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link 
                  to="/forgot-password" 
                  className="text-xs text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="bg-transparent border-gray-700 focus:border-gray-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In with Email"}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
