
/**
 * Service for storing user queries in Azure
 */

import { getAzureAIConfig } from "./azure-ai-client";
import { getCurrentUser } from "./auth-service";

interface QueryRecord {
  id: string;
  userId: string;
  userEmail: string | null;
  userName: string | null;
  query: string;
  response: string;
  timestamp: string;
}

export const storeQueryInAzure = async (
  query: string, 
  response: string
): Promise<boolean> => {
  try {
    const user = getCurrentUser();
    if (!user) {
      console.error("Cannot store query: User not authenticated");
      return false;
    }

    const config = getAzureAIConfig();
    if (!config) {
      console.error("Cannot store query: Azure AI not configured");
      return false;
    }

    // Extract the base URL from the endpoint (removing any path components)
    const endpointUrl = new URL(config.endpoint);
    const baseApiUrl = `${endpointUrl.protocol}//${endpointUrl.host}`;
    
    // Use the base URL for your Azure backend API
    const queryStorageUrl = `${baseApiUrl}/api/queries`;

    const queryRecord: QueryRecord = {
      id: Date.now().toString(),
      userId: user.id,
      userEmail: user.email,
      userName: user.name,
      query,
      response,
      timestamp: new Date().toISOString()
    };

    const apiResponse = await fetch(queryStorageUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': config.apiKey,
      },
      body: JSON.stringify(queryRecord),
    });

    if (!apiResponse.ok) {
      throw new Error(`Failed to store query in Azure: ${apiResponse.status}`);
    }

    console.log("Query successfully stored in Azure");
    return true;
  } catch (error) {
    console.error("Error storing query in Azure:", error);
    return false;
  }
};

// Retrieve user's query history
export const getUserQueryHistory = async (limit: number = 20): Promise<QueryRecord[]> => {
  try {
    const user = getCurrentUser();
    if (!user) {
      console.error("Cannot retrieve queries: User not authenticated");
      return [];
    }

    const config = getAzureAIConfig();
    if (!config) {
      console.error("Cannot retrieve queries: Azure AI not configured");
      return [];
    }

    // Extract the base URL from the endpoint (removing any path components)
    const endpointUrl = new URL(config.endpoint);
    const baseApiUrl = `${endpointUrl.protocol}//${endpointUrl.host}`;
    
    // Use the base URL for your Azure backend API
    const userQueriesUrl = `${baseApiUrl}/api/queries/user/${user.id}?limit=${limit}`;

    const response = await fetch(userQueriesUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'api-key': config.apiKey,
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to retrieve queries from Azure: ${response.status}`);
    }

    const data = await response.json();
    return data as QueryRecord[];
  } catch (error) {
    console.error("Error retrieving queries from Azure:", error);
    return [];
  }
};
