/**
 * Content Digest Markdown and HTML Generator
 * Generates responsive newsletter HTML and GitHub Flavored Markdown digests
 */

import { DigestIssue } from './types';

export class ContentDigestGenerator {
  public generateMarkdown(digest: DigestIssue): string {
    let md = `# ${digest.title} — Issue #${digest.issueNumber}\n\n`;
    md += `*Published by ${digest.curator} on ${digest.publishDate}*\n\n`;
    md += `> **Editorial Focus:** ${digest.leadEditorial}\n\n`;
    md += `---\n\n`;

    // Sponsors
    if (digest.sponsorSlots.length > 0) {
      md += `## Featured Institutional Partners\n\n`;
      for (const sp of digest.sponsorSlots) {
        md += `### [Sponsored] ${sp.headline}\n`;
        md += `${sp.copy}\n\n`;
        md += `👉 **[Learn More](${sp.cloakedRedirectUrl})** *(Notice: Sponsored Placement)*\n\n`;
      }
      md += `---\n\n`;
    }

    // Curated Items
    md += `## Curated High-Yield Resources\n\n`;
    for (const item of digest.items) {
      md += `### [${item.title}](${item.url})\n`;
      md += `*Source: ${item.sourceDomain} | Evidence: ${item.evidenceLevel} | Utility: ${item.utilityScore}/100*\n\n`;
      md += `${item.summary}\n\n`;
      md += `**Curator Note:** ${item.editorialNotes}\n\n`;
      if (item.affiliateUrl) {
        md += `🔗 [Access Resource Partner Link](${item.cloakedSlug || item.affiliateUrl}) *(Affiliate partner)*\n\n`;
      }
    }

    // FTC Disclaimer
    md += `---\n\n`;
    md += `*${digest.ftcDisclaimerText}*\n`;

    return md;
  }

  public generateResponsiveHtml(digest: DigestIssue): string {
    const markdownBody = this.generateMarkdown(digest);
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${digest.title} - Issue #${digest.issueNumber}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; background: #f8fafc; margin: 0; padding: 24px; }
    .container { max-width: 680px; margin: 0 auto; background: #ffffff; padding: 36px; border-radius: 12px; border: 1px solid #e2e8f0; }
    h1 { color: #0f172a; font-size: 26px; border-bottom: 2px solid #0284c7; padding-bottom: 12px; }
    h2 { color: #0369a1; font-size: 20px; margin-top: 28px; }
    h3 { color: #0f172a; font-size: 17px; margin-bottom: 4px; }
    .meta { color: #64748b; font-size: 13px; margin-bottom: 16px; }
    .sponsor-box { background: #f0f9ff; border-left: 4px solid #0284c7; padding: 16px; margin: 20px 0; border-radius: 6px; }
    .item-card { border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px; margin-bottom: 20px; background: #fafafa; }
    .disclaimer { font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 16px; margin-top: 32px; }
    a { color: #0284c7; text-decoration: none; font-weight: 600; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div class="container">
    <h1>${digest.title} — Issue #${digest.issueNumber}</h1>
    <div class="meta">Published by ${digest.curator} • ${digest.publishDate}</div>
    <p><strong>Editorial Brief:</strong> ${digest.leadEditorial}</p>
    
    <h2>Curated Resources</h2>
    ${digest.items.map(it => `
      <div class="item-card">
        <h3><a href="${it.url}" target="_blank" rel="noopener">${it.title}</a></h3>
        <div class="meta">${it.sourceDomain} • Evidence: ${it.evidenceLevel} • Utility Score: ${it.utilityScore}/100</div>
        <p>${it.summary}</p>
        <p><em>Curator Insight:</em> ${it.editorialNotes}</p>
      </div>
    `).join('')}

    <div class="disclaimer">
      ${digest.ftcDisclaimerText}
    </div>
  </div>
</body>
</html>`;
  }
}
