# Home Design & Planning Hub

A modern, income-ready web application for architecture and construction planning, built with React, Vite, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Dark Neon Design**: Modern UI with lime accent colors and grid backgrounds
- **Monetization Ready**: AdSense integration and affiliate product system
- **Professional Tools**: Construction calculators and planning tools
- **Content Management**: Blog system with auto-publishing
- **SEO Optimized**: Meta tags, structured data, and performance optimized

## 💰 Monetization Features

### AdSense Integration
Set your AdSense client ID to enable ads:
```bash
# Add to your environment
VITE_ADSENSE_CLIENT=ca-pub-your-client-id
```

Ad slots are automatically placed:
- Home page: after hero, after tools, after guides
- Blog list: top and bottom of page
- Blog posts: after intro and near end
- Tools page: between calculators

### Affiliate System
Edit `/src/data/affiliates.json` to add your affiliate products:
```json
{
  "sku": "unique-id",
  "title": "Product Name",
  "url": "https://affiliate-link.com",
  "image": "product-image-url",
  "price": "₱1,299",
  "source": "Lazada"
}
```

Add `affiliateSkus` to blog post frontmatter to display products:
```yaml
affiliateSkus: ["lazada-laser-meter", "shopee-wall-table"]
```

## 📝 Blog & Content

### Auto-Publishing
Posts with `publishAt` dates in the future remain hidden until the publish date. The system automatically shows only published content.

### Blog Structure
- Posts: `/src/content/posts/*.mdx`
- Frontmatter required: `title`, `excerpt`, `coverImage`, `publishAt`, `tags`
- Optional: `affiliateSkus` for product recommendations

### Generate Bulk Posts
```bash
npm run gen:posts
```
Creates 40+ posts from topics in `/src/data/topics.json`, scheduled every 2-3 days starting tomorrow.

## 🛠️ Tools

The tools page includes three calculators:

1. **Lot to Sample Plan**: Estimates usable area and suggests layouts
2. **Room Dimension Calculator**: Calculates area and furniture recommendations  
3. **Construction Budget Estimator**: Estimates costs with PHP/USD conversion

## 📊 Analytics & SEO

### Google Analytics
```bash
VITE_GA_ID=GA_MEASUREMENT_ID
```

### SEO Features
- Automatic meta tags and Open Graph
- Semantic HTML structure
- Performance optimized images
- Clean URLs and proper navigation

## 🚀 Development

### Setup
```bash
npm install
npm run dev
```

### Environment Variables
```bash
# Optional - for monetization
VITE_ADSENSE_CLIENT=ca-pub-your-client-id
VITE_GA_ID=GA_MEASUREMENT_ID
```

### Build
```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Route components
├── data/               # JSON data files
├── content/posts/      # Blog posts (MDX)
├── lib/               # Utilities and helpers
└── assets/            # Images and static files

scripts/
└── generate-posts.ts   # Bulk post generator
```

## 🎨 Design System

The design uses semantic tokens defined in `src/index.css`:
- Colors: HSL values for dark neon theme
- Gradients: Accent-based gradients
- Typography: Inter (body) + Plus Jakarta Sans (headings)
- Components: Consistent spacing and hover effects

## 🌐 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Build Outputs
- Static files: `dist/`
- Optimized for modern browsers
- Code splitting and lazy loading enabled

## 📈 Income Optimization

### AdSense Best Practices
- Content quality drives approval and revenue
- Strategic ad placement for user experience
- Mobile-optimized responsive ads

### Affiliate Strategy
- Choose products relevant to your audience
- Honest reviews and recommendations
- Clear disclosure of affiliate relationships

### Content Strategy
- Regular publishing schedule (automated)
- SEO-optimized content
- Local market focus (Philippines)

## 🔧 Customization

### Adding New Tools
1. Create calculator component in `/src/pages/Tools.tsx`
2. Add form inputs and calculation logic
3. Style with existing design system

### Custom Affiliate Sources
1. Update `/src/data/affiliates.json`
2. Add new source logos/branding
3. Update tracking parameters

### Blog Customization
1. Modify post templates in `/scripts/generate-posts.ts`
2. Add new topics in `/src/data/topics.json`
3. Customize styling in blog components

## 📄 License

MIT License - feel free to use for commercial projects.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

---

Built with ❤️ for the Philippine construction and design community.