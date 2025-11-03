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
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, [adSlot]);

  return (
    <>
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        crossOrigin="anonymous"
      ></script>

      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </>
  );
}
