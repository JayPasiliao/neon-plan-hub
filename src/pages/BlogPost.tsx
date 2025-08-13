import { useParams } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Container } from "@/components/Container";
import { Badge } from "@/components/Badge";
import { AdSlot } from "@/components/AdSlot";
import { AffiliateCard } from "@/components/AffiliateCard";
import { getAffiliatesBySkus } from "@/lib/affiliates";

// Mock post data - in real app this would be from MDX
const mockPost = {
  slug: "maximizing-small-lot-design",
  title: "Maximizing Small Lot Design in Metro Manila",
  excerpt: "Complete guide to designing functional homes on small urban lots in Metro Manila",
  coverImage: "/images/small-lot-design.jpg",
  publishAt: "2024-12-01T10:00:00Z",
  tags: ["small-spaces", "urban", "philippines"],
  affiliateSkus: ["lazada-laser-meter", "shopee-wall-table"],
  content: `# Maximizing Small Lot Design in Metro Manila

Building on a small lot in Metro Manila presents unique challenges, but with smart design strategies, you can create a functional and beautiful home that maximizes every square meter.

## Key Takeaways

- **Vertical design** is essential for small lots
- **Multi-functional spaces** double your usable area
- **Proper ventilation** is crucial in dense urban areas
- **Storage solutions** should be built into the design
- **Natural light** optimization makes spaces feel larger

## Cost Estimation Table

| Area (sqm) | Basic Finish | Standard Finish | Premium Finish |
|------------|--------------|-----------------|----------------|
| 30         | ₱510,000     | ₱690,000        | ₱960,000       |
| 40         | ₱680,000     | ₱920,000        | ₱1,280,000     |
| 50         | ₱850,000     | ₱1,150,000      | ₱1,600,000     |

*Prices are estimates and may vary by location and contractor*

## Practical Design Tips

### 1. Embrace Vertical Living
- Use loft beds to create room underneath
- Install floor-to-ceiling storage
- Consider a mezzanine for additional space

### 2. Multi-Purpose Rooms
- Dining areas that convert to workspaces
- Living rooms with built-in storage benches
- Bedrooms with fold-out desks

### 3. Outdoor Integration
- Extend living spaces to balconies
- Use outdoor kitchens to save indoor space
- Create vertical gardens for privacy

## Conclusion

Small lot design in Metro Manila requires creativity and careful planning, but the results can be both functional and beautiful. Focus on vertical solutions, multi-purpose spaces, and smart storage to make the most of your available space.`
};

const BlogPost = () => {
  const { slug } = useParams();
  
  // In real app, you'd fetch the post by slug and check if publishAt is in the future
  const post = mockPost;
  const now = new Date();
  const publishDate = new Date(post.publishAt);
  
  // Return 404 if post is not published yet
  if (publishDate > now) {
    return <div>404 - Post not found</div>;
  }

  const affiliates = post.affiliateSkus ? getAffiliatesBySkus(post.affiliateSkus) : [];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="pt-24 pb-16">
        <Container>
          <article className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="mb-4 flex flex-wrap justify-center gap-2">
                {post.tags.map(tag => (
                  <Badge key={tag} variant="accent">{tag}</Badge>
                ))}
              </div>
              <h1 className="font-heading text-4xl lg:text-5xl font-bold text-text mb-4">
                {post.title}
              </h1>
              <p className="text-text-muted text-lg mb-6">
                {post.excerpt}
              </p>
              <div className="text-text-muted text-sm">
                Published on {publishDate.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>

            {/* Cover Image */}
            <div className="aspect-video mb-8 rounded-lg overflow-hidden bg-muted">
              <img 
                src={post.coverImage} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            <AdSlot className="mb-8 max-w-2xl mx-auto" />

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <div 
                className="text-text leading-relaxed space-y-6"
                dangerouslySetInnerHTML={{ 
                  __html: post.content
                    .replace(/^# /gm, '<h1 class="font-heading text-3xl font-bold text-text mb-6 mt-8">')
                    .replace(/^## /gm, '<h2 class="font-heading text-2xl font-bold text-text mb-4 mt-8">')
                    .replace(/^### /gm, '<h3 class="font-heading text-xl font-semibold text-text mb-3 mt-6">')
                    .replace(/^\*\*([^*]+)\*\*/gm, '<strong class="text-accent">$1</strong>')
                    .replace(/^- /gm, '<li class="text-text-muted ml-4">')
                    .replace(/\n\n/g, '</p><p class="mb-4">')
                    .replace(/^\|(.+)\|$/gm, (match, content) => {
                      const cells = content.split('|').map((cell: string) => cell.trim());
                      return `<tr>${cells.map((cell: string) => `<td class="border border-border px-4 py-2">${cell}</td>`).join('')}</tr>`;
                    })
                }}
              />
            </div>

            {/* Affiliate Products */}
            {affiliates.length > 0 && (
              <div className="mt-12">
                <h2 className="font-heading text-2xl font-bold text-text mb-6">
                  Recommended Products
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {affiliates.map(affiliate => (
                    <AffiliateCard
                      key={affiliate.sku}
                      title={affiliate.title}
                      image={affiliate.image}
                      price={affiliate.price}
                      ctaText="View Product"
                      url={affiliate.url}
                      source={affiliate.source}
                    />
                  ))}
                </div>
              </div>
            )}

            <AdSlot className="mt-12 max-w-2xl mx-auto" />
          </article>
        </Container>
      </main>

      <SiteFooter />
    </div>
  );
};

export default BlogPost;