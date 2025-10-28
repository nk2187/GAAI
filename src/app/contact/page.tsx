
'use client';

import StaticPage from '@/components/layout/static-page';
import { Button } from '@/components/ui/button';
import { Instagram } from 'lucide-react';

export default function ContactUsPage() {
  const handleInstagramClick = () => {
    window.open('https://www.instagram.com/let_scollab?igsh=Z2hqbTh6cmd0aWJi', '_blank', 'noopener,noreferrer');
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
            className="text-lg font-bold py-6 px-8 text-white bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-[#FF6B6B]/40 hover:scale-105 rounded-xl"
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
