'use server';

/**
 * @fileOverview An AI agent for generating art ideas.
 *
 * - generateArtIdeas - A function that generates creative prompts for artists.
 * - GenerateArtIdeasInput - The input type for the generateArtIdeas function.
 * - GenerateArtIdeasOutput - The return type for the generateArtIdeas function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const artStyles = [
    "Digital",
    "Realistic",
    "Abstract",
    "Traditional"
];

const GenerateArtIdeasInputSchema = z.object({
  artStyle: z.string().optional().describe(`The desired art style. One of: ${artStyles.join(', ')}`),
});
export type GenerateArtIdeasInput = z.infer<typeof GenerateArtIdeasInputSchema>;

const GenerateArtIdeasOutputSchema = z.object({
  ideas: z.array(z.string()).describe('An array of 3 fresh and creative art prompts or ideas.'),
});
export type GenerateArtIdeasOutput = z.infer<typeof GenerateArtIdeasOutputSchema>;

export async function generateArtIdeas(input: GenerateArtIdeasInput): Promise<GenerateArtIdeasOutput> {
  return generateArtIdeasFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateArtIdeasPrompt',
  input: { schema: GenerateArtIdeasInputSchema },
  output: { schema: GenerateArtIdeasOutputSchema },
  prompt: `You are a creative AI assistant for artists. Generate 3 fresh and unique art prompts to help artists overcome creative blocks.

If an art style is provided, tailor the ideas to that style.

Art Style: {{artStyle}}

Examples of good prompts:
- "Sunset over a shattered mirror"
- "Girl lost in digital rain"
- "Street art inspired by emotions"

Ensure the ideas are concise and inspiring.
`,
});

const generateArtIdeasFlow = ai.defineFlow(
  {
    name: 'generateArtIdeasFlow',
    inputSchema: GenerateArtIdeasInputSchema,
    outputSchema: GenerateArtIdeasOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
