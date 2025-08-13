import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface AdSlotProps {
  className?: string;
  slot?: string;
}

export const AdSlot = ({ className, slot = "auto" }: AdSlotProps) => {
  const adsenseClient = import.meta.env.VITE_ADSENSE_CLIENT;

  useEffect(() => {
    if (adsenseClient && window.adsbygoogle) {
      try {
        (window.adsbygoogle as any[]).push({});
      } catch (err) {
        console.error('AdSense error:', err);
      }
    }
  }, [adsenseClient]);

  // Don't render if no AdSense client ID
  if (!adsenseClient) {
    return (
      <div className={`bg-muted/20 border border-border rounded-lg p-4 text-center ${className || ''}`}>
        <p className="text-text-muted text-sm mb-2">Advertisement</p>
        <div className="h-24 bg-muted/10 rounded flex items-center justify-center">
          <span className="text-text-muted text-xs">Ad Space - Set VITE_ADSENSE_CLIENT</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`text-center ${className || ''}`}>
      <ins 
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={adsenseClient}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

// AdSense script loader - call this once in your app
export const loadAdSenseScript = () => {
  const adsenseClient = import.meta.env.VITE_ADSENSE_CLIENT;
  
  if (!adsenseClient || document.querySelector('[data-ad-client]')) {
    return;
  }

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`;
  script.crossOrigin = "anonymous";
  document.head.appendChild(script);

  // Initialize adsbygoogle array
  (window.adsbygoogle = window.adsbygoogle || []);
};