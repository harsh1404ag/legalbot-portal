
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getAzureAIConfig, saveAzureAIConfig } from "@/lib/azure-ai-client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export function AzureAIConfigForm() {
  const [endpoint, setEndpoint] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [deploymentName, setDeploymentName] = useState("");
  const [isConfigured, setIsConfigured] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const config = getAzureAIConfig();
    if (config) {
      setEndpoint(config.endpoint);
      setApiKey(config.apiKey);
      setDeploymentName(config.deploymentName);
      setIsConfigured(true);
    }
  }, []);

  const handleSave = () => {
    saveAzureAIConfig({
      endpoint,
      apiKey,
      deploymentName,
    });
    setIsConfigured(true);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-xs">
          {isConfigured ? "Update Azure AI Config" : "Configure Azure AI"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Azure AI Configuration</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="endpoint">Azure OpenAI Endpoint</Label>
            <Input
              id="endpoint"
              placeholder="https://your-resource-name.openai.azure.com"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="api-key">API Key</Label>
            <Input
              id="api-key"
              type="password"
              placeholder="Your Azure OpenAI API Key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="deployment">Deployment Name</Label>
            <Input
              id="deployment"
              placeholder="Your model deployment name"
              value={deploymentName}
              onChange={(e) => setDeploymentName(e.target.value)}
            />
          </div>
          <Button onClick={handleSave} className="mt-2">Save Configuration</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
