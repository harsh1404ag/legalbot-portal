
/**
 * Utility functions for interacting with Azure AI Foundry
 */

interface AzureAIConfig {
  endpoint: string;
  apiKey: string;
  deploymentName: string;
}

interface AzureAIMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface AzureAIRequestBody {
  messages: AzureAIMessage[];
  temperature?: number;
  top_p?: number;
  max_tokens?: number;
  stream?: boolean;
}

interface AzureAIResponseChoice {
  message: {
    role: string;
    content: string;
  };
  finish_reason: string;
}

interface AzureAIResponse {
  id: string;
  choices: AzureAIResponseChoice[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

// Store config in localStorage to avoid hardcoding API keys
export const saveAzureAIConfig = (config: AzureAIConfig): void => {
  localStorage.setItem('azureAIConfig', JSON.stringify(config));
};

export const getAzureAIConfig = (): AzureAIConfig | null => {
  const configStr = localStorage.getItem('azureAIConfig');
  return configStr ? JSON.parse(configStr) : null;
};

export const sendMessageToAzureAI = async (
  messages: AzureAIMessage[],
  options: { temperature?: number; maxTokens?: number } = {}
): Promise<string> => {
  const config = getAzureAIConfig();
  
  if (!config) {
    throw new Error("Azure AI configuration not found. Please configure your Azure AI settings.");
  }

  const { endpoint, apiKey, deploymentName } = config;
  const url = `${endpoint}/openai/deployments/${deploymentName}/chat/completions?api-version=2023-05-15`;
  
  const requestBody: AzureAIRequestBody = {
    messages,
    temperature: options.temperature ?? 0.7,
    max_tokens: options.maxTokens ?? 1000,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Azure AI request failed: ${response.status} ${errorText}`);
    }

    const data = await response.json() as AzureAIResponse;
    return data.choices[0]?.message.content || "No response received";
  } catch (error) {
    console.error("Error calling Azure AI:", error);
    throw error;
  }
};
