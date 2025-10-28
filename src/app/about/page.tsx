import StaticPage from '@/components/layout/static-page';

export default function AboutUsPage() {
  return (
    <StaticPage title="About Us">
      <p>
        “GrowArt AI” is a creative AI-powered platform built to help artists share their work and grow online. It provides free caption and hashtag generation tools that help artists express their creativity and save time.
      </p>
      <p>
        Our mission is to support every artist in building a strong online presence through technology and community.
      </p>
      <p>
        We believe in empowering creators by making content creation simple, accessible, and inspiring.
      </p>
      <p className="font-bold text-center pt-4 font-headline text-2xl">
        GrowArt AI — where creativity meets innovation.
      </p>
    </StaticPage>
  );
}
