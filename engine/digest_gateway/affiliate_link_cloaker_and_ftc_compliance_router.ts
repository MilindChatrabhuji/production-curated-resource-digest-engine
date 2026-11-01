/**
 * Affiliate Link Cloaker and FTC Compliance Router
 * Handles /r/:slug fast redirection with statutory FTC affiliate disclosure headers and rel="sponsored nofollow"
 */

export interface CloakedLinkRecord {
  slug: string;
  targetDestinationUrl: string;
  isAffiliate: boolean;
  isSponsored: boolean;
  sponsorName?: string;
  disclosureText: string;
  createdAt: string;
  isActive: boolean;
}

export class AffiliateLinkCloaker {
  private static readonly STATUTORY_FTC_DISCLOSURE = 
    'FTC Disclosure: When you purchase through this link, Nexus Digital Store / Dr. Milind Chatrabhuji may earn a partner commission at no extra cost to you.';

  public static handleRedirect(link: CloakedLinkRecord, requestUrl: string): Response {
    if (!link.isActive) {
      return new Response("This resource link is inactive or expired.", { status: 404 });
    }

    const headers = new Headers();
    headers.set("Location", link.targetDestinationUrl);
    headers.set("X-Robots-Tag", "noindex, nofollow, sponsored");
    headers.set("X-FTC-Disclosure", AffiliateLinkCloaker.STATUTORY_FTC_DISCLOSURE);
    headers.set("Cache-Control", "no-store, no-cache, must-revalidate");

    // Fast 302 redirection with statutory disclosures
    return new Response(null, {
      status: 302,
      headers: headers
    });
  }

  public static generateRedirectHtml(link: CloakedLinkRecord): string {
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Redirecting to Resource Partner...</title>
  <meta http-equiv="refresh" content="1;url=${link.targetDestinationUrl}">
  <meta name="robots" content="noindex, nofollow">
  <style>
    body { font-family: -apple-system, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #0f172a; color: #f8fafc; }
    .card { background: #1e293b; padding: 32px; border-radius: 12px; text-align: center; max-width: 480px; border: 1px solid #334155; }
    .disclosure { font-size: 12px; color: #94a3b8; margin-top: 20px; border-top: 1px solid #334155; padding-top: 12px; }
  </style>
</head>
<body>
  <div class="card">
    <h2>Redirecting to Resource...</h2>
    <p>Connecting you to ${link.sponsorName || 'our verified resource partner'}.</p>
    <div class="disclosure">${AffiliateLinkCloaker.STATUTORY_FTC_DISCLOSURE}</div>
  </div>
</body>
</html>`;
  }
}
