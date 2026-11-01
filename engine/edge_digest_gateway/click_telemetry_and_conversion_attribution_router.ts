/**
 * Click Telemetry and Conversion Attribution Router
 * Logs anonymous click metrics to Cloudflare D1 with zero personal surveillance
 */

export interface ClickLogPayload {
  slug: string;
  destination: string;
  ipAddress?: string;
  userAgent?: string;
  referer?: string;
  country?: string;
}

export class ClickTelemetryRouter {
  public static async logClick(payload: ClickLogPayload, d1Database?: any): Promise<{ success: boolean; eventId: string }> {
    const eventId = `clk_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const timestamp = new Date().toISOString();

    if (d1Database) {
      try {
        await d1Database.prepare(
          `INSERT INTO click_events (click_id, slug, destination_url, timestamp, user_agent, referer, country_code)
           VALUES (?, ?, ?, ?, ?, ?, ?)`
        ).bind(
          eventId,
          payload.slug,
          payload.destination,
          timestamp,
          payload.userAgent || 'unknown',
          payload.referer || 'direct',
          payload.country || 'XX'
        ).run();
      } catch (err) {
        console.error("D1 click telemetry write error:", err);
      }
    }

    return { success: true, eventId };
  }
}
