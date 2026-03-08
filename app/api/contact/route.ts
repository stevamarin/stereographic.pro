import { NextRequest, NextResponse } from "next/server"

const FORMSPREE_URL = "https://formspree.io/f/maqdrlwe"
const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify"

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { token, honeypot, name, email, project_type, budget, message } = body

  // Reject if honeypot field is filled (bots fill all fields)
  if (honeypot) {
    return NextResponse.json({ success: true }) // Silent reject
  }

  // Verify Cloudflare Turnstile token
  const secretKey = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY
  if (secretKey) {
    const verifyRes = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: secretKey,
        response: token,
        remoteip: req.headers.get("x-forwarded-for") ?? undefined,
      }),
    })
    const verifyData = await verifyRes.json()
    if (!verifyData.success) {
      return NextResponse.json(
        { error: "Security verification failed. Please try again." },
        { status: 400 }
      )
    }
  }

  // Forward to Formspree
  const formspreeRes = await fetch(FORMSPREE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ name, email, project_type, budget, message }),
  })

  if (formspreeRes.ok) {
    return NextResponse.json({ success: true })
  }

  return NextResponse.json(
    { error: "Something went wrong. Please try again." },
    { status: 500 }
  )
}
