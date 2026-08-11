// ── Contact Constants ──────────────────────────────────────────────────────
// Values are read from environment variables (VITE_ prefix required by Vite).
// Set these in .env.local for local dev, or in Vercel project settings for production.

/** Company email address — used in mailto: links */
export const EMAIL_ADDRESS = import.meta.env.VITE_EMAIL_ADDRESS

/** WhatsApp number in international format WITHOUT + or spaces, e.g. 923001234567 */
export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER
