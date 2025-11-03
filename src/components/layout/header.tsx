import Link from 'next/link';
import Logo from './logo';
import { Button } from '../ui/button';

export default function Header() {
  return (
    <header className="py-4 px-4 md:px-8 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Logo className="h-8 w-auto text-primary group-hover:animate-pulse" />
          <h1 className="text-2xl font-headline font-bold text-foreground">
            GrowArt AI
          </h1>
        </Link>
        <nav>
          <Button asChild variant="ghost">
            <Link href="/blog">Blog</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
