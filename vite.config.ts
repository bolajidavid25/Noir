import { defineConfig, loadEnv, type HtmlTagDescriptor, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import crypto from 'node:crypto'
import Stripe from 'stripe'
import { Resend } from 'resend'
import { cert, getApps, initializeApp as initializeAdminApp } from 'firebase-admin/app'
import { getAuth as getAdminAuth } from 'firebase-admin/auth'
import { getFirestore as getAdminFirestore, FieldValue } from 'firebase-admin/firestore'
import { products } from './src/data/products'

const siteConfiguration: FigmaSiteConfiguration = {}

// Vite config — https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  // .figma/make/deploy-preview passes `--mode development` for cached-preview builds.
  const emitSourcemaps = mode === 'development'

  return {
    base: env.FIGMA_PUBLIC_URL ? `${env.FIGMA_PUBLIC_URL}/` : '/',
    build: {
      sourcemap: emitSourcemaps ? 'inline' : false,
      minify: !emitSourcemaps,
    },
    plugins: [
      react(),
      tailwindcss(),
      figmaSiteConfiguration(siteConfiguration),
      stripeCheckoutPlugin(env),
      emailVerificationPlugin(env),
      contactMessagePlugin(env),
      stripeWebhookPlugin(env),
      figmaErrorOverlayReplay(),
      figmaReactRefreshBoundaryFallback(),
      figmaMakeKitPlugin({ storiesGlob: '/src/**/*.stories.{ts,tsx,js,jsx}' }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: parseInt(env.PORT || '8443'),
      strictPort: true,
      watch: { ignored: ['**/.figma/**'] },
    },
    preview: {
      host: '0.0.0.0',
      port: parseInt(env.PORT || '8443'),
    },
  }
})

function stripeCheckoutPlugin(env: Record<string, string>): Plugin {
  return {
    name: 'stripe-checkout-api',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/create-checkout-session', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.setHeader('Allow', 'POST')
          res.end(JSON.stringify({ error: 'Method not allowed.' }))
          return
        }

        const secretKey = env.STRIPE_SECRET_KEY
        if (!secretKey) {
          res.statusCode = 503
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Stripe is not configured. Add STRIPE_SECRET_KEY to .env.local.' }))
          return
        }

        try {
          const body = await readJsonBody(req)
          const firebaseAdmin = getFirebaseAdmin(env)
          const idToken = typeof body.idToken === 'string' ? body.idToken : ''
          if (!firebaseAdmin || !idToken) throw new Error('Firebase account verification is not configured.')
          const verifiedUser = await firebaseAdmin.auth.verifyIdToken(idToken)
          const requestedItems = Array.isArray(body.items) ? body.items : []
          const lineItems = requestedItems.map((item: { id?: unknown; qty?: unknown }) => {
            const product = products.find((candidate) => candidate.id === Number(item.id))
            const quantity = Math.floor(Number(item.qty))

            if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
              throw new Error('One or more cart items are invalid.')
            }

            return {
              price_data: {
                currency: 'usd',
                product_data: {
                  name: product.name,
                  description: product.category,
                  images: /^https:\/\//.test(product.image) ? [product.image] : undefined,
                },
                unit_amount: Math.round(product.price * 100),
              },
              quantity,
            }
          })

          if (lineItems.length === 0) throw new Error('Your cart is empty.')

          const origin = env.APP_URL || `${req.headers['x-forwarded-proto'] || 'http'}://${req.headers.host || 'localhost:8443'}`
          const stripe = new Stripe(secretKey)
          const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            line_items: lineItems,
            customer_email: typeof body.email === 'string' ? body.email : undefined,
            shipping_address_collection: {
              allowed_countries: ['GB', 'US', 'FR', 'IT', 'DE'],
            },
            shipping_options: [
              {
                shipping_rate_data: {
                  type: 'fixed_amount',
                  fixed_amount: { amount: 2500, currency: 'usd' },
                  display_name: 'Standard delivery',
                  delivery_estimate: { minimum: { unit: 'business_day', value: 3 }, maximum: { unit: 'business_day', value: 6 } },
                },
              },
            ],
            metadata: {
              firebaseUid: verifiedUser.uid,
              firebaseEmail: verifiedUser.email || '',
            },
            success_url: `${origin}/?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/?checkout=cancelled`,
          })

          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ url: session.url }))
        } catch (error) {
          res.statusCode = 400
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: error instanceof Error ? error.message : 'Unable to create checkout session.' }))
        }
      })
    },
  }
}

