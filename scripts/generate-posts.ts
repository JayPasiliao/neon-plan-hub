import fs from 'fs';
import path from 'path';
import topicsData from '../src/data/topics.json';
import affiliatesData from '../src/data/affiliates.json';

interface Topic {
  title: string;
  tags: string[];
}

const topics: Topic[] = topicsData;
const affiliates = affiliatesData;

const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

const getRandomAffiliateSkus = (count: number = 2): string[] => {
  const shuffled = [...affiliates].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map(a => a.sku);
};

const generatePostContent = (topic: Topic): string => {
  const randomSkus = getRandomAffiliateSkus();
  
  return `---
title: "${topic.title}"
excerpt: "Comprehensive guide covering ${topic.title.toLowerCase()} with practical tips and expert insights"
coverImage: "/images/${generateSlug(topic.title)}.jpg"
publishAt: "{{PUBLISH_DATE}}"
tags: ${JSON.stringify(topic.tags)}
affiliateSkus: ${JSON.stringify(randomSkus)}
---

# ${topic.title}

This comprehensive guide covers everything you need to know about ${topic.title.toLowerCase()}, providing practical insights for your construction and design projects.

## Key Takeaways

- **Expert insights** from industry professionals
- **Cost-effective solutions** that fit your budget
- **Local considerations** for Philippine conditions
- **Step-by-step guidance** for implementation
- **Quality standards** to ensure lasting results

## Cost Analysis

| Category | Budget Option | Standard Option | Premium Option |
|----------|---------------|-----------------|----------------|
| Materials | ₱15,000 - ₱25,000 | ₱25,000 - ₱45,000 | ₱45,000 - ₱80,000 |
| Labor | ₱8,000 - ₱15,000 | ₱15,000 - ₱25,000 | ₱25,000 - ₱40,000 |
| Total | ₱23,000 - ₱40,000 | ₱40,000 - ₱70,000 | ₱70,000 - ₱120,000 |

*Prices may vary based on location, materials, and contractor rates*

## Practical Implementation Tips

### 1. Planning Phase
- Assess your specific needs and requirements
- Research local building codes and regulations
- Get multiple quotes from qualified contractors
- Create a detailed timeline and budget

### 2. Material Selection
- Choose appropriate materials for your climate
- Balance cost with quality and durability
- Consider long-term maintenance requirements
- Source from reputable local suppliers

### 3. Quality Control
- Regular inspections during construction
- Verify all work meets building standards
- Document progress with photos
- Address issues immediately as they arise

## Common Challenges and Solutions

Understanding potential challenges helps you prepare better and avoid costly mistakes during your project.

### Budget Management
- Always include a 10-15% contingency fund
- Track expenses carefully throughout the project
- Prioritize essential features over nice-to-haves
- Consider phased implementation for larger projects

### Weather Considerations
- Plan construction timing around weather patterns
- Protect materials and work areas from rain
- Allow for weather-related delays in scheduling
- Use appropriate weather-resistant materials

## Professional vs DIY Considerations

While some aspects can be handled as DIY projects, others require professional expertise for safety and quality.

### DIY-Friendly Tasks
- Basic planning and research
- Material sourcing and comparison
- Simple finishing work
- Regular maintenance tasks

### Professional Required
- Structural modifications
- Electrical and plumbing work
- Foundation and major construction
- Building permit applications

## Product Picks

The right tools and materials make a significant difference in project success. Check out our recommended products below for quality solutions that deliver reliable results.`;
};

const generatePosts = () => {
  const contentDir = path.join(process.cwd(), 'src/content/posts');
  
  // Create content directory if it doesn't exist
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
  }

  // Generate dates starting tomorrow, every 2-3 days
  const startDate = new Date();
  startDate.setDate(startDate.getDate() + 1); // Start tomorrow

  topics.forEach((topic, index) => {
    const slug = generateSlug(topic.title);
    const fileName = `${slug}.mdx`;
    const filePath = path.join(contentDir, fileName);

    // Skip if file already exists
    if (fs.existsSync(filePath)) {
      console.log(`Skipping ${fileName} - already exists`);
      return;
    }

    // Calculate publish date (every 2-3 days)
    const daysToAdd = index * (2 + Math.floor(Math.random() * 2)); // 2-3 days
    const publishDate = new Date(startDate);
    publishDate.setDate(startDate.getDate() + daysToAdd);

    // Generate content
    const content = generatePostContent(topic);
    const finalContent = content.replace('{{PUBLISH_DATE}}', publishDate.toISOString());

    // Write file
    fs.writeFileSync(filePath, finalContent, 'utf8');
    console.log(`Generated: ${fileName} (publish: ${publishDate.toISOString().split('T')[0]})`);
  });

  console.log(`\nGenerated ${topics.length} blog posts in ${contentDir}`);
  console.log('Posts are scheduled to publish every 2-3 days starting tomorrow.');
};

// Run the generator
generatePosts();