'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Lightbulb, RefreshCw, Copy, Check, Loader2 } from 'lucide-react';
import { generateArtIdeas, type GenerateArtIdeasOutput } from '@/ai/flows/generate-art-ideas';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useToast } from '@/hooks/use-toast';

const artStyles = [
    "Digital",
    "Realistic",
    "Abstract",
    "Traditional"
];

export default function IdeaGenerator() {
    const [ideas, setIdeas] = useState<GenerateArtIdeasOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [artStyle, setArtStyle] = useState('any');
    const { toast } = useToast();
    const [copied, setCopied] = useState<number | null>(null);


    const handleGenerate = async () => {
        setIsLoading(true);
        setIdeas(null);
        try {
            const result = await generateArtIdeas({ artStyle: artStyle === 'any' ? undefined : artStyle });
            setIdeas(result);
        } catch (error) {
            console.error(error);
            toast({
                variant: 'destructive',
                title: 'Failed to generate ideas',
                description: 'An error occurred while communicating with the AI.'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = (text: string, index: number) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(index);
            toast({ title: 'Idea copied to clipboard!' });
            setTimeout(() => setCopied(null), 2000);
        });
    }

    return (
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="font-headline text-2xl flex items-center gap-2"><Lightbulb /> AI Idea Generator</CardTitle>
                <CardDescription>Overcome creative block with fresh ideas from AI.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex gap-4">
                    <Select value={artStyle} onValueChange={setArtStyle}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Art Style" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="any">Any Style</SelectItem>
                            {artStyles.map(style => (
                                <SelectItem key={style} value={style}>{style}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button onClick={handleGenerate} disabled={isLoading} className="whitespace-nowrap">
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
                        Generate Ideas
                    </Button>
                </div>
                
                {isLoading && (
                    <div className="text-center py-8 text-muted-foreground">
                        <Loader2 className="h-8 w-8 animate-spin mx-auto" />
                        <p className="mt-2">Generating creative sparks...</p>
                    </div>
                )}
                
                {ideas && (
                    <div className="space-y-3 pt-4 animate-in fade-in-50">
                        {ideas.ideas.map((idea, index) => (
                            <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-muted/30">
                                <p className="text-base font-body">{idea}</p>
                                <Button size="icon" variant="ghost" onClick={() => handleCopy(idea, index)}>
                                    {copied === index ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                </Button>
                            </div>
                        ))}
                    </div>
                )}

                {!ideas && !isLoading && (
                    <div className="text-center py-8 text-muted-foreground">
                        <p>Click "Generate Ideas" to get some inspiration!</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
