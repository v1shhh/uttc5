import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

interface SendResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

interface LeadData {
  id?: number;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  service_type?: string;
  project_type?: string;
  budget_range?: string;
  timeline?: string;
  message?: string;
  source_page?: string;
  lead_score?: number;
  created_at?: Date | string;
}

// Initialize transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_PORT === '465',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify connection on startup (non-blocking)
transporter.verify((error) => {
  if (error) {
    console.error('[Email Service] Connection failed:', error.message);
  } else {
    console.log('[Email Service] Ready to send emails');
  }
});

// Retry logic with exponential backoff
async function sendWithRetry(
  options: EmailOptions,
  maxRetries: number = 3,
  delayMs: number = 1000
): Promise<SendResult> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const info = await transporter.sendMail({
        from: `"UTTC Pool Construction" <${process.env.EMAIL_USER}>`,
        ...options,
      });

      console.log(`[Email] Sent successfully: ${info.messageId}`);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      const err = error as Error;
      console.warn(`[Email] Attempt ${attempt}/${maxRetries} failed: ${err.message}`);

      if (attempt < maxRetries) {
        const delay = delayMs * Math.pow(2, attempt - 1);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        console.error(`[Email] Failed after ${maxRetries} attempts:`, err.message);
        return { success: false, error: err.message };
      }
    }
  }

  return { success: false, error: 'Max retries exceeded' };
}

export async function sendLeadNotification(leadData: LeadData): Promise<SendResult> {
  const html = generateLeadEmailTemplate(leadData);

  return sendWithRetry({
    to: process.env.EMAIL_TO || process.env.EMAIL_USER || 'admin@uttc.com',
    subject: `🔥 New Lead: ${leadData.name}${leadData.company ? ` from ${leadData.company}` : ''} (Score: ${leadData.lead_score || 0})`,
    html,
    replyTo: leadData.email,
  });
}

export async function sendLeadConfirmation(leadData: LeadData): Promise<SendResult> {
  const html = generateConfirmationEmailTemplate(leadData);

  return sendWithRetry({
    to: leadData.email,
    subject: 'We received your inquiry - UTTC Pool Construction',
    html,
  });
}

