import { useParams, Navigate } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Container } from "@/components/Container";
import { Badge } from "@/components/Badge";
import { AdSlot } from "@/components/AdSlot";
import { AffiliateCard } from "@/components/AffiliateCard";
import { getPostBySlug } from "@/lib/posts";
import { getAffiliatesBySkus } from "@/lib/affiliates";
import { useEffect, useState } from "react";
import { Post } from "@/lib/posts";

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [affiliates, setAffiliates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      const fetchedPost = getPostBySlug(slug);
      if (fetchedPost) {
        setPost(fetchedPost);
        
        // Check if post is published
        const now = new Date();
        const publishDate = new Date(fetchedPost.publishAt);
        
        if (publishDate <= now && fetchedPost.affiliateSkus) {
          getAffiliatesBySkus(fetchedPost.affiliateSkus).then(setAffiliates);
        }
      }
      setLoading(false);
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-text-muted">Loading post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return <Navigate to="/404" replace />;
  }

  // Check if post is published
  const now = new Date();
  const publishDate = new Date(post.publishAt);
  
  if (publishDate > now) {
    return <Navigate to="/404" replace />;
  }

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
              <div className="text-text leading-relaxed space-y-6">
                {/* For now, we'll show a placeholder since MDX content isn't fully integrated */}
                <div className="bg-muted/20 p-6 rounded-lg text-center">
                  <p className="text-text-muted mb-4">
                    MDX content integration coming soon. This post would display the full content here.
                  </p>
                  <div className="text-sm text-text-muted space-y-2">
                    <p><strong>Title:</strong> {post.title}</p>
                    <p><strong>Excerpt:</strong> {post.excerpt}</p>
                    <p><strong>Tags:</strong> {post.tags.join(', ')}</p>
                    <p><strong>Reading Time:</strong> {post.readingTime} minutes</p>
                  </div>
                </div>
              </div>
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