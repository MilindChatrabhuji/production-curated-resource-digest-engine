/**
 * Automated Category Taxonomy and Resource Tagger
 * Classifies ingested items into standardized professional clinical & technical categories
 */

import { CuratedResourceItem } from './types';

export class AutomatedCategoryTaxonomyTagger {
  private static readonly TAXONOMY_MAP: Record<string, string[]> = {
    'CLINICAL_MEDICINE': ['cardiology', 'oncology', 'critical care', 'pharmacotherapy', 'clinical trials', 'internal medicine'],
    'INFORMATICS_ENGINEERING': ['fhir', 'hl7', 'dicom', 'clinical data pipeline', 'distributed systems', 'cloud architecture'],
    'BIOINFORMATICS': ['genomics', 'proteomics', 'variant analysis', 'deep learning protein folding', 'molecular screening'],
    'HEALTH_POLICY_AND_ETHICS': ['regulatory compliance', 'fda clearance', 'gdpr health data', 'dpdp act compliance', 'ce mark']
  };

  public tagResource(item: CuratedResourceItem): string[] {
    const textCorpus = `${item.title} ${item.summary} ${item.editorialNotes}`.toLowerCase();
    const assignedCategories: Set<string> = new Set();

    for (const [category, keywords] of Object.entries(AutomatedCategoryTaxonomyTagger.TAXONOMY_MAP)) {
      for (const kw of keywords) {
        if (textCorpus.includes(kw)) {
          assignedCategories.add(category.replace(/_/g, ' '));
          break;
        }
      }
    }

    if (assignedCategories.size === 0) {
      assignedCategories.add('CLINICAL INFORMATICS & SYSTEM ARCHITECTURE');
    }

    item.taxonomyCategories = Array.from(assignedCategories);
    return item.taxonomyCategories;
  }
}
