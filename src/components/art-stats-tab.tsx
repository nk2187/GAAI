'use client';

import { useEffect, useState, useMemo } from 'react';
import type { GenerationResult } from '@/app/page';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LineChart, BarChart3, Clock, Hash } from 'lucide-react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"


type ArtStatsTabProps = {
  history: GenerationResult[];
};

export default function ArtStatsTab({ history }: ArtStatsTabProps) {
    const [isClient, setIsClient] =useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const stats = useMemo(() => {
        if (!isClient) return { totalGenerations: 0, topHashtags: [], averageTime: "N/A" };

        const totalGenerations = history.length;
        
        const hashtagCounts: Record<string, number> = {};
        history.forEach(item => {
            const hashtags = item.hashtags.split(' ').filter(Boolean);
            hashtags.forEach(tag => {
                hashtagCounts[tag] = (hashtagCounts[tag] || 0) + 1;
            });
        });

        const topHashtags = Object.entries(hashtagCounts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([name, value]) => ({ name, value }));

        const timeSlots: Record<string, number> = {};
        history.forEach(item => {
            const time = item.bestTimeToPost;
            if(time) {
                timeSlots[time] = (timeSlots[time] || 0) + 1;
            }
        });
        const averageTime = Object.entries(timeSlots).sort(([,a],[,b]) => b - a)[0]?.[0] || 'N/A';


        return { totalGenerations, topHashtags, averageTime };

    }, [history, isClient]);

    if (!isClient || history.length === 0) {
        return (
            <Card className="mt-8 shadow-lg text-center">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Art Stats Dashboard</CardTitle>
                    <CardDescription>Generate some captions to see your stats.</CardDescription>
                </CardHeader>
                <CardContent className="py-16 text-muted-foreground">
                    <LineChart className="h-16 w-16 mx-auto mb-4" />
                    <p>No data yet. Start creating to see your analytics!</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="mt-8 shadow-lg">
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Art Stats Dashboard</CardTitle>
                <CardDescription>Analytics from your generated content.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Total Generations</CardTitle>
                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalGenerations}</div>
                        <p className="text-xs text-muted-foreground">captions generated</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Average Best Posting Time</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.averageTime}</div>
                        <p className="text-xs text-muted-foreground">based on your content</p>
                    </CardContent>
                </Card>
                <Card className="col-span-1 md:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-sm font-medium flex items-center"><Hash className="h-4 w-4 mr-2" /> Top Hashtags Used</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {stats.topHashtags.length > 0 ? (
                             <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={stats.topHashtags}>
                                    <XAxis
                                        dataKey="name"
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        interval={0}
                                        angle={-45}
                                        textAnchor='end'
                                        height={80}
                                    />
                                    <YAxis
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        allowDecimals={false}
                                    />
                                    <Tooltip
                                        cursor={{fill: 'hsl(var(--primary) / 0.1)'}}
                                        contentStyle={{
                                            background: 'hsl(var(--background))',
                                            border: '1px solid hsl(var(--border))',
                                            borderRadius: 'var(--radius)',
                                        }}
                                    />
                                    <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        ): (
                            <p className="text-muted-foreground text-center py-12">No hashtag data available yet.</p>
                        )}
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    )
}
