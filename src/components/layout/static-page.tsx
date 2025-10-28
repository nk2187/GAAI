import type { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type StaticPageProps = {
  title: string;
  children: ReactNode;
};

export default function StaticPage({ title, children }: StaticPageProps) {
  return (
    <div className="container mx-auto py-8 md:py-12 px-4">
      <Card className="max-w-4xl mx-auto shadow-lg bg-card">
        <CardHeader>
          <CardTitle className="font-headline text-4xl text-center tracking-wide">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="font-body text-lg text-card-foreground/90 space-y-6 leading-relaxed px-6 sm:px-10 pb-10">
          {children}
        </CardContent>
      </Card>
    </div>
  );
}
