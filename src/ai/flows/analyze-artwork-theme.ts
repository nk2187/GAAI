'use server';

/**
 * @fileOverview A flow to analyze artwork and extract its theme, color, mood, and style.
 *
 * - analyzeArtworkTheme - A function that analyzes the artwork.
 * - AnalyzeArtworkThemeInput - The input type for the analyzeArtworkTheme function.
 * - AnalyzeArtworkThemeOutput - The return type for the analyzeArtworkTheme function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeArtworkThemeInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      'A photo of the artwork, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' 
    ),
});
export type AnalyzeArtworkThemeInput = z.infer<typeof AnalyzeArtworkThemeInputSchema>;

const AnalyzeArtworkThemeOutputSchema = z.object({
  theme: z.string().describe('The overall theme of the artwork.'),
  colorPalette: z.string().describe('The dominant colors present in the artwork.'),
  mood: z.string().describe('The mood or emotion conveyed by the artwork.'),
  style: z.string().describe('The artistic style of the artwork (e.g., abstract, portrait, landscape).'),
});
export type AnalyzeArtworkThemeOutput = z.infer<typeof AnalyzeArtworkThemeOutputSchema>;

export async function analyzeArtworkTheme(input: AnalyzeArtworkThemeInput): Promise<AnalyzeArtworkThemeOutput> {
  return analyzeArtworkThemeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeArtworkThemePrompt',
  input: {schema: AnalyzeArtworkThemeInputSchema},
  output: {schema: AnalyzeArtworkThemeOutputSchema},
  prompt: `You are an AI art expert. Analyze the uploaded artwork image and extract the following information:

- Theme: What is the overall theme or subject of the artwork?
- Color Palette: What are the dominant colors present in the artwork?
- Mood: What mood or emotion does the artwork convey?
- Style: What is the artistic style of the artwork (e.g., abstract, portrait, landscape, digital art)?

Analyze the following artwork:

{{media url=photoDataUri}}

Ensure that the output is well-formatted and easy to understand. Focus on details that an artist would find helpful for generating captions and hashtags. Follow the schema description to generate the output.`, 
});

const analyzeArtworkThemeFlow = ai.defineFlow(
  {
    name: 'analyzeArtworkThemeFlow',
    inputSchema: AnalyzeArtworkThemeInputSchema,
    outputSchema: AnalyzeArtworkThemeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
