import { notFound } from 'next/navigation';
import { blogPosts } from '@/lib/blog-posts';
import StaticPage from '@/components/layout/static-page';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

type BlogPostPageProps = {
    params: {
        slug: string;
    };
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <StaticPage title={`${post.emoji} ${post.title}`}>
        {post.content}
        <div className="text-center pt-8">
            <Button asChild variant="outline">
                <Link href="/blog">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Blog
                </Link>
            </Button>
        </div>
    </StaticPage>
  );
}