const verificationCodes = new Map<string, { code: string; expiresAt: number }>()

function contactMessagePlugin(env: Record<string, string>): Plugin {
  return {
    name: 'resend-contact-message-api',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/contact-message', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.setHeader('Allow', 'POST')
          res.end(JSON.stringify({ error: 'Method not allowed.' }))
          return
        }

        try {
          const body = await readJsonBody(req)
          const name = typeof body.name === 'string' ? body.name.trim() : ''
          const email = typeof body.email === 'string' ? body.email.trim() : ''
          const subject = typeof body.subject === 'string' ? body.subject.trim() : ''
          const message = typeof body.message === 'string' ? body.message.trim() : ''
          if (!name || !/^\S+@\S+\.\S+$/.test(email) || !subject || !message) throw new Error('Please complete every field before sending your message.')
          if (name.length > 120 || email.length > 200 || subject.length > 200 || message.length > 5000) throw new Error('One or more fields are too long.')
          if (!env.RESEND_API_KEY || !env.RESEND_FROM_EMAIL) throw new Error('Email delivery is not configured.')

          const resend = new Resend(env.RESEND_API_KEY)
          const result = await resend.emails.send({
            from: env.RESEND_FROM_EMAIL,
            to: env.RESEND_CONTACT_TO_EMAIL || 'Bolajidavid05@gmail.com',
            replyTo: email,
            subject: `NŌIR contact: ${subject}`,
            html: emailLayout(`Message from ${escapeHtml(name)}`, `<strong style="color:#b8965a">${escapeHtml(subject)}</strong><br><br>${escapeHtml(message).replace(/\n/g, '<br>')}<br><br><span style="font-size:12px">Reply directly to this email to reach ${escapeHtml(email)}.</span>`),
          })
          if (result.error) throw new Error(result.error.message)
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ sent: true }))
        } catch (error) {
          res.statusCode = 400
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: error instanceof Error ? error.message : 'Unable to send your message.' }))
        }
      })
    },
  }
}

function emailVerificationPlugin(env: Record<string, string>): Plugin {
  return {
    name: 'resend-email-verification-api',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/send-verification-code', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.setHeader('Allow', 'POST')
          res.end(JSON.stringify({ error: 'Method not allowed.' }))
          return
        }

        try {
          const body = await readJsonBody(req)
          const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
          if (!/^\S+@\S+\.\S+$/.test(email)) throw new Error('Enter a valid email address.')
          if (!env.RESEND_API_KEY || !env.RESEND_FROM_EMAIL) {
            res.statusCode = 503
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'Email verification is not configured. Add RESEND_API_KEY and RESEND_FROM_EMAIL.' }))
            return
          }

          const code = crypto.randomInt(100000, 1000000).toString()
          verificationCodes.set(email, { code, expiresAt: Date.now() + 10 * 60 * 1000 })
          const resend = new Resend(env.RESEND_API_KEY)
          const result = await resend.emails.send({
            from: env.RESEND_FROM_EMAIL,
            to: email,
            subject: 'Your NŌIR verification code',
            html: emailLayout('Verify your email', `Your NŌIR verification code is <strong style="font-size:28px;letter-spacing:8px;color:#b8965a">${code}</strong><br><br>This code expires in 10 minutes. If you did not request it, you can safely ignore this message.`),
          })
          if (result.error) throw new Error(result.error.message)

          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ sent: true }))
        } catch (error) {
          res.statusCode = 400
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: error instanceof Error ? error.message : 'Unable to send verification email.' }))
        }
      })

      server.middlewares.use('/api/verify-email-code', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.setHeader('Allow', 'POST')
          res.end(JSON.stringify({ error: 'Method not allowed.' }))
          return
        }

        try {
          const body = await readJsonBody(req)
          const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
          const code = typeof body.code === 'string' ? body.code.trim() : ''
          const saved = verificationCodes.get(email)
          const verified = Boolean(saved && saved.expiresAt > Date.now() && saved.code === code)
          if (!verified) throw new Error('That code is incorrect or has expired.')
          verificationCodes.delete(email)
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ verified: true }))
        } catch (error) {
          res.statusCode = 400
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: error instanceof Error ? error.message : 'Unable to verify email.' }))
        }
      })
    },
  }
}

