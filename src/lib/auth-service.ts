
/**
 * Authentication service for handling Google authentication and user management with Azure
 */

import { getAzureAIConfig } from "./azure-ai-client";
import { toast } from "sonner";

export interface AuthUser {
  id: string;
  name: string | null;
  email: string | null;
  photoUrl: string | null;
}

// Store the current authenticated user
let currentUser: AuthUser | null = null;

// Initialize the Google Auth API
export const initGoogleAuth = async (): Promise<void> => {
  // Load the Google Sign-In API script
  const script = document.createElement('script');
  script.src = 'https://accounts.google.com/gsi/client';
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);

  return new Promise((resolve) => {
    script.onload = () => {
      resolve();
    };
  });
};

// Sign in with Google
export const signInWithGoogle = async (): Promise<AuthUser> => {
  return new Promise((resolve, reject) => {
    try {
      // Make sure the Google API is loaded
      if (!window.google) {
        throw new Error("Google API not loaded. Please try again.");
      }

      // Get Azure config to determine where to store user data
      const azureConfig = getAzureAIConfig();
      if (!azureConfig) {
        throw new Error("Azure AI configuration not found. Please configure your Azure AI settings first.");
      }

      // Initialize Google Sign-In
      window.google.accounts.id.initialize({
        client_id: '255507081378-014jvpvdj6di2sqc4pa0s1aqk8c9gs8k.apps.googleusercontent.com', // Replace with your Google Client ID
        callback: async (response: any) => {
          if (response.credential) {
            // Decode the JWT token to get user information
            const payload = JSON.parse(atob(response.credential.split('.')[1]));
            
            const user: AuthUser = {
              id: payload.sub,
              name: payload.name,
              email: payload.email,
              photoUrl: payload.picture
            };

            // Store user in Azure via your backend
            try {
              await storeUserInAzure(user, azureConfig);
              // Set current user and save to localStorage
              currentUser = user;
              localStorage.setItem('auth_user', JSON.stringify(user));
              resolve(user);
            } catch (error) {
              reject(error);
            }
          } else {
            reject(new Error("Google authentication failed. Please try again."));
          }
        },
        auto_select: false
      });

      // Prompt the user to select their Google account
      window.google.accounts.id.prompt();
    } catch (error) {
      reject(error);
    }
  });
};

// Store user data in Azure
const storeUserInAzure = async (user: AuthUser, azureConfig: any): Promise<void> => {
  // Extract the base URL from the endpoint (removing any path components)
  const endpointUrl = new URL(azureConfig.endpoint);
  const baseApiUrl = `${endpointUrl.protocol}//${endpointUrl.host}`;
  
  // Create a user storage endpoint - use /api prefix for Azure Functions
  const userStorageUrl = `${baseApiUrl}/api/users`;

  try {
    // Check if the user already exists
    const checkResponse = await fetch(`${userStorageUrl}/${user.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'api-key': azureConfig.apiKey,
      },
    });
    
    // If the user exists, update their data
    if (checkResponse.ok) {
      const response = await fetch(`${userStorageUrl}/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'api-key': azureConfig.apiKey,
        },
        body: JSON.stringify({
          ...user,
          lastLogin: new Date().toISOString()
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update user in Azure: ${response.status}`);
      }
      
      console.log("User data updated in Azure");
    } else {
      // If the user doesn't exist, create a new record
      const response = await fetch(userStorageUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': azureConfig.apiKey,
        },
        body: JSON.stringify({
          ...user,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to store user in Azure: ${response.status}`);
      }
      
      console.log("New user created in Azure");
    }
  } catch (error) {
    console.error("Error storing user in Azure:", error);
    toast.error("Error connecting to Azure backend");
    throw error;
  }
};

// Sign out the current user
export const signOut = (): void => {
  currentUser = null;
  localStorage.removeItem('auth_user');
};

// Get the current user
export const getCurrentUser = (): AuthUser | null => {
  if (currentUser) return currentUser;
  
  // Check if user is stored in localStorage
  const storedUser = localStorage.getItem('auth_user');
  if (storedUser) {
    currentUser = JSON.parse(storedUser);
    return currentUser;
  }
  
  return null;
};

// Check if the user is authenticated
export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};

// Define the global Google API type
declare global {
  interface Window {
    google: any;
  }
}
