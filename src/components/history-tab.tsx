'use client';

import { useEffect, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import { Trash2, Copy, Filter, Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast";
import type { GenerationResult } from '@/app/page';
import { cn } from '@/lib/utils';

const HISTORY_STORAGE_KEY = 'growart-ai-history';

type HistoryTabProps = {
  history: GenerationResult[];
  setHistory: Dispatch<SetStateAction<GenerationResult[]>>;
};

export default function HistoryTab({ history, setHistory }: HistoryTabProps) {
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);
  const [filter, setFilter] = useState<string>('all');
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  
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
    setDate(undefined);
    setFilter('all');
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

  const artworkStyles = Array.from(new Set(history.map(item => item.artworkStyle).filter(Boolean)));

  const filteredHistory = history.filter(item => {
    const styleMatch = filter === 'all' || item.artworkStyle === filter;
    
    if (!date) return styleMatch;

    const itemDate = new Date(item.timestamp);
    const fromDate = date.from ? new Date(date.from) : null;
    const toDate = date.to ? new Date(date.to) : null;

    if(fromDate) fromDate.setHours(0,0,0,0);
    if(toDate) toDate.setHours(23,59,59,999);

    const dateMatch = 
        (!fromDate || itemDate >= fromDate) &&
        (!toDate || itemDate <= toDate);
        
    return styleMatch && dateMatch;
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
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <CardTitle className="font-headline text-2xl">Search History</CardTitle>
          <CardDescription>Review your past generations.</CardDescription>
        </div>
        <div className="flex flex-wrap items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "w-[300px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLL dd, y")} -{" "}
                        {format(date.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={1}
                />
              </PopoverContent>
            </Popover>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Filter</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Filter by Artwork Style</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={filter === 'all'}
                  onSelect={() => setFilter('all')}
                >
                  All Styles
                </DropdownMenuCheckboxItem>
                {artworkStyles.map(style => (
                    <DropdownMenuCheckboxItem
                        key={style}
                        checked={filter === style}
                        onSelect={() => setFilter(style as string)}
                    >
                        {style}
                    </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="destructive" onClick={clearHistory} disabled={history.length === 0}>
                <Trash2 className="mr-2 h-4 w-4" /> Clear All
            </Button>
        </div>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
}