function stripeWebhookPlugin(env: Record<string, string>): Plugin {
  return {
    name: 'stripe-order-confirmation-webhook',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/stripe-webhook', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end()
          return
        }
        if (!env.STRIPE_SECRET_KEY || !env.STRIPE_WEBHOOK_SECRET || !env.RESEND_API_KEY || !env.RESEND_FROM_EMAIL) {
          res.statusCode = 503
          res.end('Webhook email integration is not configured.')
          return
        }

        try {
          const stripe = new Stripe(env.STRIPE_SECRET_KEY)
          const event = stripe.webhooks.constructEvent(await readRawBody(req), req.headers['stripe-signature'] || '', env.STRIPE_WEBHOOK_SECRET)
          if (event.type === 'checkout.session.completed') {
            const session = event.data.object as Stripe.Checkout.Session
            const firebaseUid = session.metadata?.firebaseUid
            const firebaseAdmin = getFirebaseAdmin(env)
            if (!firebaseUid || !firebaseAdmin) throw new Error('Firebase transaction storage is not configured.')
            const email = session.customer_details?.email || session.customer_email
            const items = await stripe.checkout.sessions.listLineItems(session.id, { limit: 100 })
            await firebaseAdmin.firestore.collection('users').doc(firebaseUid).collection('transactions').doc(session.id).set({
              referenceId: session.id,
              stripePaymentIntentId: typeof session.payment_intent === 'string' ? session.payment_intent : null,
              status: session.payment_status,
              amountTotal: session.amount_total || 0,
              currency: session.currency || 'usd',
              customerEmail: email || null,
              items: items.data.map((item) => ({ name: item.description || 'NŌIR piece', quantity: item.quantity || 1, amountTotal: item.amount_total || 0 })),
              createdAt: FieldValue.serverTimestamp(),
              updatedAt: FieldValue.serverTimestamp(),
            })
            if (email) {
              const itemRows = items.data.map((item) => `<tr><td style="padding:8px 0;color:#f2ede6">${item.description || 'NŌIR piece'}</td><td style="padding:8px 0;text-align:right;color:#b8965a">${item.quantity || 1} × ${formatAmount(item.amount_total || 0)}</td></tr>`).join('')
              const resend = new Resend(env.RESEND_API_KEY)
              const result = await resend.emails.send({
                from: env.RESEND_FROM_EMAIL,
                to: email,
                subject: 'Your NŌIR order is confirmed',
                html: emailLayout('Order confirmed', `Thank you for choosing NŌIR. Your order is being prepared with care.<br><br><table style="width:100%;border-top:1px solid #3b3630;border-bottom:1px solid #3b3630">${itemRows}</table><br><strong style="color:#f2ede6">Total: ${formatAmount(session.amount_total || 0)}</strong>`),
              })
              if (result.error) throw new Error(result.error.message)
            }
          }
          res.statusCode = 200
          res.end(JSON.stringify({ received: true }))
        } catch (error) {
          res.statusCode = 400
          res.end(error instanceof Error ? error.message : 'Invalid webhook.')
        }
      })
    },
  }
}

