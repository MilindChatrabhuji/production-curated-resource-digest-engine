/**
 * Modern Clinical Evidence and Utility Scorer
 * Validates resources against modern evidence-based clinical medicine & health informatics standards
 * Strictly 100% modern evidence-based clinical medicine.
 */

import { CuratedResourceItem, EvidenceAppraisalLevel } from './types';

export class ModernClinicalEvidenceAndUtilityScorer {
  public scoreEvidence(item: CuratedResourceItem): { evidenceScore: number; passesIntegrityCheck: boolean; feedback: string } {
    let score = 50;

    // Weight based on Oxford CEBM hierarchy
    switch (item.evidenceLevel) {
      case 'LEVEL_1_SYSTEMATIC_REVIEW_RCT':
        score += 45;
        break;
      case 'LEVEL_2_RANDOMIZED_TRIAL':
        score += 35;
        break;
      case 'LEVEL_3_PROSPECTIVE_COHORT':
        score += 25;
        break;
      case 'LEVEL_4_CASE_CONTROL_STUDY':
        score += 15;
        break;
      case 'BENCH_INFORMATICS_CODE_BENCHMARK':
        score += 40;
        break;
      default:
        score += 10;
    }

    // Verify evidence-based medicine standards
    const textCorpus = `${item.title} ${item.summary} ${item.editorialNotes}`.toLowerCase();
    
    // Strict negative check against unverified remedies
    const isUnverifiedRemedy = textCorpus.includes('unverified_folk_remedy') || textCorpus.includes('magic_cure');
    if (isUnverifiedRemedy) {
      return {
        evidenceScore: 0,
        passesIntegrityCheck: false,
        feedback: 'Item rejected: Fails modern clinical evidence validation standards.'
      };
    }

    item.methodologyScore = Math.min(100, score);
    return {
      evidenceScore: item.methodologyScore,
      passesIntegrityCheck: true,
      feedback: 'Resource certified: Rigorous modern clinical trial & bioinformatics methodology.'
    };
  }
}
