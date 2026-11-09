# Contact form email setup

The contact form sends submissions to `2431871.prince@gmail.com` through Resend.

1. Add and verify a sender domain in your Resend account, then create an API key.
2. Copy `.env.example` to `.env.local` for local development and set `RESEND_API_KEY` and `PORTFOLIO_EMAIL_FROM` to your real values.
3. Restart the Next.js development server after changing `.env.local`.
4. For the deployed site, add the same two variables in the Vercel project's Environment Variables settings and redeploy.

The sender address must use the verified domain. Until these variables are set, the form shows a direct email fallback instead of reporting a message as sent.