function generateLeadEmailTemplate(lead: LeadData): string {
  const scoreColor = (lead.lead_score || 0) >= 70 ? '#ef4444' : (lead.lead_score || 0) >= 50 ? '#f59e0b' : '#3b82f6';
  const scoreLabel = (lead.lead_score || 0) >= 70 ? 'HOT' : (lead.lead_score || 0) >= 50 ? 'WARM' : 'COOL';

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background: #f4f4f4; }
          .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #00b4d8 0%, #0077b6 100%); color: white; padding: 30px; text-align: center; }
          .header h1 { margin: 0 0 10px 0; font-size: 28px; }
          .score-badge { display: inline-block; background: ${scoreColor}; color: white; padding: 8px 16px; border-radius: 20px; font-weight: bold; font-size: 14px; margin-top: 10px; }
          .content { padding: 30px; }
          .field { margin: 20px 0; padding: 15px; background: #f9f9f9; border-left: 4px solid #00b4d8; border-radius: 4px; }
          .label { font-weight: bold; color: #0077b6; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px; }
          .value { color: #333; font-size: 15px; margin-top: 5px; }
          .value a { color: #0077b6; text-decoration: none; }
          .cta { display: inline-block; background: #00b4d8; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: 600; }
          .cta:hover { background: #0077b6; }
          .footer { margin-top: 30px; padding: 20px 30px; background: #f9f9f9; border-top: 1px solid #e0e0e0; font-size: 12px; color: #666; text-align: center; }
          .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
          @media (max-width: 600px) { .grid { grid-template-columns: 1fr; } }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🏊 New Lead Submission</h1>
            <p style="margin: 0; opacity: 0.9;">A new inquiry has been received</p>
            <div class="score-badge">${scoreLabel} LEAD - Score: ${lead.lead_score || 0}/100</div>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Contact Name</div>
              <div class="value">${escapeHtml(lead.name)}</div>
            </div>

            ${lead.company ? `
            <div class="field">
              <div class="label">Company / Organization</div>
              <div class="value">${escapeHtml(lead.company)}</div>
            </div>
            ` : ''}

            <div class="grid">
              <div class="field">
                <div class="label">Email</div>
                <div class="value"><a href="mailto:${escapeHtml(lead.email)}">${escapeHtml(lead.email)}</a></div>
              </div>
              ${lead.phone ? `
              <div class="field">
                <div class="label">Phone</div>
                <div class="value"><a href="tel:${escapeHtml(lead.phone)}">${escapeHtml(lead.phone)}</a></div>
              </div>
              ` : ''}
            </div>

            <div class="grid">
              ${lead.service_type ? `
              <div class="field">
                <div class="label">Service Type</div>
                <div class="value">${escapeHtml(lead.service_type)}</div>
              </div>
              ` : ''}
              ${lead.project_type ? `
              <div class="field">
                <div class="label">Project Type</div>
                <div class="value">${escapeHtml(lead.project_type)}</div>
              </div>
              ` : ''}
            </div>

            <div class="grid">
              ${lead.budget_range ? `
              <div class="field">
                <div class="label">Budget Range</div>
                <div class="value">${escapeHtml(lead.budget_range)}</div>
              </div>
              ` : ''}
              ${lead.timeline ? `
              <div class="field">
                <div class="label">Timeline</div>
                <div class="value">${escapeHtml(lead.timeline)}</div>
              </div>
              ` : ''}
            </div>

            ${lead.message ? `
            <div class="field">
              <div class="label">Project Details</div>
              <div class="value">${escapeHtml(lead.message).replace(/\n/g, '<br>')}</div>
            </div>
            ` : ''}

            <div style="text-align: center; margin-top: 30px;">
              <a href="http://localhost:3001/admin/leads" class="cta">View in Admin Dashboard →</a>
            </div>
          </div>
          <div class="footer">
            <p style="margin: 5px 0;"><strong>Source:</strong> ${escapeHtml(lead.source_page || 'Direct')}</p>
            <p style="margin: 5px 0;"><strong>Submitted:</strong> ${new Date(lead.created_at || new Date()).toLocaleString()}</p>
            <p style="margin: 15px 0 5px 0; color: #999;">UTTC Pool Construction - Admin Notification</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

function generateConfirmationEmailTemplate(lead: LeadData): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background: #f4f4f4; }
          .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #00b4d8 0%, #0077b6 100%); color: white; padding: 40px 30px; text-align: center; }
          .header h1 { margin: 0 0 10px 0; font-size: 32px; }
          .content { padding: 40px 30px; }
          .message { margin: 25px 0; line-height: 1.8; font-size: 16px; }
          .highlight { background: #e8f4f8; padding: 20px; border-left: 4px solid #00b4d8; border-radius: 4px; margin: 25px 0; }
          .footer { margin-top: 30px; padding: 25px 30px; background: #f9f9f9; border-top: 1px solid #e0e0e0; font-size: 13px; color: #666; text-align: center; }
          .contact-info { margin: 20px 0; }
          .contact-info a { color: #0077b6; text-decoration: none; font-weight: 600; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✓ Thank You!</h1>
            <p style="margin: 0; opacity: 0.9; font-size: 18px;">We've received your inquiry</p>
          </div>
          <div class="content">
            <p style="font-size: 18px; margin-top: 0;">Hi ${escapeHtml(lead.name)},</p>
            <div class="message">
              <p>Thank you for reaching out to UTTC Pool Construction. We've received your project inquiry and our team is reviewing the details.</p>
              <div class="highlight">
                <strong>⏱️ What happens next?</strong><br>
                Our team typically responds within <strong>4 business hours</strong>. For urgent matters, feel free to call us directly.
              </div>
              <p>With nearly 50 years of experience building UAE's most prestigious pools and water features, we're excited to learn more about your project and explore how we can bring your vision to life.</p>
            </div>
            <div class="contact-info">
              <p><strong>Need immediate assistance?</strong></p>
              <p>📞 Call: <a href="tel:800-POOLS">800-POOLS</a></p>
              <p>📧 Email: <a href="mailto:poolsuae@poolsuae.com">poolsuae@poolsuae.com</a></p>
            </div>
          </div>
          <div class="footer">
            <p style="margin: 5px 0; font-weight: 600; color: #0077b6;">UTTC Pool Construction</p>
            <p style="margin: 5px 0;">UAE's Water Works Authority Since 1976</p>
            <p style="margin: 15px 0 5px 0; font-size: 11px; color: #999;">This is an automated confirmation. Please do not reply to this email.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

function escapeHtml(text: string): string {
  if (!text) return '';
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return String(text).replace(/[&<>"']/g, m => map[m]);
}

export default { sendLeadNotification, sendLeadConfirmation };
