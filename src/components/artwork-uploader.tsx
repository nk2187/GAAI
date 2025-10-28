'use client';

import { useState, useRef, type ChangeEvent, type DragEvent } from 'react';
import Image from 'next/image';
import { UploadCloud, FileImage, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type ArtworkUploaderProps = {
  onImageUpload: (file: File) => void;
  isLoading: boolean;
  imageUrl: string | null;
};

export default function ArtworkUploader({ onImageUpload, isLoading, imageUrl }: ArtworkUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageUpload(e.target.files[0]);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageUpload(e.dataTransfer.files[0]);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="shadow-lg h-full flex flex-col">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Upload Your Artwork</CardTitle>
        <CardDescription>Upload a JPG/PNG and let AI work its magic.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-center items-center gap-4">
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative w-full aspect-square border-2 border-dashed rounded-lg flex flex-col justify-center items-center text-center p-4 transition-colors duration-200 ${isDragging ? 'border-primary bg-primary/10' : 'border-border'}`}
        >
          {isLoading && (
            <div className="absolute inset-0 bg-background/80 flex flex-col justify-center items-center z-10 rounded-lg">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="mt-4 text-lg text-muted-foreground">Analyzing your art...</p>
            </div>
          )}

          {imageUrl ? (
            <Image
              src={imageUrl}
              alt="Uploaded artwork"
              fill
              className={`object-contain rounded-md transition-opacity duration-300 ${isLoading ? 'opacity-30' : 'opacity-100'}`}
              data-ai-hint="uploaded artwork"
            />
          ) : (
            <div className="flex flex-col items-center text-muted-foreground">
              <UploadCloud className="h-16 w-16 mb-4" />
              <p className="font-semibold">Drag & drop your artwork here</p>
              <p className="text-sm">or</p>
            </div>
          )}
        </div>
        <Input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/jpeg, image/png"
          disabled={isLoading}
        />
        <Button onClick={handleBrowseClick} disabled={isLoading} className="w-full" variant="outline">
          <FileImage className="mr-2 h-4 w-4" />
          Browse Files
        </Button>
      </CardContent>
    </Card>
  );
}
