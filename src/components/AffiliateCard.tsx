import { ExternalLink } from 'lucide-react';
import { Card } from './Card';
import { Button } from './Button';

interface AffiliateCardProps {
  title: string;
  description?: string;
  image: string;
  price?: string;
  ctaText?: string;
  url: string;
  source: string;
}

export const AffiliateCard: React.FC<AffiliateCardProps> = ({
  title,
  description,
  image,
  price,
  ctaText = "View",
  url,
  source
}) => {
  return (
    <Card hover className="group relative overflow-hidden">
      {/* Image */}
      <div className="aspect-video mb-4 rounded-lg overflow-hidden bg-muted">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Source badge */}
      <div className="absolute top-2 right-2">
        <span className="bg-accent/20 text-accent text-xs px-2 py-1 rounded-full font-medium">
          {source}
        </span>
      </div>

      {/* Content */}
      <div className="mb-4">
        <h3 className="font-heading text-lg font-semibold text-text mb-2 line-clamp-2">
          {title}
        </h3>
        {description && (
          <p className="text-text-muted text-sm mb-3 line-clamp-2">
            {description}
          </p>
        )}
        {price && (
          <p className="text-accent font-semibold text-lg mb-3">
            {price}
          </p>
        )}
      </div>

      {/* CTA Button */}
      <Button 
        variant="soft" 
        className="w-full group-hover:bg-accent group-hover:text-background transition-all duration-300"
        asChild
      >
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2"
        >
          {ctaText}
          <ExternalLink className="w-4 h-4" />
        </a>
      </Button>
    </Card>
  );
};