function getFirebaseAdmin(env: Record<string, string>) {
  const projectId = env.FIREBASE_ADMIN_PROJECT_ID || env.VITE_FIREBASE_PROJECT_ID
  const clientEmail = env.FIREBASE_ADMIN_CLIENT_EMAIL?.trim()
  const privateKey = env.FIREBASE_ADMIN_PRIVATE_KEY?.trim().replace(/\\n/g, '\n')
  if (!projectId || !clientEmail || !privateKey) return null
  const app = getApps()[0] || initializeAdminApp({ credential: cert({ projectId, clientEmail, privateKey }) })
  return { auth: getAdminAuth(app), firestore: getAdminFirestore(app) }
}

function readRawBody(req: import('node:http').IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let raw = ''
    req.setEncoding('utf8')
    req.on('data', (chunk) => { raw += chunk })
    req.on('end', () => resolve(raw))
    req.on('error', reject)
  })
}

function emailLayout(title: string, content: string): string {
  return `<div style="background:#0c0b09;padding:40px 20px;font-family:Arial,sans-serif;color:#aaa"><div style="max-width:560px;margin:auto;border:1px solid #3b3630;padding:36px;background:#151310"><div style="color:#b8965a;letter-spacing:6px;font-size:12px;margin-bottom:28px">NŌIR</div><h1 style="font-family:Georgia,serif;font-weight:normal;color:#f2ede6;font-size:32px">${title}</h1><p style="line-height:1.8">${content}</p><p style="border-top:1px solid #3b3630;padding-top:20px;margin-top:32px;font-size:12px">noir-studio.com</p></div></div>`
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;')
}

function formatAmount(amountInCents: number): string {
  return `$${(amountInCents / 100).toLocaleString('en-US', { minimumFractionDigits: 2 })}`
}

function readJsonBody(req: import('node:http').IncomingMessage): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    let raw = ''
    req.setEncoding('utf8')
    req.on('data', (chunk) => {
      raw += chunk
      if (raw.length > 100_000) reject(new Error('Request body is too large.'))
    })
    req.on('end', () => {
      try {
        const parsed = JSON.parse(raw || '{}')
        resolve(parsed && typeof parsed === 'object' ? parsed as Record<string, unknown> : {})
      } catch {
        reject(new Error('Invalid request body.'))
      }
    })
    req.on('error', reject)
  })
}

type FigmaSiteConfiguration = {
  title?: string
  description?: string
  language?: string
  robots?: {
    index?: boolean
  }
  icons?: {
    icon?: string
  }
  openGraph?: {
    image?: string
  }
  analytics?: {
    googleAnalyticsId?: string
  }
  customScripts?: {
    headStart?: string
    headEnd?: string
    bodyStart?: string
    bodyEnd?: string
  }
  accessibility?: {
    addBypassLinks?: boolean
  }
}

