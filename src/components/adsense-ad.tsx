'use client';

import { useEffect } from 'react';

type AdSenseAdProps = {
  adClient: string;
  adSlot: string;
};

declare global {
    interface Window {
        adsbygoogle: any;
    }
}

export default function AdSenseAd({ adClient, adSlot }: AdSenseAdProps) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client={adClient}
      data-ad-slot={adSlot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
}