interface AdSlotProps {
  className?: string;
}

export const AdSlot = ({ className }: AdSlotProps) => {
  return (
    <div className={`bg-muted/20 border border-border rounded-lg p-4 text-center ${className || ''}`}>
      <p className="text-text-muted text-sm mb-2">Advertisement</p>
      {/* AdSense placeholder - uncomment when ready to enable
      <ins className="adsbygoogle"
           style={{display:'block'}}
           data-ad-client="ca-pub-XXXX"
           data-ad-slot="XXXX"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
      */}
      <div className="h-24 bg-muted/10 rounded flex items-center justify-center">
        <span className="text-text-muted text-xs">Ad Space</span>
      </div>
    </div>
  );
};