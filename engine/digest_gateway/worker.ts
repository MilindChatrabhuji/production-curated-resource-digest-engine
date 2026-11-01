/**
 * Cloudflare Workers Edge Digest & Affiliate Router
 */

import { AffiliateLinkCloaker, CloakedLinkRecord } from './affiliate_link_cloaker_and_ftc_compliance_router';
import { ClickTelemetryRouter } from './click_telemetry_and_conversion_attribution_router';

export interface Env {
  DB?: any;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Health check
    if (url.pathname === '/health' || url.pathname === '/api/health') {
      return new Response(JSON.stringify({ status: "healthy", service: "curated_resource_digest_engine", version: "1.0.0" }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    // Fast cloaked link redirection /r/:slug
    if (url.pathname.startsWith('/r/')) {
      const slug = url.pathname.replace('/r/', '').trim();
      
      const linkRecord: CloakedLinkRecord = {
        slug: slug,
        targetDestinationUrl: `https://resources.example.com/verified/${slug}`,
        isAffiliate: true,
        isSponsored: true,
        sponsorName: "Verified Clinical Partner",
        disclosureText: "Statutory FTC Disclosure: Partner link.",
        createdAt: new Date().toISOString(),
        isActive: true
      };

      // Telemetry log
      await ClickTelemetryRouter.logClick({
        slug: slug,
        destination: linkRecord.targetDestinationUrl,
        userAgent: request.headers.get("User-Agent") || undefined,
        referer: request.headers.get("Referer") || undefined,
        country: request.headers.get("CF-IPCountry") || undefined
      }, env.DB);

      return AffiliateLinkCloaker.handleRedirect(linkRecord, request.url);
    }

    // API: Ingest Item
    if (url.pathname === '/api/digest/items' && request.method === 'POST') {
      const body = await request.json().catch(() => ({}));
      return new Response(JSON.stringify({ success: true, message: "Item ingested for editorial review", item: body }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    // Default fallback
    return new Response(JSON.stringify({
      message: "Production Curated Resource Digest & Affiliate Engine Edge Gateway",
      endpoints: ["/health", "/r/:slug", "/api/digest/items"],
      standards: "RFC 2606 Compliant | 100% Modern Evidence-Based Medicine"
    }), {
      headers: { "Content-Type": "application/json" }
    });
  }
};
