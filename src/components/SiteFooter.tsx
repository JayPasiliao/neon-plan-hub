import { Container } from "./Container";
import { Button } from "./Button";

export const SiteFooter = () => {
  const productLinks = [
    { label: "Tools", href: "/tools" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Mobile App", href: "#download" },
    { label: "Desktop App", href: "#download" },
  ];

  const companyLinks = [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy", href: "/privacy" },
  ];

  const resourceLinks = [
    { label: "Documentation", href: "/docs" },
    { label: "Guides", href: "/guides" },
    { label: "FAQ", href: "#faq" },
    { label: "Support", href: "/support" },
  ];

  const socialIcons = [
    { name: "Twitter", href: "#" },
    { name: "Facebook", href: "#" },
    { name: "Instagram", href: "#" },
    { name: "LinkedIn", href: "#" },
  ];

  return (
    <footer className="bg-surface border-t border-border">
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <h3 className="font-heading font-bold text-lg text-text">
                Home Design Hub
              </h3>
              <p className="text-text-muted text-sm">
                AI-powered design tools for architects and designers in the Philippines.
              </p>
              <Button variant="soft" size="sm">
                ☕ Buy Me a Coffee
              </Button>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-heading font-semibold text-text mb-4">Product</h4>
              <ul className="space-y-2">
                {productLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-text-muted hover:text-text transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-heading font-semibold text-text mb-4">Company</h4>
              <ul className="space-y-2">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-text-muted hover:text-text transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-heading font-semibold text-text mb-4">Resources</h4>
              <ul className="space-y-2">
                {resourceLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-text-muted hover:text-text transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="flex flex-col md:flex-row justify-between items-center mt-12 pt-8 border-t border-border">
            <p className="text-text-muted text-sm">
              © 2024 Home Design & Planning Hub. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              {socialIcons.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-text-muted hover:text-accent transition-colors"
                  aria-label={social.name}
                >
                  <div className="w-5 h-5 bg-text-muted rounded"></div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};