'use server';

/**
 * @fileOverview An AI agent for generating Instagram captions and hashtags for artwork.
 *
 * - generateInstagramCaption - A function that handles the generation of Instagram captions and hashtags.
 * - GenerateInstagramCaptionInput - The input type for the generateInstagramCaption function.
 * - GenerateInstagramCaptionOutput - The return type for the generateInstagramCaption function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateInstagramCaptionInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of the artwork, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  artworkStyle: z.string().optional().describe('The style of the artwork (e.g., abstract, landscape, portrait, digital art).'),
  artworkTheme: z.string().optional().describe('The theme of the artwork (e.g., nature, city, people).'),
  artworkMood: z.string().optional().describe('The mood of the artwork (e.g., happy, sad, peaceful).'),
  artworkColor: z.string().optional().describe('The dominant color of the artwork.'),
});
export type GenerateInstagramCaptionInput = z.infer<typeof GenerateInstagramCaptionInputSchema>;

const GenerateInstagramCaptionOutputSchema = z.object({
  caption: z.object({
    funny: z.string().describe('A funny and witty caption for the artwork.'),
    poetic: z.string().describe('A poetic and expressive caption for the artwork.'),
    deep: z.string().describe('A deep and thought-provoking caption for the artwork.'),
    minimalist: z.string().describe('A minimalist and concise caption for the artwork.'),
  }).describe('A collection of catchy and engaging Instagram captions for the artwork in different styles.'),
  hashtags: z.string().describe('A string of up to 30 trending and viral hashtags related to the artwork theme, separated by spaces.'),
  bestTimeToPost: z.string().describe('The best time to post the artwork on Instagram in Indian Standard Time (IST).'),
  aiTip: z.array(z.string()).describe('An array of AI tips in bullet points for better reach on Instagram, related to the artwork.'),
});
export type GenerateInstagramCaptionOutput = z.infer<typeof GenerateInstagramCaptionOutputSchema>;

export async function generateInstagramCaption(input: GenerateInstagramCaptionInput): Promise<GenerateInstagramCaptionOutput> {
  return generateInstagramCaptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateInstagramCaptionPrompt',
  input: {schema: GenerateInstagramCaptionInputSchema},
  output: {schema: GenerateInstagramCaptionOutputSchema},
  prompt: `You are an AI assistant specializing in creating engaging Instagram captions and trending hashtags for artists.

  Analyze the artwork based on the following information:
  Style: {{artworkStyle}}
  Theme: {{artworkTheme}}
  Mood: {{artworkMood}}
  Color: {{artworkColor}}
  Photo: {{media url=photoDataUri}}

  Generate a set of short, catchy, and emotional Instagram captions with relevant emojis, optimized for engagement, virality, and follower growth. The set must include variations: one funny, one poetic, one deep, and one minimalist caption.

  Also, generate a single string of up to 30 trending and viral hashtags related to the artwork's theme, separated by spaces, and optimized for reach and discoverability. If live API access isn’t available, generate simulated trending hashtags based on current Instagram trends in art, painting, digital art, or creativity.

  In addition, provide the best time to post in Indian Standard Time (IST) and a list of actionable AI tips (as an array of strings) for better reach related to the specific artwork (e.g., "Ask a question in your caption to encourage comments", "Create a Reel showing the process of this artwork", "Collaborate with another artist who has a similar style").`,
});

const generateInstagramCaptionFlow = ai.defineFlow(
  {
    name: 'generateInstagramCaptionFlow',
    inputSchema: GenerateInstagramCaptionInputSchema,
    outputSchema: GenerateInstagramCaptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
