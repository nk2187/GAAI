import { Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AboutSection() {
  return (
    <Card className="mt-8 shadow-lg max-w-4xl mx-auto bg-muted/20">
      <CardHeader className="text-center">
        <CardTitle className="font-headline text-3xl flex items-center justify-center gap-2">
          <Sparkles className="text-primary" />
          About GrowArt AI
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4 p-6 md:p-8 text-lg text-muted-foreground">
        <p>
          GrowArt AI is your creative partner, an AI-powered platform designed
          to help artists and creators effortlessly generate viral captions and
          hashtags for their artwork.
        </p>
        <p>
          Save time, overcome creative blocks, and connect with a wider
          audience. Our smart tools analyze your art to suggest engaging text,
          letting you focus on what you do best: creating.
        </p>
      </CardContent>
    </Card>
  );
}
