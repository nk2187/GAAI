'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Instagram } from 'lucide-react';
import Image from 'next/image';

export default function CollaborationTab() {
  const handleCollabClick = () => {
    window.open('https://www.instagram.com/let_scollab?igsh=Z2hqbTh6cmd0aWJi', '_blank', 'noopener,noreferrer');
  };

  return (
    <Card className="mt-8 shadow-lg max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="font-headline text-2xl flex items-center justify-center gap-2">
            Free Collaboration on <Instagram />
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-6 p-8">
        <p className="text-xl text-muted-foreground">
            “Looking for creative collaboration? Let’s grow together!”
        </p>
        <Button 
          onClick={handleCollabClick}
          className="text-lg font-bold py-6 px-8 text-white bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-[#FF6B6B]/40 hover:scale-105 rounded-xl"
        >
          Let’s Collab
        </Button>
      </CardContent>
    </Card>
  );
}
