import fs from 'fs';
import path from 'path';

interface Topic {
  title: string;
  tags: string[];
  excerpt: string;
}

interface AffiliateProduct {
  sku: string;
  title: string;
  description?: string;
  url: string;
  image: string;
  price?: string;
  source: string;
}

// Load topics and affiliates
const topicsPath = path.join(process.cwd(), 'content', 'topics.json');
const affiliatesPath = path.join(process.cwd(), 'public', 'data', 'affiliates.json');
const postsDir = path.join(process.cwd(), 'content', 'posts');

// Ensure posts directory exists
if (!fs.existsSync(postsDir)) {
  fs.mkdirSync(postsDir, { recursive: true });
}

const topics: Topic[] = JSON.parse(fs.readFileSync(topicsPath, 'utf-8'));
const affiliates: AffiliateProduct[] = JSON.parse(fs.readFileSync(affiliatesPath, 'utf-8'));

// Generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Generate publish date (staggered every 2-3 days starting tomorrow)
function generatePublishDate(index: number): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  // Add 2-3 days for each post
  const publishDate = new Date(tomorrow);
  publishDate.setDate(publishDate.getDate() + (index * (2 + (index % 2))));
  
  return publishDate.toISOString().split('T')[0];
}

// Generate random affiliate products
function getRandomAffiliates(count: number = 2): string[] {
  const shuffled = [...affiliates].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map(a => a.sku);
}

// Generate post content template
function generatePostContent(topic: Topic, affiliateSkus: string[]): string {
  const affiliateProducts = affiliates.filter(a => affiliateSkus.includes(a.sku));
  
  return `---
title: "${topic.title}"
slug: "${generateSlug(topic.title)}"
excerpt: "${topic.excerpt}"
coverImage: "/images/posts/${generateSlug(topic.title)}.jpg"
tags: [${topic.tags.map(tag => `"${tag}"`).join(', ')}]
publishAt: "${generatePublishDate(Math.floor(Math.random() * 10))}"
updatedAt: "${new Date().toISOString().split('T')[0]}"
readingTime: ${Math.floor(Math.random() * 10) + 5}
affiliateSkus: [${affiliateSkus.map(sku => `"${sku}"`).join(', ')}]
---

# ${topic.title}

${topic.excerpt}

## Key Takeaways

- **Space Efficiency**: Maximize every square meter of your Philippine home
- **Climate Considerations**: Design for tropical weather and humidity
- **Budget Optimization**: Smart choices that save money without compromising quality
- **Local Context**: Solutions that work specifically for Philippine conditions

## Cost Breakdown

| Item | Basic | Standard | Premium |
|------|-------|----------|---------|
| Materials | ₱15,000/sqm | ₱25,000/sqm | ₱40,000/sqm |
| Labor | ₱8,000/sqm | ₱12,000/sqm | ₱18,000/sqm |
| Finishes | ₱5,000/sqm | ₱10,000/sqm | ₱20,000/sqm |
| **Total** | **₱28,000/sqm** | **₱47,000/sqm** | **₱78,000/sqm** |

## Practical Tips

1. **Start with a Plan**: Always begin with detailed planning and measurements
2. **Consider the Climate**: Choose materials that handle humidity and heat well
3. **Think Long-term**: Invest in quality where it matters most
4. **Local Expertise**: Work with contractors who understand Philippine conditions
5. **Flexible Design**: Create spaces that can adapt to changing needs

## Product Recommendations

${affiliateProducts.map(product => `
### ${product.title}
${product.description || 'Essential tool for your project'}
- **Price**: ${product.price}
- **Source**: [${product.source}](${product.url})
`).join('\n')}

## Next Steps

Ready to start your project? Use our [AI Designer](/ai-designer) tool to create custom floor plans, or explore our [Tools](/tools) page for calculators and estimators.

For more guidance, check out our other guides in the [Blog](/blog) section.
`;
}

// Generate posts
console.log('Generating posts from topics...');

topics.forEach((topic, index) => {
  const slug = generateSlug(topic.title);
  const affiliateSkus = getRandomAffiliates(2);
  const content = generatePostContent(topic, affiliateSkus);
  
  const filePath = path.join(postsDir, `${slug}.mdx`);
  
  // Only create if file doesn't exist
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Created: ${slug}.mdx`);
  } else {
    console.log(`⏭️  Skipped: ${slug}.mdx (already exists)`);
  }
});

console.log(`\n🎉 Generated ${topics.length} posts!`);
console.log('📁 Check the content/posts/ directory for your new MDX files.');