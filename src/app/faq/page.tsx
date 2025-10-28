import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import StaticPage from '@/components/layout/static-page';

const faqs = [
  {
    question: "What is GrowArt AI?",
    answer: "GrowArt AI is an AI-powered tool designed to help artists create engaging captions and hashtags for their artwork. It supports both new and professional creators in sharing their art more effectively online."
  },
  {
    question: "Is it free to use?",
    answer: "Yes, GrowArt AI is completely free to use. Our goal is to help every artist grow their audience and express their creativity without any cost barriers."
  },
  {
    question: "How does the AI generate captions?",
    answer: "Our AI analyzes your uploaded artwork and combines it with trending keywords and artistic themes to create unique, context-based captions and hashtags suitable for social media."
  },
  {
    question: "Will my uploaded images be stored or shared?",
    answer: "No. Uploaded images are used only once for caption generation and are not stored, shared, or used for any other purpose."
  },
  {
    question: "Can artists collaborate through this site?",
    answer: "Yes, we encourage artist collaborations. You can use the “Let’s Collab” option on the website to discover and connect with others who share similar creative goals."
  }
]

export default function FaqPage() {
  return (
    <StaticPage title="Frequently Asked Questions">
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger className="font-headline text-xl text-left hover:no-underline">{faq.question}</AccordionTrigger>
            <AccordionContent className="text-base">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </StaticPage>
  );
}
