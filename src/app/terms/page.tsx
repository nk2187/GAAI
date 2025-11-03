import StaticPage from '@/components/layout/static-page';

export default function TermsAndConditionsPage() {
  return (
    <StaticPage title="Terms & Conditions">
        <p className="font-bold">Welcome to GrowArt AI — your creative partner powered by artificial intelligence.</p>
        <p>By using this website, you agree to the following terms:</p>
        <ul className="space-y-4 list-disc pl-6">
            <li>
            <span className="font-bold">Usage:</span> GrowArt AI provides caption and hashtag suggestions for artists and creators. All generated content is for informational and creative purposes only.
            </li>
            <li>
            <span className="font-bold">Intellectual Property:</span> All original art uploaded or referenced belongs to the respective creator. GrowArt AI claims no ownership of user-generated or AI-assisted content.
            </li>
            <li>
            <span className="font-bold">AI Disclaimer:</span> Since AI results vary, we do not guarantee any specific engagement, reach, or outcome on social platforms.
            </li>
            <li>
            <span className="font-bold">Restrictions:</span> Users must not misuse or resell AI outputs or attempt to exploit the service for illegal or unethical activities.
            </li>
            <li>
            <span className="font-bold">Changes:</span> GrowArt AI reserves the right to update these terms at any time without prior notice. Continued use of the website implies agreement to the latest version.
            </li>
        </ul>
        <p>For questions, please reach out via our <a href="/contact" className="text-primary underline">Contact Us</a> page.</p>
    </StaticPage>
  );
}
