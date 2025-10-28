'use server';

/**
 * @fileOverview An AI agent for fetching trending art topics.
 *
 * - getArtTrends - A function that returns a list of trending art hashtags or topics.
 * - GetArtTrendsOutput - The return type for the getArtTrends function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GetArtTrendsOutputSchema = z.object({
  trends: z.array(z.object({
    topic: z.string().describe('The trending topic or hashtag.'),
    description: z.string().describe('A short description of why it is trending.')
  })).describe('An array of the top 5 trending art hashtags or topics.'),
});
export type GetArtTrendsOutput = z.infer<typeof GetArtTrendsOutputSchema>;

export async function getArtTrends(): Promise<GetArtTrendsOutput> {
  return getArtTrendsFlow();
}

const prompt = ai.definePrompt({
  name: 'getArtTrendsPrompt',
  output: { schema: GetArtTrendsOutputSchema },
  prompt: `You are an AI assistant that monitors art trends on social media.

  Provide the top 5 trending art-related hashtags or topics for today. For each trend, include a short description of what it is or why it's popular.

  If you don't have access to real-time data, simulate the trends based on current popular themes in the art community (e.g., specific art challenges, new software/techniques, popular aesthetics).`,
});

const getArtTrendsFlow = ai.defineFlow(
  {
    name: 'getArtTrendsFlow',
    outputSchema: GetArtTrendsOutputSchema,
  },
  async () => {
    const { output } = await prompt();
    return output!;
  }
);
