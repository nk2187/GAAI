'use client';

import { useEffect, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import { Trash2, Copy, Filter, Calendar, Palette, PenSquare } from 'lucide-react';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast";
import type { GenerationResult } from '@/app/page';

const HISTORY_STORAGE_KEY = 'growart-ai-history';

type HistoryTabProps = {
  history: GenerationResult[];
  setHistory: Dispatch<SetStateAction<GenerationResult[]>>;
};

export default function HistoryTab({ history, setHistory }: HistoryTabProps) {
  const { toast } = useToast();
  
  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error("Failed to load history from localStorage", error);
    }
  }, [setHistory]);

  useEffect(() => {
    // Only run on client
    if (typeof window !== 'undefined') {
        try {
            localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
        } catch (error) {
            console.error("Failed to save history to localStorage", error);
        }
    }
  }, [history]);

  const clearHistory = () => {
    setHistory([]);
    toast({ title: 'History cleared' });
  };
  
  const copyToClipboard = (item: GenerationResult) => {
    const textToCopy = `${item.caption}\n\n${item.hashtags}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      toast({
        title: "Copied to clipboard!",
      });
    });
  }
  
  const deleteItem = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
    toast({ title: 'Item deleted from history' });
  }

  return (
    <Card className="mt-8 shadow-lg">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <CardTitle className="font-headline text-2xl">Search History</CardTitle>
          <CardDescription>Review your past generations.</CardDescription>
        </div>
        <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Filter</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled><Calendar className="mr-2 h-4 w-4" /> Date (coming soon)</DropdownMenuItem>
                <DropdownMenuItem disabled><PenSquare className="mr-2 h-4 w-4" /> Caption Type (coming soon)</DropdownMenuItem>
                <DropdownMenuItem disabled><Palette className="mr-2 h-4 w-4" /> Artwork Style (coming soon)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="destructive" onClick={clearHistory} disabled={history.length === 0}>
                <Trash2 className="mr-2 h-4 w-4" /> Clear All
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        {history.length > 0 ? (
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            {history.map(item => (
              <div key={item.id} className="flex gap-4 p-4 border rounded-lg items-start hover:bg-muted/50 transition-colors">
                <Image src={item.imageUrl} alt="Artwork" width={100} height={100} className="rounded-md object-cover aspect-square" data-ai-hint="artwork history" />
                <div className="flex-grow">
                  <p className="text-sm text-muted-foreground">{format(item.timestamp, 'PPP p')}</p>
                  <p className="font-semibold line-clamp-2 mt-1">{item.caption}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{item.hashtags}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <Button size="icon" variant="ghost" onClick={() => copyToClipboard(item)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => deleteItem(item.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            <p>Your search history is empty.</p>
            <p className="text-sm">Generated content will appear here.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
