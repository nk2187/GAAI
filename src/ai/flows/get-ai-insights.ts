'use server';

/**
 * @fileOverview A flow to get AI insights for better reach on social media posts.
 *
 * - getAiInsights - A function that takes artwork details and generates insights for better reach.
 * - GetAiInsightsInput - The input type for the getAiInsights function.
 * - GetAiInsightsOutput - The return type for the getAiInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetAiInsightsInputSchema = z.object({
  artworkTheme: z.string().describe('The theme of the artwork.'),
  artworkStyle: z.string().describe('The style of the artwork (e.g., abstract, landscape, portrait).'),
  generatedCaption: z.string().describe('The AI-generated caption for the artwork.'),
  generatedHashtags: z.string().describe('The AI-generated hashtags for the artwork.'),
});
export type GetAiInsightsInput = z.infer<typeof GetAiInsightsInputSchema>;

const GetAiInsightsOutputSchema = z.object({
  bestTimeToPost: z.string().describe('The best time to post the artwork on Instagram.'),
  trendingHashtags: z.string().describe('Trending hashtags related to the artwork theme.'),
  aiTip: z.string().describe('An AI tip for better reach on Instagram.'),
});
export type GetAiInsightsOutput = z.infer<typeof GetAiInsightsOutputSchema>;

export async function getAiInsights(input: GetAiInsightsInput): Promise<GetAiInsightsOutput> {
  return getAiInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getAiInsightsPrompt',
  input: {schema: GetAiInsightsInputSchema},
  output: {schema: GetAiInsightsOutputSchema},
  prompt: `You are a social media marketing expert specializing in Instagram growth for artists.

  Based on the artwork's theme, style, generated caption, and hashtags, provide the following insights:

  - Best time to post: Suggest the optimal time to post the artwork on Instagram for maximum engagement.
  - Trending hashtags: List trending hashtags related to the artwork's theme to increase reach.
  - AI tip: Provide a single, actionable AI tip for the artist to improve their reach on Instagram.

  Artwork Theme: {{{artworkTheme}}}
  Artwork Style: {{{artworkStyle}}}
  Generated Caption: {{{generatedCaption}}}
  Generated Hashtags: {{{generatedHashtags}}}

  Format your output as a JSON object with the fields: bestTimeToPost, trendingHashtags, and aiTip.
  `,
});

const getAiInsightsFlow = ai.defineFlow(
  {
    name: 'getAiInsightsFlow',
    inputSchema: GetAiInsightsInputSchema,
    outputSchema: GetAiInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
