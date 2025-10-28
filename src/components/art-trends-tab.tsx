'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getArtTrends, type GetArtTrendsOutput } from '@/ai/flows/get-art-trends';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { TrendingUp, Info } from 'lucide-react';

const TrendSkeleton = () => (
    <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
                <Skeleton className="h-5 w-1/3" />
                <Skeleton className="h-4 w-4/5" />
            </div>
        ))}
    </div>
)

export default function ArtTrendsTab() {
  const [trends, setTrends] = useState<GetArtTrendsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTrends() {
      setIsLoading(true);
      setError(null);
      try {
        const result = await getArtTrends();
        setTrends(result);
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
        setError(errorMessage);
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTrends();
  }, []);

  const renderContent = () => {
    if (isLoading) {
        return <TrendSkeleton />;
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
    if (!trends || trends.trends.length === 0) {
        return (
            <div className="text-center py-16 text-muted-foreground">
                <p>Could not fetch art trends at the moment. Please try again later.</p>
            </div>
        )
    }
    return (
        <div className="space-y-6">
            {trends.trends.map((trend, index) => (
                <div key={index} className="p-4 border rounded-lg bg-muted/30">
                    <h3 className="font-headline text-xl text-primary">{trend.topic}</h3>
                    <p className="text-base text-muted-foreground mt-1">{trend.description}</p>
                </div>
            ))}
        </div>
    )
  }

  return (
    <Card className="mt-8 shadow-lg max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="font-headline text-2xl flex items-center justify-center gap-2">
          <TrendingUp /> Art Trends
        </CardTitle>
        <CardDescription>Top 5 trending art hashtags and topics right now.</CardDescription>
      </CardHeader>
      <CardContent className="p-8">
        {renderContent()}
      </CardContent>
    </Card>
  );
}
