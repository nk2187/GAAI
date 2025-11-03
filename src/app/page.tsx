'use client';

import { useState } from 'react';
import { History, Sparkles, LineChart, Palette, Bot } from 'lucide-react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GeneratorTab from '@/components/generator-tab';
import HistoryTab from '@/components/history-tab';
import CollaborationTab from '@/components/collaboration-tab';
import type { GenerateInstagramCaptionOutput } from '@/ai/flows/generate-instagram-caption';
import ArtTrendsTab from '@/components/art-trends-tab';
import ArtStatsTab from '@/components/art-stats-tab';
import AdSenseAd from '@/components/adsense-ad';

export type GenerationResult = GenerateInstagramCaptionOutput & {
  id: string;
  imageUrl: string;
  artworkStyle?: string;
  artworkTheme?: string;
  artworkMood?: string;
  artworkColor?: string;
  timestamp: number;
  captionStyle: string;
};

export default function Home() {
  const [history, setHistory] = useState<GenerationResult[]>([]);
  
  const addToHistory = (result: GenerationResult) => {
    setHistory(prev => [result, ...prev]);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      
      {/* ✅ Google AdSense Ad Unit */}
      <div className="my-4 flex justify-center">
        <AdSenseAd adClient="ca-pub-2287972324112408" adSlot="2016751291" />
      </div>

      <Tabs defaultValue="generator" className="w-full">
        <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto bg-muted/60">
          <TabsTrigger value="generator">
            <Sparkles className="mr-2 h-4 w-4" />
            Generator
          </TabsTrigger>
          <TabsTrigger value="history">
            <History className="mr-2 h-4 w-4" />
            History
          </TabsTrigger>
          <TabsTrigger value="trends">
            <LineChart className="mr-2 h-4 w-4" />
            Trends
          </TabsTrigger>
          <TabsTrigger value="stats">
            <Palette className="mr-2 h-4 w-4" />
            Stats
          </TabsTrigger>
        </TabsList>

        <TabsContent value="generator">
          <GeneratorTab onGenerated={addToHistory} />
        </TabsContent>
        <TabsContent value="history">
          <HistoryTab history={history} setHistory={setHistory} />
        </TabsContent>
        <TabsContent value="trends">
            <ArtTrendsTab />
        </TabsContent>
        <TabsContent value="stats">
            <ArtStatsTab history={history} />
        </TabsContent>
      </Tabs>

      <CollaborationTab />
    </div>
  );
}
