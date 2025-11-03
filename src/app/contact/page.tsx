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
        We love hearing from our community! Whether you have feedback, ideas for new features, or collaboration proposals, your input helps us grow and improve.
      </p>
      <p>
        The best way to reach us is by sending a direct message on Instagram. We are active and responsive, and we look forward to connecting with you. Let us know how we can make GrowArt AI even better for artists like you.
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
        GrowArt AI values every creator’s voice and aims to build a helpful, inspiring, and creative community together.
      </p>
    </StaticPage>
  );
}
