# NŌIR

NŌIR is a luxury fashion storefront built with React, TypeScript, and Vite. It includes product browsing, cart management, Firebase authentication, Firestore account history, Stripe sandbox checkout, and Resend-powered email flows.

## Stack

- React 19 and TypeScript
- Vite
- Firebase Authentication and Firestore
- Stripe Checkout in test mode
- Resend for verification and contact email
- Vercel serverless API routes

## Local development

### Requirements

- Node.js 22 or newer
- Firebase project with Authentication and Firestore enabled
- Stripe account with test-mode keys
- Resend account and a verified sender domain

### Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the environment template:

   ```bash
   copy .env.example .env.local
   ```

3. Add the required values to `.env.local`:

   - Stripe test secret and webhook keys
   - Resend API and sender settings
   - Firebase Admin server credentials
   - Firebase client variables prefixed with `VITE_`

4. Start the development server:

   ```bash
   npm run dev
   ```

The app runs at `http://localhost:8443`.

## Stripe sandbox testing

Keep Stripe in test mode while developing. Configure the webhook endpoint for the environment being tested:

```text
/api/stripe-webhook
```

Use Stripe test cards only. Never commit `.env.local`, service-account files, private keys, or live credentials.

## Scripts

```bash
npm run dev       # Start the Vite development server
npm run build     # Create a production build
npm run preview   # Preview the production build locally
npm run format    # Format project files
```

## Deployment

The project is configured for Vercel with the API handlers in `api/`. Set every variable from `.env.example`, plus the Firebase client `VITE_` variables, in the Vercel project environment settings before deploying.

For a deployed Stripe sandbox checkout, set the webhook endpoint to:

```text
https://<your-vercel-domain>/api/stripe-webhook
```

## Repository safety

Local environment files, editor settings, build output, dependencies, Vercel metadata, and assistant metadata are excluded through `.gitignore`. Only `.env.example` is intended to be committed.