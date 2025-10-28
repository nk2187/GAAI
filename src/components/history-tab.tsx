'use client';

import { useEffect, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import { Trash2, Copy, Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast";
import type { GenerationResult } from '@/app/page';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

const HISTORY_STORAGE_KEY = 'growart-ai-history';

type HistoryTabProps = {
  history: GenerationResult[];
  setHistory: Dispatch<SetStateAction<GenerationResult[]>>;
};

export default function HistoryTab({ history, setHistory }: HistoryTabProps) {
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);
  const [filter, setFilter] = useState<string>('all');
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
  const [toDate, setToDate] = useState<Date | undefined>(undefined);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    try {
      const storedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error("Failed to load history from localStorage", error);
    }
  }, [isClient, setHistory]);

  useEffect(() => {
    if (!isClient) return;
    try {
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
    } catch (error) {
        console.error("Failed to save history to localStorage", error);
    }
  }, [history, isClient]);

  const clearHistory = () => {
    setHistory([]);
    clearFilters();
    toast({ title: 'History cleared' });
  };

  const clearFilters = () => {
    setFromDate(undefined);
    setToDate(undefined);
    setFilter('all');
  }
  
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

  const predefinedStyles = [
    'Abstract',
    'Landscape',
    'Portrait',
    'Digital Art',
    'Surrealism',
    'Minimalism'
  ];

  const artworkStyles = Array.from(new Set([...predefinedStyles, ...history.map(item => item.artworkStyle).filter(Boolean)]));

  const filteredHistory = history.filter(item => {
    const styleMatch = filter === 'all' || item.artworkStyle === filter;
    
    const itemDate = new Date(item.timestamp);
    
    let fromDateMatch = true;
    if(fromDate) {
        const from = new Date(fromDate);
        from.setHours(0,0,0,0);
        fromDateMatch = itemDate >= from;
    }
    
    let toDateMatch = true;
    if(toDate) {
        const to = new Date(toDate);
        to.setHours(23,59,59,999);
        toDateMatch = itemDate <= to;
    }
        
    return styleMatch && fromDateMatch && toDateMatch;
  });
  
  if (!isClient) {
    return (
        <Card className="mt-8 shadow-lg">
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Search History</CardTitle>
                <CardDescription>Review your past generations.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-center py-16 text-muted-foreground">
                    <p>Loading history...</p>
                </div>
            </CardContent>
        </Card>
    );
  }

  return (
    <Card className="mt-8 shadow-lg">
      <CardHeader>
        <div>
          <CardTitle className="font-headline text-2xl">Search History</CardTitle>
          <CardDescription>Refine your past generations by date range or style.</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 mb-6 p-4 border rounded-lg bg-muted/30">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="from-date">From</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="from-date"
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal bg-background",
                    !fromDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {fromDate ? format(fromDate, "dd/MM/yyyy") : <span>dd/mm/yyyy</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={fromDate}
                  onSelect={setFromDate}
                  initialFocus
                  captionLayout="dropdown-buttons"
                  fromYear={new Date().getFullYear() - 10}
                  toYear={new Date().getFullYear()}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="to-date">To</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="to-date"
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal bg-background",
                    !toDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {toDate ? format(toDate, "dd/MM/yyyy") : <span>dd/mm/yyyy</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={toDate}
                  onSelect={setToDate}
                  initialFocus
                  captionLayout="dropdown-buttons"
                  fromYear={new Date().getFullYear() - 10}
                  toYear={new Date().getFullYear()}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="style-filter">Style</Label>
            <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger id="style-filter" className="w-full bg-background font-normal">
                    <SelectValue placeholder="All Styles" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Styles</SelectItem>
                    {artworkStyles.map(style => (
                        <SelectItem key={style} value={style as string}>
                            {style}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
          </div>
          <div className="grid w-full items-end gap-1.5">
            <Button variant="outline" onClick={clearFilters} className="w-full bg-background">
                Clear Filters
            </Button>
          </div>
        </div>

        {filteredHistory.length > 0 ? (
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            {filteredHistory.map(item => (
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
            <p>Your search history is empty or no results match the filter.</p>
            <p className="text-sm">Generated content will appear here.</p>
          </div>
        )}
        <div className="flex justify-end mt-4">
            <Button variant="destructive" onClick={clearHistory} disabled={history.length === 0}>
                <Trash2 className="mr-2 h-4 w-4" /> Clear All History
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
