import Link from 'next/link';

export default function Footer() {
  const links = [
    { name: 'About Us', href: '/about' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <footer className="py-6 px-4 md:px-8 border-t border-border/40 mt-auto bg-background">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} GrowArt AI. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:gap-6">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm hover:underline underline-offset-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
