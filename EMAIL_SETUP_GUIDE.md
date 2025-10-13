# 📧 Relo Network Email Setup Guide

## Overview
This guide provides multiple email provider options to ensure your emails always work. The system will automatically try providers in order until one succeeds.

## Provider Priority
1. **Resend** (Primary - fastest setup)
2. **Gmail SMTP** (Backup - most reliable)
3. **SendGrid** (Tertiary - enterprise grade)

## Setup Instructions

### Option 1: Resend (Recommended)
1. Go to https://resend.com/
2. Sign up/login
3. Go to API Keys: https://resend.com/api-keys
4. Create new API key
5. Copy the key (starts with `re_`)
6. Add to `.env.local`:
   ```bash
   RESEND_API_KEY=re_your_actual_key_here
   ```

**Note:** If using custom domain, you must verify it in Resend dashboard.

### Option 2: Gmail SMTP (Backup)
1. Enable 2-factor authentication on your Gmail account
2. Go to Google Account settings: https://myaccount.google.com/
3. Security → 2-Step Verification → App passwords
4. Generate app password for "Mail"
5. Add to `.env.local`:
   ```bash
   GMAIL_USER=your-email@gmail.com
   GMAIL_APP_PASSWORD=your_16_char_app_password
   ```

### Option 3: SendGrid (Enterprise)
1. Go to https://sendgrid.com/
2. Sign up for free account
3. Go to Settings → API Keys
4. Create new API key with "Full Access"
5. Verify sender identity (email or domain)
6. Add to `.env.local`:
   ```bash
   SENDGRID_API_KEY=SG.your_actual_key_here
   SENDGRID_FROM_EMAIL=hello@therelonetwork.com
   ```

## Environment Variables Template

Add these to your `.env.local` file:

```bash
# Email Configuration (multiple providers for reliability)

# Resend (Primary)
RESEND_API_KEY=re_your_actual_key_here

# Gmail SMTP (Backup)
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your_16_char_app_password

# SendGrid (Tertiary)
SENDGRID_API_KEY=SG.your_actual_key_here
SENDGRID_FROM_EMAIL=hello@therelonetwork.com

# Basic Auth (already configured)
BASIC_AUTH_USER=admin
BASIC_AUTH_PASS=ReloSecure2024!Network
```

## Testing Your Setup

1. Set up at least one email provider (Resend recommended)
2. Restart your development server: `npm run dev`
3. Go to http://localhost:3000/admin/send-email
4. Send a test email
5. Check console logs to see which provider was used

## Troubleshooting

### "API key is invalid"
- Double-check the API key format
- Ensure no extra spaces or characters
- Try regenerating the API key

### "Domain not verified"
- For custom domains, verify them in the provider dashboard
- Use provider's default domain temporarily (e.g., onboarding@resend.dev)

### Gmail "Authentication failed"
- Enable 2FA on Gmail account
- Use App Password, not regular password
- Check that GMAIL_USER is correct email address

### No emails received
- Check spam folder
- Verify recipient email address
- Check server console logs for detailed errors

## Production Considerations

1. **Domain Verification**: Set up SPF, DKIM, and DMARC records
2. **Rate Limits**: Current limit is 5 emails/hour (adjustable)
3. **Monitoring**: Set up alerts for email failures
4. **Backup Providers**: Configure at least 2 providers for redundancy

## Support

If you continue having issues:
1. Check the server console logs
2. Test each provider individually
3. Verify all environment variables are set correctly
4. Restart the development server after changes