/** Applies /.figma/make/site.json to the generated document shell. */
function figmaSiteConfiguration(config: FigmaSiteConfiguration): Plugin {
  function sanitizeHtmlValue(value: string | undefined): string {
    return value?.replace(/[^a-zA-Z0-9_-]/g, '') || ''
  }
  function escapeHtmlText(value: string): string {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  }
  function replaceHtmlCommentSlot(html: string, slotName: string, content: string): string {
    return html.replace(`<!-- ${slotName} -->`, content)
  }

  const title = config.title ?? "Figma Make App"
  const description = config.description ?? ''
  const favicon = config.icons?.icon ?? ''
  const socialImage = config.openGraph?.image ?? ''
  const language = sanitizeHtmlValue(config.language) || 'en'
  const googleAnalyticsId = sanitizeHtmlValue(config.analytics?.googleAnalyticsId)
  const headStart = config.customScripts?.headStart ?? ''
  const headEnd = config.customScripts?.headEnd ?? ''
  const bodyStart = config.customScripts?.bodyStart ?? ''
  const bodyEnd = config.customScripts?.bodyEnd ?? ''
  const robotsTxt = config.robots?.index === false ? 'User-agent: *\nDisallow: /\n' : ''

  return {
    name: 'figma-site-configuration',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!robotsTxt || req.url?.split('?')[0] !== '/robots.txt') return next()

        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
        res.end(robotsTxt)
      })
    },
    generateBundle() {
      if (!robotsTxt) return

      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: robotsTxt,
      })
    },
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        let result = html
        result = replaceHtmlCommentSlot(result, 'figma:lang', language)
        result = replaceHtmlCommentSlot(result, 'figma:title', escapeHtmlText(title))
        result = replaceHtmlCommentSlot(result, 'figma:head-start', headStart)
        result = replaceHtmlCommentSlot(result, 'figma:head-end', headEnd)
        result = replaceHtmlCommentSlot(result, 'figma:body-start', bodyStart)
        result = replaceHtmlCommentSlot(result, 'figma:body-end', bodyEnd)

        const tags: HtmlTagDescriptor[] = []
        if (description) {
          tags.push({ tag: 'meta', attrs: { name: 'description', content: description }, injectTo: 'head' })
        }
        if (config.robots?.index === false) {
          tags.push({ tag: 'meta', attrs: { name: 'robots', content: 'noindex, nofollow' }, injectTo: 'head' })
        }
        if (favicon) {
          tags.push({ tag: 'link', attrs: { rel: 'icon', href: favicon }, injectTo: 'head' })
        }
        if (title) {
          tags.push({ tag: 'meta', attrs: { property: 'og:title', content: title }, injectTo: 'head' })
        }
        if (description) {
          tags.push({ tag: 'meta', attrs: { property: 'og:description', content: description }, injectTo: 'head' })
        }
        if (socialImage) {
          tags.push(
            { tag: 'meta', attrs: { property: 'og:image', content: socialImage }, injectTo: 'head' },
            { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' }, injectTo: 'head' },
            { tag: 'meta', attrs: { name: 'twitter:image', content: socialImage }, injectTo: 'head' },
          )
        }

        if (googleAnalyticsId) {
          tags.push(
            {
              tag: 'script',
              attrs: {
                async: true,
                src: `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`,
              },
              injectTo: 'head',
            },
            {
              tag: 'script',
              children: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', ${JSON.stringify(googleAnalyticsId)});
`,
              injectTo: 'head',
            },
          )
        }

        if (config.accessibility?.addBypassLinks) {
          tags.push(
            {
              tag: 'style',
              children: `
  .figma-bypass-link {
    position: fixed;
    top: 8px;
    left: 8px;
    z-index: 2147483647;
    transform: translateY(-150%);
    border-radius: 6px;
    background: #111827;
    color: #fff;
    padding: 8px 12px;
    font: 600 14px/1.2 system-ui, sans-serif;
    text-decoration: none;
  }
  .figma-bypass-link:focus {
    transform: translateY(0);
  }
`,
              injectTo: 'head',
            },
            {
              tag: 'a',
              attrs: { class: 'figma-bypass-link', href: '#root' },
              children: 'Skip to content',
              injectTo: 'body-prepend',
            },
          )
        }

        return {
          html: result,
          tags,
        }
      },
    },
  }
}

/**
 * Replay the most recent build error to clients that connect after
 * it was first broadcast. Vite buffers an error payload only while
 * no clients are connected and clears the buffer on the first
 * reconnect (see `bufferedMessage` in `createWebSocketServer`), so
 * if the preview iframe reloads after Vite already delivered an
 * error to a live socket, the new socket misses the payload and
 * the overlay stays hidden even though the build is still broken.
 * We intercept `ws.send` to remember the latest error and replay
 * it on every new connection; the cache clears on a successful
 * `update` or `full-reload` so a stale overlay can't survive a
 * fixed build.
 */
function figmaErrorOverlayReplay(): Plugin {
  return {
    name: 'figma-error-overlay-replay',
    apply: 'serve',
    configureServer(server) {
      let lastError: object | null = null

      const origSend = server.ws.send.bind(server.ws) as (...args: any[]) => void
      server.ws.send = ((...args: any[]) => {
        const payload = args[0]
        if (payload && typeof payload === 'object' && !Array.isArray(payload)) {
          const type = (payload as { type?: string }).type
          if (type === 'error') {
            lastError = payload as object
          } else if (type === 'update' || type === 'full-reload') {
            lastError = null
          }
        }
        return origSend(...args)
      }) as typeof server.ws.send

      server.ws.on('connection', (socket) => {
        if (lastError !== null) {
          socket.send(JSON.stringify(lastError))
        }
      })
    },
  }
}

/**
 * Reload when a module that previously defined a React Refresh boundary stops
 * defining one. This happens when an agent moves a component into a new file
 * and replaces the old module with a re-export:
 *
 *   export { default } from './app/App'
 *
 * Vite otherwise accepts the update using the previous module's HMR boundary,
 * but the re-export-only transform no longer registers a replacement for the
 * mounted component family. React reports a successful refresh while leaving
 * the old tree mounted until the page is reloaded.
 */
function figmaReactRefreshBoundaryFallback(): Plugin {
  const hadRefreshBoundary = new Map<string, boolean>()
  let sendFullReload: (() => void) | null = null

  return {
    name: 'figma-react-refresh-boundary-fallback',
    apply: 'serve',
    enforce: 'post',
    configureServer(server) {
      sendFullReload = () => server.ws.send({ type: 'full-reload', path: '*' })
    },
    transform(code, id) {
      if (!/\.[jt]sx?(?:\?|$)/.test(id) || id.includes('/node_modules/')) return null

      const moduleId = id.split('?')[0] ?? id
      const hasRefreshBoundary = code.includes('registerExportsForReactRefresh')
      const previousHadRefreshBoundary = hadRefreshBoundary.get(moduleId)
      hadRefreshBoundary.set(moduleId, hasRefreshBoundary)

      if (previousHadRefreshBoundary && !hasRefreshBoundary) {
        queueMicrotask(() => sendFullReload?.())
      }

      return null
    },
  }
}

/**
 * Serves a blank render-target page at /.figma/make/kit.html that
 * the Figma preview script drives directly. The page exposes a
 * registry of every file matching `storiesGlob` on
 * window.__FIGMA__.stories so the design surface can dynamically
 * import + mount each entry into its own grid view.
 *
 * Dev-only: `apply: 'serve'` gates the plugin to `vite dev`. Prod
 * builds (`vite build`) skip it entirely so the route doesn't leak
 * into shipped bundles.
 */
function figmaMakeKitPlugin(options: { storiesGlob: string | string[] }): Plugin {
  const storiesGlob = Array.isArray(options.storiesGlob) ? options.storiesGlob : [options.storiesGlob]
  const ROUTE = '/.figma/make/kit.html'
  const VIRTUAL_ID = 'virtual:figma-stories'
  const RESOLVED_ID = '\0' + VIRTUAL_ID
  const STORIES_MODULE = `export const stories = import.meta.glob(${JSON.stringify(storiesGlob)})`
  const HTML_BOOTSTRAP = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body>
<div id="figma-make-kit-root"></div>
<script type="module">
  import { stories } from 'virtual:figma-stories'
  window.__FIGMA__ = Object.assign(window.__FIGMA__ ?? {}, { stories })
  window.dispatchEvent(new CustomEvent('figma.ready'))
</script>
</body>
</html>`

  return {
    name: 'figma-make-kit',
    apply: 'serve',
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID
      return null
    },
    load(id) {
      if (id !== RESOLVED_ID) return null
      return STORIES_MODULE
    },
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url || ''
        if (url.split('?')[0] !== ROUTE) return next()

        try {
          res.setHeader('Content-Type', 'text/html')
          res.end(await server.transformIndexHtml(url, HTML_BOOTSTRAP))
        } catch (err) {
          next(err as Error)
        }
      })
    },
  }
}
