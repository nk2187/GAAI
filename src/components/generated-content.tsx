'use client';

import { Copy, Check, Info, Clock, Hash, Lightbulb, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from "@/hooks/use-toast";
import type { GenerateInstagramCaptionOutput } from '@/ai/flows/generate-instagram-caption';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';


type GeneratedContentProps = {
  content: GenerateInstagramCaptionOutput | null;
  isLoading: boolean;
  error: string | null;
  onRegenerate: () => void;
};

const ContentSkeleton = () => (
    <div className="space-y-6">
        <div className="space-y-2">
            <Skeleton className="h-5 w-1/4" />
            <Skeleton className="h-24 w-full" />
        </div>
        <div className="space-y-2">
            <Skeleton className="h-5 w-1/4" />
            <Skeleton className="h-12 w-full" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
        </div>
        <Skeleton className="h-10 w-full" />
    </div>
);

type CopyState = 'caption' | 'hashtags' | null;

export default function GeneratedContent({ content, isLoading, error, onRegenerate }: GeneratedContentProps) {
  const [copied, setCopied] = useState<CopyState>(null);
  const { toast } = useToast();

  const handleCopy = (text: string, type: CopyState) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(type);
      toast({
        title: `Copied to clipboard!`,
        description: `${type?.charAt(0).toUpperCase() + type!.slice(1)} are ready to paste.`,
      })
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const renderContent = () => {
    if (isLoading) {
      return <ContentSkeleton />;
    }
    if (error) {
        return (
            <Alert variant="destructive">
                <Info className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )
    }
    if (!content) {
      return (
        <div className="text-center text-muted-foreground flex flex-col items-center justify-center h-full min-h-[300px]">
            <Info className="h-12 w-12 mb-4"/>
            <p className="font-semibold">Your AI-generated content will appear here.</p>
            <p className="text-sm">Upload an artwork to get started.</p>
        </div>
      );
    }
    return (
        <div className="space-y-6 animate-in fade-in-50 duration-500">
            <div>
                <h3 className="text-lg font-semibold font-headline mb-2">AI Captions</h3>
                <Tabs defaultValue="poetic" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 bg-muted/60">
                        <TabsTrigger value="poetic">Poetic</TabsTrigger>
                        <TabsTrigger value="funny">Funny</TabsTrigger>
                        <TabsTrigger value="deep">Deep</TabsTrigger>
                        <TabsTrigger value="minimalist">Minimalist</TabsTrigger>
                    </TabsList>
                    <TabsContent value="poetic"><Textarea value={content.caption.poetic} readOnly className="h-28 text-base bg-white" /></TabsContent>
                    <TabsContent value="funny"><Textarea value={content.caption.funny} readOnly className="h-28 text-base bg-white" /></TabsContent>
                    <TabsContent value="deep"><Textarea value={content.caption.deep} readOnly className="h-28 text-base bg-white" /></TabsContent>
                    <TabsContent value="minimalist"><Textarea value={content.caption.minimalist} readOnly className="h-28 text-base bg-white" /></TabsContent>
                </Tabs>
                <Button onClick={() => handleCopy(Object.values(content.caption).join('\n\n'), 'caption')} variant="outline" size="sm" className="w-full mt-2">
                    {copied === 'caption' ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                    {copied === 'caption' ? 'Captions Copied!' : 'Copy All Captions'}
                </Button>
            </div>
            <div>
                <h3 className="text-lg font-semibold font-headline mb-2 flex items-center gap-2"><Hash className="h-5 w-5"/> Trending Hashtags</h3>
                <Textarea value={content.hashtags} readOnly className="h-20 text-base bg-white" />
                 <Button onClick={() => handleCopy(content.hashtags, 'hashtags')} variant="outline" size="sm" className="w-full mt-2">
                    {copied === 'hashtags' ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                    {copied === 'hashtags' ? 'Hashtags Copied!' : 'Copy Hashtags'}
                </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="bg-primary/10 border-primary/20">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Best Time to Post</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{content.bestTimeToPost}</div>
                    </CardContent>
                </Card>
                <Card className="bg-primary/10 border-primary/20">
                    <CardHeader>
                        <CardTitle className="text-sm font-medium flex items-center"><Lightbulb className="h-4 w-4 mr-2 text-muted-foreground" /> AI Growth Tips</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                            {content.aiTip.map((tip, i) => <li key={i}>{tip}</li>)}
                        </ul>
                    </CardContent>
                </Card>
            </div>
            <Button onClick={onRegenerate} className="w-full text-lg py-6 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] text-white hover:shadow-lg hover:shadow-[#FF6B6B]/40 transition-all">
                <RefreshCw className="mr-2 h-5 w-5" />
                Regenerate
            </Button>
        </div>
    );
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Generated Content</CardTitle>
        <CardDescription>Your viral-ready caption, hashtags, and insights.</CardDescription>
      </CardHeader>
      <CardContent>
        {renderContent()}
      </CardContent>
    </Card>
  );
}
