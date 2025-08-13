export interface PostMetadata {
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  tags: string[];
  publishAt: string;
  updatedAt: string;
  readingTime: number;
  affiliateSkus?: string[];
}

export interface Post extends PostMetadata {
  content: string;
}

// Import all MDX files
const posts = import.meta.glob('/content/posts/*.mdx', { eager: true });

export function getAllPosts(): PostMetadata[] {
  const postEntries = Object.entries(posts);
  
  return postEntries
    .map(([filepath, post]) => {
      const slug = filepath.replace('/content/posts/', '').replace('.mdx', '');
      
      // Type assertion for the post object
      const postData = post as { frontmatter: PostMetadata };
      
      return {
        ...postData.frontmatter,
        slug,
      };
    })
    .sort((a, b) => new Date(b.publishAt).getTime() - new Date(a.publishAt).getTime());
}

export function getPublishedPosts(now: Date = new Date()): PostMetadata[] {
  return getAllPosts().filter(post => {
    const publishDate = new Date(post.publishAt);
    return publishDate <= now;
  });
}

export function getPostBySlug(slug: string): Post | null {
  const filepath = `/content/posts/${slug}.mdx`;
  const post = posts[filepath];
  
  if (!post) {
    return null;
  }
  
  const postData = post as { frontmatter: PostMetadata; default: any };
  
  return {
    ...postData.frontmatter,
    slug,
    content: postData.default,
  };
}

export function getPostsByTag(tag: string): PostMetadata[] {
  return getPublishedPosts().filter(post => 
    post.tags.includes(tag)
  );
}

export function getRecentPosts(limit: number = 6): PostMetadata[] {
  return getPublishedPosts().slice(0, limit);
}
