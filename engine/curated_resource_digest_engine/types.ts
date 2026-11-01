/**
 * Production Curated Resource Digest & Affiliate Engine
 * Core TypeScript Definitions
 */

export interface CuratedResourceItem {
  id: string;
  title: string;
  url: string;
  author: string;
  publicationDate: string;
  sourceDomain: string;
  summary: string;
  taxonomyCategories: string[];
  evidenceLevel: EvidenceAppraisalLevel;
  methodologyScore: number; // 0 - 100
  utilityScore: number; // 0 - 100
  editorialNotes: string;
  isSponsored: boolean;
  affiliateUrl?: string;
  cloakedSlug?: string;
}

export type EvidenceAppraisalLevel = 
  | 'LEVEL_1_SYSTEMATIC_REVIEW_RCT'
  | 'LEVEL_2_RANDOMIZED_TRIAL'
  | 'LEVEL_3_PROSPECTIVE_COHORT'
  | 'LEVEL_4_CASE_CONTROL_STUDY'
  | 'LEVEL_5_EXPERT_CONSENSUS_OPINION'
  | 'BENCH_INFORMATICS_CODE_BENCHMARK';

export interface DigestIssue {
  issueNumber: number;
  title: string;
  publishDate: string;
  curator: string;
  leadEditorial: string;
  items: CuratedResourceItem[];
  sponsorSlots: SponsorPlacementSlot[];
  ftcDisclaimerText: string;
}

export interface SponsorPlacementSlot {
  slotId: string;
  tier: 'PRIMARY_BANNER' | 'SECONDARY_CARD' | 'HIGH_YIELD_BULLET';
  sponsorName: string;
  headline: string;
  copy: string;
  targetUrl: string;
  cloakedRedirectUrl: string;
  monthlyRetainerUsd: number;
}

export interface ClickTelemetryEvent {
  clickId: string;
  slug: string;
  destinationUrl: string;
  timestamp: string;
  ipHash: string;
  userAgent: string;
  countryCode: string;
  referer: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}
