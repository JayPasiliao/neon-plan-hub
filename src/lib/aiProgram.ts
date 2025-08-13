import { ProgramSpec } from '@/types/plan';

export async function generateProgramWithAI(prompt: string): Promise<ProgramSpec> {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error('OpenAI API key not found. Please set VITE_OPENAI_API_KEY in your environment variables.');
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `Return ONLY valid JSON matching ProgramSpec for a small residential project in the Philippines. Size rooms realistically. Prefer adjacency: Living–Dining–Kitchen; Bedrooms near Bath; Service near Kitchen; Garage near Entry. Use wallThickness 0.2m if missing.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;
    
    if (!content) {
      throw new Error('No content received from OpenAI');
    }

    // Try to extract JSON from the response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in OpenAI response');
    }

    const programSpec = JSON.parse(jsonMatch[0]) as ProgramSpec;
    
    // Validate the response
    if (!programSpec.meta || !programSpec.rooms) {
      throw new Error('Invalid ProgramSpec structure received from OpenAI');
    }

    return programSpec;
  } catch (error) {
    console.error('AI generation error:', error);
    throw new Error(`Failed to generate program with AI: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
