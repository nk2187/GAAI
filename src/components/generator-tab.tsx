
'use client';

import { useState, useCallback } from 'react';
import type { GenerationResult } from '@/app/page';
import ArtworkUploader from './artwork-uploader';
import GeneratedContent from './generated-content';
import { analyzeArtworkTheme, type AnalyzeArtworkThemeOutput } from '@/ai/flows/analyze-artwork-theme';
import { generateInstagramCaption, type GenerateInstagramCaptionOutput } from '@/ai/flows/generate-instagram-caption';
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"
import IdeaGenerator from './idea-generator';

const captionStyles = [
    "Short & Aesthetic ✨",
    "Funny & Engaging 😄",
    "Emotional or Deep 🎭",
    "Viral Reels Style 🎥"
];

type GeneratorTabProps = {
  onGenerated: (result: GenerationResult) => void;
};

export default function GeneratorTab({ onGenerated }: GeneratorTabProps) {
  const [imageDataUri, setImageDataUri] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalyzeArtworkThemeOutput | null>(null);
  const [generatedContent, setGeneratedContent] = useState<GenerateInstagramCaptionOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const [captionStyle, setCaptionStyle] = useState(captionStyles[0]);
  const [showCollabPopup, setShowCollabPopup] = useState(false);

  const runGeneration = useCallback(async (dataUri: string) => {
    setIsLoading(true);
    setError(null);
    setShowCollabPopup(false);

    try {
      let analysis = analysisResult;
      if (!analysis) {
        analysis = await analyzeArtworkTheme({ photoDataUri: dataUri });
        setAnalysisResult(analysis);
      }

      const captionData: GenerateInstagramCaptionOutput = await generateInstagramCaption({
        photoDataUri: dataUri,
        artworkStyle: analysis.style,
        artworkTheme: analysis.theme,
        artworkMood: analysis.mood,
        artworkColor: analysis.colorPalette,
        captionStyle: captionStyle
      });

      setGeneratedContent(captionData);
      
      onGenerated({
        ...captionData,
        id: crypto.randomUUID(),
        imageUrl: dataUri,
        artworkStyle: analysis.style,
        artworkTheme: analysis.theme,
        artworkMood: analysis.mood,
        artworkColor: analysis.colorPalette,
        captionStyle: captionStyle,
        timestamp: Date.now(),
      });

      setShowCollabPopup(true);

    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: errorMessage,
      })
    } finally {
      setIsLoading(false);
    }
  }, [analysisResult, onGenerated, toast, captionStyle]);

  const handleImageUpload = async (file: File) => {
    setIsLoading(true);
    setError(null);
    setGeneratedContent(null);
    setAnalysisResult(null);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const dataUri = reader.result as string;
      setImageDataUri(dataUri);
      await runGeneration(dataUri);
    };
    reader.onerror = (error) => {
      console.error(error);
      const errorMessage = "Failed to read the file.";
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "File Read Error",
        description: errorMessage,
      })
      setIsLoading(false);
    };
  };

  const handleRegenerate = () => {
    if (imageDataUri) {
      runGeneration(imageDataUri);
    } else {
      toast({
        variant: "destructive",
        title: "Cannot Regenerate",
        description: "Please upload an image first.",
      });
    }
  };

  return (
    <>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-8">
            <ArtworkUploader onImageUpload={handleImageUpload} isLoading={isLoading} imageUrl={imageDataUri} />
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Choose Caption Style</CardTitle>
                    <CardDescription>Select a style for your AI-generated caption.</CardDescription>
                </CardHeader>
                <CardContent>
                    <RadioGroup value={captionStyle} onValueChange={setCaptionStyle} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {captionStyles.map((style) => (
                            <div key={style} className="flex items-center space-x-2">
                                <RadioGroupItem value={style} id={style} />
                                <Label htmlFor={style} className="text-base font-body">{style}</Label>
                            </div>
                        ))}
                    </RadioGroup>
                </CardContent>
            </Card>
            <IdeaGenerator />
        </div>
        <GeneratedContent 
          content={generatedContent} 
          isLoading={isLoading} 
          error={error}
          onRegenerate={handleRegenerate}
        />
      </div>

      <AlertDialog open={showCollabPopup} onOpenChange={setShowCollabPopup}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-headline text-2xl">🤝 Invite @let_scollab as a Collaborator</AlertDialogTitle>
            <AlertDialogDescription className="text-lg">
              ✨ Collab for free! Boost your reach by tagging @let_scollab as a collaborator on your next post. Let’s grow together 💫
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowCollabPopup(false)}>Got it!</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
