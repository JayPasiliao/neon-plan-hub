import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { AdSlot } from "@/components/AdSlot";
import { useState, useEffect } from "react";
import { getRecentPosts } from "@/lib/posts";
import { PostMetadata } from "@/lib/posts";
import dashboardHero from "@/assets/dashboard-hero.jpg";
import mobileApp from "@/assets/mobile-app.jpg";
import featureHouse from "@/assets/feature-house.jpg";

const Index = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [guides, setGuides] = useState<PostMetadata[]>([]);

  useEffect(() => {
    const recentPosts = getRecentPosts(6);
    setGuides(recentPosts);
  }, []);

  const tools = [
    {
      title: "AI Designer",
      description: "Generate custom floor plans with AI or local algorithms.",
      icon: "🏗️",
      href: "/ai-designer",
    },
    {
      title: "Tools & Calculators", 
      description: "Budget estimators and planning tools for your project.",
      icon: "📐",
      href: "/tools",
    },
    {
      title: "Expert Guides",
      description: "Comprehensive guides and tips from industry professionals.",
      icon: "📚",
      href: "/blog",
    },
  ];

  const faqs = [
    {
      question: "What are the pricing options?",
      answer: "We offer flexible pricing with free tools for basic use and premium plans starting at ₱299/month for advanced AI features and unlimited projects.",
    },
    {
      question: "How do Wise/GCash payouts work?",
      answer: "Earnings from affiliate partnerships and referrals are paid monthly via Wise or GCash, with a minimum payout threshold of ₱1,000.",
    },
    {
      question: "How can I get AdSense approval?",
      answer: "Focus on creating quality content, ensure your site has proper privacy policies, and maintain consistent traffic. We provide guides to help you through the process.",
    },
    {
      question: "Are affiliate links allowed?",
      answer: "Yes, we support ethical affiliate marketing for construction tools, materials, and design software that benefit our community.",
    },
    {
      question: "How do I install the PWA?",
      answer: "On mobile browsers, look for the 'Add to Home Screen' option. On desktop, click the install icon in your browser's address bar.",
    },
  ];

  const trustLogos = ["Company A", "Company B", "Company C", "Company D"];

  return (
    <div className="min-h-screen bg-background grid-bg">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 spotlight-glow"></div>
        <Container className="relative">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="accent" className="mb-6">
              Trusted by 3M+ users
            </Badge>
            
            <h1 className="font-heading text-4xl lg:text-6xl font-bold text-text mb-6 leading-tight">
              AI Powered Design Tools{" "}
              <span className="text-gradient">For Architects</span>
            </h1>
            
            <p className="text-xl text-text-muted mb-8 max-w-2xl mx-auto">
              Design help from sketch to layout, quick budgets, and planning guides.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button variant="primary" size="lg">
                Go to Dashboard
              </Button>
              <Button variant="soft" size="lg">
                Download App
              </Button>
            </div>

            {/* Trust Logos */}
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {trustLogos.map((logo, index) => (
                <div key={index} className="text-text-muted text-sm">
                  {logo}
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image */}
          <div className="mt-16 relative">
            <div className="max-w-4xl mx-auto">
              <div className="relative rounded-lg overflow-hidden shadow-glow">
                <img 
                  src={dashboardHero} 
                  alt="AI Design Dashboard" 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Tools Section */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-text mb-4">
              Build with Our Tools
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              Powerful AI-driven tools designed specifically for Philippine architecture and design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <Card key={index} hover className="text-center">
                <div className="text-4xl mb-4">{tool.icon}</div>
                <h3 className="font-heading text-xl font-semibold text-text mb-3">
                  {tool.title}
                </h3>
                <p className="text-text-muted mb-6">
                  {tool.description}
                </p>
                <Button variant="soft" className="w-full" asChild>
                  <a href={tool.href}>
                    Try Tool
                  </a>
                </Button>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Feature Band */}
      <section className="py-16 lg:py-24 bg-surface">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-text mb-6">
                Built for Philippine Architecture
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-accent mr-3 mt-1">✓</span>
                  <span className="text-text-muted">
                    Philippines-ready guidelines and examples
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-3 mt-1">✓</span>
                  <span className="text-text-muted">
                    Quick estimators for budget planning
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-3 mt-1">✓</span>
                  <span className="text-text-muted">
                    Simple outputs you can print or share
                  </span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <img 
                src={featureHouse} 
                alt="Modern Philippine House" 
                className="w-full h-auto rounded-lg shadow-card"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Download Section */}
      <section id="download" className="py-16 lg:py-24">
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-text mb-4">
              Download
            </h2>
            <p className="text-text-muted text-lg">
              Get the app on all your devices
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Mobile Download */}
            <Card hover className="text-center">
              <div className="mb-6">
                <img 
                  src={mobileApp} 
                  alt="Mobile App" 
                  className="w-32 h-40 mx-auto rounded-lg shadow-card object-cover"
                />
              </div>
              <h3 className="font-heading text-xl font-semibold text-text mb-4">
                Download for Mobile
              </h3>
              <div className="space-y-3">
                <Button variant="primary" className="w-full">
                  Download iOS
                </Button>
                <Button variant="soft" className="w-full">
                  Download Android
                </Button>
              </div>
            </Card>

            {/* Desktop Download */}
            <Card hover className="text-center">
              <div className="mb-6">
                <div className="w-32 h-32 mx-auto bg-muted rounded-lg flex items-center justify-center">
                  <span className="text-4xl">💻</span>
                </div>
              </div>
              <h3 className="font-heading text-xl font-semibold text-text mb-4">
                Download for Desktop
              </h3>
              <div className="space-y-3">
                <Button variant="primary" className="w-full">
                  Windows
                </Button>
                <Button variant="soft" className="w-full">
                  Mac
                </Button>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* Latest Guides */}
      <section className="py-16 lg:py-24 bg-surface">
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-text mb-4">
              Latest Guides
            </h2>
            <p className="text-text-muted text-lg">
              Expert insights and practical tips for your next project
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {guides.map((guide, index) => (
              <Card key={index} hover>
                <div className="aspect-video mb-4 rounded-lg overflow-hidden bg-muted">
                  <img 
                    src={guide.coverImage} 
                    alt={guide.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mb-3 flex flex-wrap gap-2">
                  {guide.tags.slice(0, 2).map(tag => (
                    <Badge key={tag} variant="accent">{tag}</Badge>
                  ))}
                </div>
                <h3 className="font-heading text-lg font-semibold text-text mb-2">
                  {guide.title}
                </h3>
                <p className="text-text-muted text-sm mb-4">
                  {guide.excerpt}
                </p>
                <Button variant="ghost" size="sm" asChild>
                  <a href={`/blog/${guide.slug}`}>
                    Read guide →
                  </a>
                </Button>
              </Card>
            ))}
          </div>

          <AdSlot className="max-w-2xl mx-auto" />
        </Container>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 lg:py-24">
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-text mb-4">
              FAQ
            </h2>
            <p className="text-text-muted text-lg">
              Common questions about our platform
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="cursor-pointer" onClick={() => setOpenFaq(openFaq === index ? null : index)}>
                <div className="flex justify-between items-center">
                  <h3 className="font-heading font-semibold text-text">
                    {faq.question}
                  </h3>
                  <span className="text-accent text-xl">
                    {openFaq === index ? '−' : '+'}
                  </span>
                </div>
                {openFaq === index && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-text-muted">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Strip */}
      <section className="py-16 bg-accent/5 border-y border-accent/20">
        <Container>
          <div className="text-center">
            <h2 className="font-heading text-2xl lg:text-3xl font-bold text-text mb-4">
              Plan smarter. Build better.
            </h2>
            <Button variant="primary" size="lg">
              Explore Tools
            </Button>
          </div>
        </Container>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Index;