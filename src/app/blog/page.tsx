import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { blogPosts } from '@/lib/blog-posts';

export default function BlogPage() {
  return (
    <div className="container mx-auto py-8 md:py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-headline text-4xl text-center tracking-wide mb-8">
          GrowArt AI Blog
        </h1>
        <div className="grid gap-8">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
              <Card className="shadow-lg hover:shadow-xl hover:border-primary/50 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl group-hover:text-primary transition-colors">
                    {post.emoji} {post.title}
                  </CardTitle>
                  <CardDescription className="pt-2">
                    {post.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="text-primary font-semibold group-hover:underline">Read More &rarr;</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
