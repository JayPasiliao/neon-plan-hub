# Home Design & Planning Hub

A comprehensive platform for Philippine home design and construction planning, featuring AI-powered floor plan generation, professional tools, and expert guidance.

## 🚀 Features

- **AI Floor Plan Designer** - Generate custom floor plans using AI or local algorithms
- **Professional Tools** - Construction calculators and planning utilities
- **Expert Blog** - Comprehensive guides and tips for Philippine construction
- **Affiliate System** - Integrated product recommendations
- **AdSense Ready** - Built-in advertising support
- **SEO Optimized** - Sitemap, RSS feeds, and meta tags

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **Routing**: React Router v6
- **Content**: MDX with frontmatter
- **3D Graphics**: Three.js (coming soon)
- **Build Tool**: Vite

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd neon-plan-hub-2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_ADSENSE_CLIENT=your-adsense-client-id
   VITE_GA_ID=your-google-analytics-id
   VITE_OPENAI_API_KEY=your-openai-api-key
   ```

4. **Generate content**
   ```bash
   npm run gen:posts
   npm run gen:sitemap
   npm run gen:rss
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run gen:posts` - Generate blog posts from topics
- `npm run gen:sitemap` - Generate XML sitemap
- `npm run gen:rss` - Generate RSS feed

## 📁 Project Structure

```
neon-plan-hub-2/
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/              # Page components
│   ├── lib/                # Utility libraries
│   ├── types/              # TypeScript type definitions
│   └── hooks/              # Custom React hooks
├── content/
│   ├── posts/              # MDX blog posts
│   └── topics.json         # Post generation topics
├── public/
│   ├── data/               # Static data files
│   └── images/             # Public images
└── scripts/                # Build and generation scripts
```

## 🎨 Customization

### Styling
The project uses Tailwind CSS with a custom dark neon theme. Colors and styling can be modified in:
- `tailwind.config.ts` - Tailwind configuration
- `src/index.css` - Global styles and CSS variables

### Content
- **Blog Posts**: Edit `content/topics.json` and run `npm run gen:posts`
- **Affiliate Products**: Modify `public/data/affiliates.json`
- **Navigation**: Update `src/components/SiteHeader.tsx`

### AI Integration
- **OpenAI**: Set `VITE_OPENAI_API_KEY` for AI-powered floor plan generation
- **Local Generation**: Always available as fallback

## 📊 SEO & Analytics

### Google Analytics
Set `VITE_GA_ID` to enable Google Analytics tracking.

### AdSense
Set `VITE_ADSENSE_CLIENT` to enable AdSense ads. Ad slots are automatically placed throughout the site.

### Sitemap & RSS
- **Sitemap**: Automatically generated at `/sitemap.xml`
- **RSS Feed**: Available at `/rss.xml`
- **Robots.txt**: Configured for search engine crawling

## 🏗️ AI Designer Features

### Floor Plan Generation
- **AI Mode**: Uses OpenAI GPT-4 for intelligent room layouts
- **Local Mode**: Algorithm-based generation without API calls
- **Customizable**: Lot dimensions, storeys, room requirements

### Export Options
- **2D Plans**: SVG and PNG formats
- **3D Models**: glTF format (coming soon)
- **Statistics**: Area calculations and efficiency metrics

## 💰 Monetization

### AdSense Integration
- Automatic ad placement throughout the site
- Responsive ad units
- Environment-gated loading

### Affiliate System
- Product recommendations in blog posts
- Multiple marketplace support (Lazada, Shopee, Amazon)
- Commission tracking ready

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel/Netlify
The project is configured for modern deployment platforms. Simply connect your repository and deploy.

### Environment Variables
Ensure all required environment variables are set in your deployment platform.

## 📱 Responsive Design

- **Mobile First**: Optimized for all screen sizes
- **PWA Ready**: Progressive Web App capabilities
- **Touch Friendly**: Optimized for mobile interactions

## 🔒 Security

- **Environment Variables**: Sensitive data stored in `.env`
- **Input Validation**: Form inputs properly validated
- **XSS Protection**: Content safely rendered

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code examples

## 🎯 Roadmap

- [ ] Full Three.js 3D integration
- [ ] Advanced AI room optimization
- [ ] User accounts and saved designs
- [ ] Mobile app development
- [ ] Multi-language support
- [ ] Advanced analytics dashboard

---

Built with ❤️ for the Philippine construction community