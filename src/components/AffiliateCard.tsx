import { Card } from "./Card";
import { Button } from "./Button";

interface AffiliateCardProps {
  title: string;
  description: string;
  image: string;
  price: string;
  ctaText: string;
  url: string;
  source: string;
}

export const AffiliateCard = ({
  title,
  description,
  image,
  price,
  ctaText,
  url,
  source
}: AffiliateCardProps) => {
  return (
    <Card hover className="group">
      <div className="aspect-video mb-4 rounded-lg overflow-hidden bg-muted">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <h3 className="font-heading font-semibold text-lg mb-2">{title}</h3>
      <p className="text-text-muted text-sm mb-4">{description}</p>
      <div className="flex items-center justify-between">
        <span className="text-accent font-bold text-lg">{price}</span>
        <Button 
          variant="primary" 
          size="sm"
          onClick={() => window.open(url, '_blank')}
        >
          {ctaText}
        </Button>
      </div>
      <p className="text-text-muted text-xs mt-2">via {source}</p>
    </Card>
  );
};