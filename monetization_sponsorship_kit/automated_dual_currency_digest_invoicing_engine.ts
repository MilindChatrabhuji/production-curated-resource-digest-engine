/**
 * Automated Dual-Currency Digest Invoicing Engine
 * Generates compliant commercial pro-forma and tax invoices for sponsorships and software packs
 */

export interface InvoiceLineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  currency: 'USD' | 'INR';
}

export interface InvoiceRecord {
  invoiceNumber: string;
  date: string;
  clientName: string;
  clientEmail: string;
  items: InvoiceLineItem[];
  currency: 'USD' | 'INR';
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  paymentHandle: string;
  notes: string;
}

export class AutomatedDualCurrencyDigestInvoicingEngine {
  public static generateInvoice(
    clientName: string,
    clientEmail: string,
    tier: 'SINGLE_PACK' | 'MASTER_SUITE' | 'STARTER_RETAINER' | 'PRO_RETAINER' | 'EXCLUSIVE_RETAINER',
    currency: 'USD' | 'INR'
  ): InvoiceRecord {
    const invoiceNum = `INV-DIGEST-${Date.now()}`;
    const date = new Date().toISOString().split('T')[0];

    let unitPrice = 0;
    let description = '';

    if (currency === 'USD') {
      switch (tier) {
        case 'SINGLE_PACK':
          unitPrice = 9.00;
          description = 'Curated Resource Digest Component Pack (Single License)';
          break;
        case 'MASTER_SUITE':
          unitPrice = 19.00;
          description = 'Curated Resource Digest & Affiliate Engine Master Suite (Full Commercial License)';
          break;
        case 'STARTER_RETAINER':
          unitPrice = 500.00;
          description = 'Monthly Digest Sponsorship Starter Retainer (~15k impressions)';
          break;
        case 'PRO_RETAINER':
          unitPrice = 1500.00;
          description = 'Monthly Digest Sponsorship Professional Retainer (~45k impressions + Primary Banner)';
          break;
        case 'EXCLUSIVE_RETAINER':
          unitPrice = 3000.00;
          description = 'Monthly Digest Exclusive Category Retainer (~120k impressions + Spotlight)';
          break;
      }
    } else {
      switch (tier) {
        case 'SINGLE_PACK':
          unitPrice = 750.00;
          description = 'Curated Resource Digest Component Pack (Single License)';
          break;
        case 'MASTER_SUITE':
          unitPrice = 1599.00;
          description = 'Curated Resource Digest & Affiliate Engine Master Suite (Full Commercial License)';
          break;
        case 'STARTER_RETAINER':
          unitPrice = 41500.00;
          description = 'Monthly Digest Sponsorship Starter Retainer';
          break;
        case 'PRO_RETAINER':
          unitPrice = 124500.00;
          description = 'Monthly Digest Sponsorship Professional Retainer';
          break;
        case 'EXCLUSIVE_RETAINER':
          unitPrice = 249000.00;
          description = 'Monthly Digest Exclusive Category Retainer';
          break;
      }
    }

    const paymentHandle = currency === 'USD' 
      ? 'PayPal: milind.chatrabhuji@gmail.com' 
      : 'UPI: milind.chatrabhuji@okhdfcbank';

    return {
      invoiceNumber: invoiceNum,
      date: date,
      clientName: clientName,
      clientEmail: clientEmail,
      items: [{ description, quantity: 1, unitPrice, currency }],
      currency: currency,
      subtotal: unitPrice,
      taxAmount: 0, // Export zero-rated LUT or GST compliant
      totalAmount: unitPrice,
      paymentHandle: paymentHandle,
      notes: 'Full 30-day money-back guarantee. Zero cloud lock-in.'
    };
  }
}
