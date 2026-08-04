import { ContextManager } from './contextManager';
import { ResponseFormatter, FormattedAIResponse } from './responseFormatter';

export interface SpacedRevisionCard {
  id: string;
  frontConcept: string;
  backKeyPoint: string;
  ncertLine: string;
  mnemonic?: string;
}

export class RevisionGenerator {
  static async generateRevisionCards(): Promise<{
    cards: SpacedRevisionCard[];
    formattedResponse: FormattedAIResponse;
  }> {
    const ctx = ContextManager.getFullContext();

    try {
      const response = await fetch('/api/ai/revision', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chapter: ctx.lecture.chapter,
          topic: ctx.lecture.topic,
          subject: ctx.lecture.subject,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.cards && Array.isArray(data.cards)) {
          return {
            cards: data.cards,
            formattedResponse: ResponseFormatter.format(data.rawText || 'Spaced Revision Cards'),
          };
        }
      }
    } catch (e) {
      // API call fallback
    }

    const cards: SpacedRevisionCard[] = [
      {
        id: 'rev_c1',
        frontConcept: 'Defining vs Non-Defining Properties of Life',
        backKeyPoint:
          'Defining: Cellular Organization, Metabolism, Consciousness. Non-Defining: Growth, Reproduction (due to mules, sterile bees).',
        ncertLine: 'NCERT Class 11 Biology, Pages 3-5',
        mnemonic: 'CMC = Cellular + Metabolism + Consciousness (Always Defining)',
      },
      {
        id: 'rev_c2',
        frontConcept: 'Binomial Nomenclature Rules',
        backKeyPoint:
          '1. Genus (Capitalized) 2. Species (Lowercase) 3. Printed in italics or underlined separately when handwritten.',
        ncertLine: 'NCERT Class 11 Biology, Page 7',
        mnemonic: 'Linnaeus Binomial System',
      },
      {
        id: 'rev_c3',
        frontConcept: 'Taxonomic Categories Hierarchy',
        backKeyPoint: 'Kingdom > Phylum/Division > Class > Order > Family > Genus > Species',
        ncertLine: 'NCERT Class 11 Biology, Page 9',
        mnemonic: 'Keep Pond Clean Or Fish Get Sick',
      },
    ];

    const rawText = cards
      .map(
        (c, i) =>
          `**Card ${i + 1}: ${c.frontConcept}**\n` +
          `- **Key Point:** ${c.backKeyPoint}\n` +
          `- **NCERT Line:** ${c.ncertLine}\n` +
          (c.mnemonic ? `- **Mnemonic:** ${c.mnemonic}\n` : '')
      )
      .join('\n---\n');

    return {
      cards,
      formattedResponse: ResponseFormatter.format(rawText),
    };
  }
}
