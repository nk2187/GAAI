
'use client';

import StaticPage from '@/components/layout/static-page';
import { Button } from '@/components/ui/button';
import { Instagram } from 'lucide-react';

export default function ContactUsPage() {
  const handleInstagramClick = () => {
    window.open('https://www.instagram.com/let_scollab', '_blank', 'noopener,noreferrer');
  };

  return (
    <StaticPage title="Contact Us">
      <p>
        We welcome feedback, ideas, and collaboration suggestions from artists and creators.
      </p>
      <p>
        If you’d like to share your thoughts or have suggestions for improving our tools, feel free to send us a message on Instagram.
      </p>
      <div className="text-center pt-4">
        <Button 
            onClick={handleInstagramClick}
            >
            <Instagram className="mr-2 h-5 w-5" />
            Message on Instagram
        </Button>
      </div>
      <p className="pt-6">
        GrowArt AI values every creator’s voice and aims to build a helpful and creative community.
      </p>
    </StaticPage>
  );
}
