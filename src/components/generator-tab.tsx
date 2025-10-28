'use client';

import { useState, useCallback } from 'react';
import type { GenerationResult } from '@/app/page';
import ArtworkUploader from './artwork-uploader';
import GeneratedContent from './generated-content';
import { analyzeArtworkTheme, type AnalyzeArtworkThemeOutput } from '@/ai/flows/analyze-artwork-theme';
import { generateInstagramCaption, type GenerateInstagramCaptionOutput } from '@/ai/flows/generate-instagram-caption';
import { useToast } from "@/hooks/use-toast"

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

  const runGeneration = useCallback(async (dataUri: string) => {
    setIsLoading(true);
    setError(null);

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
        timestamp: Date.now(),
      });

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
  }, [analysisResult, onGenerated, toast]);

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
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      <ArtworkUploader onImageUpload={handleImageUpload} isLoading={isLoading} imageUrl={imageDataUri} />
      <GeneratedContent 
        content={generatedContent} 
        isLoading={isLoading} 
        error={error}
        onRegenerate={handleRegenerate}
      />
    </div>
  );
}
