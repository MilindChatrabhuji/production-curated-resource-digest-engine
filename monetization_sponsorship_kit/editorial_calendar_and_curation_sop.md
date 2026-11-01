# Editorial Calendar & Curation SOP

## Purpose
Establishes standardized procedures for the weekly curation, fact-checking, evidence appraisal, and distribution of the Curated Resource Digest.

## Weekly Operating Schedule
- **Monday 09:00 IST**: Automated item harvesting via `curated_item_parser_and_metadata_extractor.ts`.
- **Tuesday 14:00 IST**: Evidence appraisal and methodology scoring via `modern_clinical_evidence_and_utility_scorer.ts`.
- **Wednesday 11:00 IST**: Taxonomy assignment and category balancing via `automated_category_taxonomy_and_tagger.ts`.
- **Thursday 16:00 IST**: Sponsorship placement verification and FTC compliance check.
- **Friday 08:30 IST**: Issue compilation via `content_digest_markdown_and_html_generator.ts` and distribution.

## Non-Negotiable Quality Gates
- Strictly 100% modern evidence-based clinical medicine. Zero alternative medical claims.
- Zero fake GSTINs or identity spoofing.
- All outbound redirect URLs verified against dead links or security vulnerabilities.
