import fs from 'fs';
import path from 'path';
import { getPublishedPosts } from '../src/lib/posts';

const generateRSS = () => {
  const baseUrl = 'https://yourdomain.com'; // Replace with your actual domain
  const currentDate = new Date().toISOString();
  
  // Get published blog posts
  const publishedPosts = getPublishedPosts();
  
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Home Design & Planning Hub</title>
    <link>${baseUrl}</link>
    <description>Expert insights, practical tips, and guides for your construction projects in the Philippines</description>
    <language>en</language>
    <lastBuildDate>${currentDate}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    
${publishedPosts.map(post => `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid>${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.publishAt).toUTCString()}</pubDate>
      <description><![CDATA[${post.excerpt}]]></description>
      <category>${post.tags.join(', ')}</category>
    </item>`).join('\n')}
  </channel>
</rss>`;

  // Write RSS feed to public directory
  const rssPath = path.join(process.cwd(), 'public', 'rss.xml');
  fs.writeFileSync(rssPath, rss);
  
  console.log(`✅ RSS feed generated with ${publishedPosts.length} posts`);
  console.log(`📁 Saved to: ${rssPath}`);
};

// Run the generator
generateRSS();
