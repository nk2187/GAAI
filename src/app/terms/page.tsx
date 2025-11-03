import Link from 'next/link';
import StaticPage from '@/components/layout/static-page';

export default function TermsAndConditionsPage() {
  return (
    <StaticPage title="Terms & Conditions">
        <p className="font-bold">Welcome to GrowArt AI. By accessing and using our website and services, you agree to comply with and be bound by the following terms and conditions.</p>
        
        <ul className="space-y-4 list-disc pl-6">
            <li>
              <span className="font-bold">Service Usage:</span> GrowArt AI provides AI-generated caption and hashtag suggestions for informational and creative purposes. You are responsible for the final content you post. The service is provided "as is," without warranties of any kind.
            </li>
            <li>
              <span className="font-bold">Intellectual Property:</span> You retain all ownership rights to the artwork you upload. By using our service, you grant GrowArt AI a temporary, non-exclusive license to process your image for the sole purpose of generating content. We claim no ownership over user-uploaded art or the AI-generated output.
            </li>
            <li>
              <span className="font-bold">User Conduct:</span> You agree not to use the service for any unlawful purpose or to upload content that is defamatory, hateful, or infringes on the rights of others. Misuse of the service, including attempts to reverse-engineer or resell AI outputs without permission, is strictly prohibited.
            </li>
            <li>
              <span className="font-bold">AI Disclaimer:</span> AI-generated content can be unpredictable. While we strive to provide high-quality suggestions, we do not guarantee any specific outcomes, such as increased engagement, virality, or follower growth on social media platforms.
            </li>
            <li>
              <span className="font-bold">Limitation of Liability:</span> GrowArt AI is not liable for any direct, indirect, or consequential damages arising from your use of the service, including any inaccuracies in the AI-generated content or decisions you make based on it.
            </li>
            <li>
              <span className="font-bold">Changes to Terms:</span> We reserve the right to modify these terms at any time. We will notify users of significant changes, but your continued use of the website after updates constitutes your acceptance of the new terms.
            </li>
        </ul>

        <p>For any questions or clarification regarding these terms, please reach out via our <Link href="/contact" className="text-primary underline hover:text-primary/80">Contact Us</Link> page.</p>
    </StaticPage>
  );
}
