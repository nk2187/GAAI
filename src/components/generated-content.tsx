'use client';

import { Copy, Check, Info, Clock, Hash, Lightbulb } from 'lucide-react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from "@/hooks/use-toast";
import type { GenerateInstagramCaptionOutput } from '@/ai/flows/generate-instagram-caption';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type GeneratedContentProps = {
  content: GenerateInstagramCaptionOutput | null;
  isLoading: boolean;
  error: string | null;
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

export default function GeneratedContent({ content, isLoading, error }: GeneratedContentProps) {
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = () => {
    if (!content) return;
    const textToCopy = `${content.caption}\n\n${content.hashtags}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setIsCopied(true);
      toast({
        title: "Copied to clipboard!",
        description: "Caption and hashtags are ready to paste.",
      })
      setTimeout(() => setIsCopied(false), 2000);
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
                <h3 className="text-lg font-semibold font-headline mb-2">AI Caption</h3>
                <Textarea value={content.caption} readOnly className="h-32 text-base bg-white" />
            </div>
            <div>
                <h3 className="text-lg font-semibold font-headline mb-2 flex items-center gap-2"><Hash className="h-5 w-5"/> Trending Hashtags</h3>
                <Textarea value={content.hashtags} readOnly className="h-20 text-base bg-white" />
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
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">AI Growth Tip</CardTitle>
                        <Lightbulb className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">{content.aiTip}</p>
                    </CardContent>
                </Card>
            </div>
            <Button onClick={handleCopy} className="w-full text-lg py-6 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] text-white hover:shadow-lg hover:shadow-[#FF6B6B]/40 transition-all">
                {isCopied ? <Check className="mr-2 h-5 w-5" /> : <Copy className="mr-2 h-5 w-5" />}
                {isCopied ? 'Copied!' : 'Copy Caption & Hashtags'}
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
