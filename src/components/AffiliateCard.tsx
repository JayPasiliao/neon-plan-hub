import { Card } from "./Card";
import { Button } from "./Button";

interface AffiliateCardProps {
  title: string;
  description?: string;
  image: string;
  price?: string;
  ctaText?: string;
  url: string;
  source: string;
}

export const AffiliateCard = ({
  title,
  description,
  image,
  price,
  ctaText = "View",
  url,
  source
}: AffiliateCardProps) => {
  const handleClick = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card hover className="group h-full flex flex-col">
      <div className="aspect-square mb-4 rounded-lg overflow-hidden bg-muted">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <div className="flex-1 flex flex-col">
        <h3 className="font-heading font-semibold text-lg mb-2 line-clamp-2">{title}</h3>
        {description && (
          <p className="text-text-muted text-sm mb-4 flex-1">{description}</p>
        )}
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-3">
            {price && <span className="text-accent font-bold text-lg">{price}</span>}
            <span className="text-text-muted text-xs">via {source}</span>
          </div>
          <Button 
            variant="primary" 
            size="sm"
            className="w-full"
            onClick={handleClick}
          >
            {ctaText} →
          </Button>
        </div>
      </div>
    </Card>
  );
};