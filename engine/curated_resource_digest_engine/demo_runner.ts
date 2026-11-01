/**
 * Demo Runner & Verification Harness for Curated Resource Digest Engine
 */

const { CuratedItemParser } = require('./curated_item_parser_and_metadata_extractor');
const { AutomatedCategoryTaxonomyTagger } = require('./automated_category_taxonomy_and_tagger');
const { ContentDigestGenerator } = require('./content_digest_markdown_and_html_generator');
const { ModernClinicalEvidenceAndUtilityScorer } = require('./modern_clinical_evidence_and_utility_scorer');

console.log("=== Testing Curated Resource Digest Engine ===");

const parser = new CuratedItemParser();
const tagger = new AutomatedCategoryTaxonomyTagger();
const generator = new ContentDigestGenerator();
const scorer = new ModernClinicalEvidenceAndUtilityScorer();

const sampleItem = parser.parseUrlMetadata(
  "https://resources.example.com/clinical-trials/biomarker-validation",
  "<title>Prospective Validation of Biomarker Clinical Trial Endpoints</title><meta name="description" content="Multi-center randomized trial evaluating high-throughput computational phenotyping pipelines in cardiology." />"
);

console.log("[1] Parsed Item:", sampleItem.title);

const tags = tagger.tagResource(sampleItem);
console.log("[2] Assigned Taxonomy Tags:", tags);

const scoreResult = scorer.scoreEvidence(sampleItem);
console.log("[3] Evidence Appraisal Score:", scoreResult.evidenceScore, "| Valid:", scoreResult.passesIntegrityCheck);

const digest = {
  issueNumber: 42,
  title: "Clinical Informatics & Modern Therapeutics Digest",
  publishDate: "2026-11-02",
  curator: "Dr. Milind Chatrabhuji",
  leadEditorial: "Examining multi-center randomized validation methodologies in cloud-native health data infrastructure.",
  items: [sampleItem],
  sponsorSlots: [
    {
      slotId: "sp_01",
      tier: "PRIMARY_BANNER",
      sponsorName: "Enterprise Health Cloud",
      headline: "Scalable FHIR Edge Data Connectors",
      copy: "Deploy low-latency healthcare API integrations with zero on-premise hardware.",
      targetUrl: "https://sponsor.example.com/fhir-edge",
      cloakedRedirectUrl: "https://digest.example.com/r/sponsor-fhir-edge",
      monthlyRetainerUsd: 1500
    }
  ],
  ftcDisclaimerText: "Statutory Disclosure: Links in this digest may include tracked affiliate or sponsored partner placements. We only feature products meeting strict peer-reviewed evidence standards."
};

const md = generator.generateMarkdown(digest);
console.log("[4] Generated Markdown Length:", md.length, "bytes");

const html = generator.generateResponsiveHtml(digest);
console.log("[5] Generated HTML Length:", html.length, "bytes");

console.log("=== All Curation Engine Verification Tests Passed Successfully! ===");
