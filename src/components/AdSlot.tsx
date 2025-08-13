import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface AdSlotProps {
  className?: string;
  style?: React.CSSProperties;
}

// Load AdSense script once
let adSenseLoaded = false;

const loadAdSenseScript = () => {
  if (adSenseLoaded) return;
  
  const client = import.meta.env.VITE_ADSENSE_CLIENT;
  if (!client) return;

  // Check if script already exists
  if (document.querySelector('script[src*="pagead2.googlesyndication.com"]')) {
    adSenseLoaded = true;
    return;
  }

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
  script.setAttribute('data-ad-client', client);
  script.crossOrigin = 'anonymous';
  
  document.head.appendChild(script);
  adSenseLoaded = true;
};

export const AdSlot: React.FC<AdSlotProps> = ({ className, style }) => {
  const [isClient, setIsClient] = useState(false);
  const client = import.meta.env.VITE_ADSENSE_CLIENT;

  useEffect(() => {
    setIsClient(true);
    if (client) {
      loadAdSenseScript();
    }
  }, [client]);

  // Don't render on server or if no client ID
  if (!isClient || !client) {
    return null;
  }

  return (
    <div className={cn("ad-slot my-8", className)} style={style}>
      {/* TODO: Replace with your actual AdSense ad unit ID */}
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={client}
        data-ad-slot="YOUR_AD_SLOT_ID_HERE" // TODO: Replace with actual slot ID
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      <script>
        (adsbygoogle = window.adsbygoogle || []).push({});
      </script>
    </div>
  );
};

// Export for use in App.tsx
export { loadAdSenseScript };