import StaticPage from '@/components/layout/static-page';

export default function PrivacyPolicyPage() {
  return (
    <StaticPage title="Privacy Policy">
      <p>
        At GrowArt AI, we are committed to protecting your privacy. This Privacy Policy outlines how we handle your information when you use our services. Your trust is important to us, and we are dedicated to being transparent about our data practices.
      </p>

      <h3 className="font-headline text-2xl pt-4">Image & Data Privacy</h3>
      <p>
        We do not store, share, or sell any images you upload. Your artwork is processed in real-time for the sole purpose of generating captions and hashtags. Once the generation is complete, the image is discarded from our system permanently. We do not use your art to train our AI models.
      </p>

      <h3 className="font-headline text-2xl pt-4">Information We Collect</h3>
      <p>
        We use Google Analytics to collect anonymous data about website traffic, such as page views and user interaction patterns. This information helps us understand how our tools are being used so we can improve the user experience. This data is aggregated and does not personally identify you.
      </p>

      <h3 className="font-headline text-2xl pt-4">Cookies</h3>
      <p>
        Our website uses cookies to enhance functionality. For example, your generated content history is stored locally on your browser using localStorage, allowing you to access past results without re-uploading your art. You can clear your browser's cache and cookies at any time to remove this data.
      </p>

      <h3 className="font-headline text-2xl pt-4">Third-Party Links</h3>
      <p>
        The website may include links to external sites, such as our Instagram page. We are not responsible for the content or privacy practices of these third-party sites. We encourage you to review their privacy policies before engaging with them.
      </p>

      <h3 className="font-headline text-2xl pt-4">Changes to This Policy</h3>
      <p>
        We may update this Privacy Policy occasionally to reflect changes in our practices or for other operational, legal, or regulatory reasons. Your continued use of the website after any changes implies your acceptance of the new policy.
      </p>
    </StaticPage>
  );
}
