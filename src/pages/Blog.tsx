import { useState, useEffect } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { AdSlot } from "@/components/AdSlot";
import { useSearchParams } from "react-router-dom";

// Mock blog data - in real app this would come from MDX files
const mockPosts = [
  {
    slug: "maximizing-small-lot-design",
    title: "Maximizing Small Lot Design in Metro Manila",
    excerpt: "Complete guide to designing functional homes on small urban lots in Metro Manila",
    coverImage: "/images/small-lot-design.jpg",
    publishAt: "2024-12-01T10:00:00Z",
    tags: ["small-spaces", "urban", "philippines"]
  },
  {
    slug: "budget-friendly-materials",
    title: "Budget-Friendly Materials for Philippine Climate",
    excerpt: "Smart material choices that perform well in tropical conditions without breaking the bank",
    coverImage: "/images/materials.jpg",
    publishAt: "2024-12-05T10:00:00Z",
    tags: ["materials", "budget", "climate"]
  },
  {
    slug: "ventilation-strategies",
    title: "Ventilation Strategies for Hot and Humid Weather",
    excerpt: "Natural cooling techniques that reduce energy costs and improve comfort",
    coverImage: "/images/ventilation.jpg",
    publishAt: "2024-12-10T10:00:00Z",
    tags: ["ventilation", "climate", "cooling"]
  }
];

const Blog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState(mockPosts);
  const [filteredPosts, setFilteredPosts] = useState(mockPosts);
  
  const currentPage = parseInt(searchParams.get('page') || '1');
  const selectedTag = searchParams.get('tag') || '';
  const postsPerPage = 10;

  const allTags = Array.from(new Set(posts.flatMap(post => post.tags)));

  useEffect(() => {
    let filtered = posts.filter(post => {
      const publishDate = new Date(post.publishAt);
      const now = new Date();
      return publishDate <= now; // Only show published posts
    });

    if (selectedTag) {
      filtered = filtered.filter(post => post.tags.includes(selectedTag));
    }

    setFilteredPosts(filtered);
  }, [posts, selectedTag]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  const handleTagFilter = (tag: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (tag === selectedTag) {
      newParams.delete('tag');
    } else {
      newParams.set('tag', tag);
    }
    newParams.delete('page'); // Reset to page 1 when filtering
    setSearchParams(newParams);
  };

  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', page.toString());
    setSearchParams(newParams);
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="pt-24 pb-16">
        <Container>
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-heading text-4xl lg:text-5xl font-bold text-text mb-4">
              Design & Construction Blog
            </h1>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              Expert insights, practical tips, and guides for your construction projects
            </p>
          </div>

          <AdSlot className="mb-12 max-w-2xl mx-auto" />

          {/* Tag Filters */}
          <div className="mb-8">
            <h3 className="font-heading font-semibold text-text mb-4">Filter by Topic</h3>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedTag === '' ? 'primary' : 'soft'}
                size="sm"
                onClick={() => handleTagFilter('')}
              >
                All Posts
              </Button>
              {allTags.map(tag => (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? 'primary' : 'soft'}
                  size="sm"
                  onClick={() => handleTagFilter(tag)}
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {paginatedPosts.map((post) => (
              <Card key={post.slug} hover>
                <div className="aspect-video mb-4 rounded-lg overflow-hidden bg-muted">
                  <img 
                    src={post.coverImage} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="mb-3 flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <Badge key={tag} variant="accent">{tag}</Badge>
                  ))}
                </div>
                <h3 className="font-heading text-xl font-semibold text-text mb-2">
                  {post.title}
                </h3>
                <p className="text-text-muted text-sm mb-4">
                  {post.excerpt}
                </p>
                <div className="flex justify-between items-center">
                  <Button variant="ghost" size="sm">
                    Read more →
                  </Button>
                  <span className="text-text-muted text-xs">
                    {new Date(post.publishAt).toLocaleDateString()}
                  </span>
                </div>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mb-12">
              <Button
                variant="soft"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <Button
                  key={page}
                  variant={currentPage === page ? 'primary' : 'soft'}
                  size="sm"
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </Button>
              ))}
              
              <Button
                variant="soft"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}

          <AdSlot className="max-w-2xl mx-auto" />
        </Container>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Blog;