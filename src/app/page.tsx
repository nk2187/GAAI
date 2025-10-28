'use client';

import { useState } from 'react';
import { Instagram, History, Sparkles } from 'lucide-react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GeneratorTab from '@/components/generator-tab';
import HistoryTab from '@/components/history-tab';
import CollaborationTab from '@/components/collaboration-tab';
import type { GenerateInstagramCaptionOutput } from '@/ai/flows/generate-instagram-caption';

export type GenerationResult = GenerateInstagramCaptionOutput & {
  id: string;
  imageUrl: string;
  artworkStyle?: string;
  artworkTheme?: string;
  artworkMood?: string;
  artworkColor?: string;
  timestamp: number;
};

export default function Home() {
  const [history, setHistory] = useState<GenerationResult[]>([]);
  
  const addToHistory = (result: GenerationResult) => {
    setHistory(prev => [result, ...prev]);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Tabs defaultValue="generator" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-lg mx-auto bg-muted/60">
          <TabsTrigger value="generator">
            <Sparkles className="mr-2 h-4 w-4" />
            Generator
          </TabsTrigger>
          <TabsTrigger value="history">
            <History className="mr-2 h-4 w-4" />
            History
          </TabsTrigger>
          <TabsTrigger value="collab" className="flex items-center gap-1">
            Free Collaboration on <Instagram className="h-4 w-4" />
          </TabsTrigger>
        </TabsList>
        <TabsContent value="generator">
          <GeneratorTab onGenerated={addToHistory} />
        </TabsContent>
        <TabsContent value="history">
          <HistoryTab history={history} setHistory={setHistory} />
        </TabsContent>
        <TabsContent value="collab">
          <CollaborationTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
