"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import Script from "next/script"

const GA_ID = "G-CH33KS8XBF"
const STORAGE_KEY = "sg-cookie-consent"

type Choice = "accepted" | "declined"

/**
 * Reads the stored choice. Wrapped because localStorage throws in some
 * private-browsing and blocked-storage configurations, and an exception here
 * would take the whole page down.
 */
function readChoice(): Choice | null {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY)
    return v === "accepted" || v === "declined" ? v : null
  } catch {
    return null
  }
}

function writeChoice(choice: Choice) {
  try {
    window.localStorage.setItem(STORAGE_KEY, choice)
  } catch {
    // Storage unavailable. The banner will simply ask again next visit, which
    // is the correct failure mode: no consent stored means no analytics.
  }
}

/**
 * Best effort removal of the cookies Google Analytics has already set, for
 * someone who accepted and later declined. GA cookies are _ga and _ga_<id>,
 * set on the registrable domain, so clear both the exact host and the dotted
 * parent. Anything we cannot see from JavaScript (HttpOnly) is not ours to
 * begin with.
 */
function clearAnalyticsCookies() {
  try {
    const host = window.location.hostname
    const domains = [host, "." + host, "." + host.split(".").slice(-2).join(".")]
    for (const raw of document.cookie.split(";")) {
      const name = raw.split("=")[0]?.trim()
      if (!name || !(name === "_ga" || name.startsWith("_ga_") || name === "_gid")) continue
      for (const d of domains) {
        document.cookie = `${name}=; Max-Age=0; path=/; domain=${d}`
      }
      document.cookie = `${name}=; Max-Age=0; path=/`
    }
  } catch {
    // Non-fatal: the scripts are not loading either way.
  }
}

export function CookieConsent() {
  // `undefined` means "not read yet". The server and the first client render
  // both produce nothing, so there is no hydration mismatch; the effect below
  // then decides whether to show the banner.
  const [choice, setChoice] = useState<Choice | null | undefined>(undefined)

  useEffect(() => {
    setChoice(readChoice())
    const reopen = () => setChoice(null)
    window.addEventListener("sg:open-cookie-settings", reopen)
    return () => window.removeEventListener("sg:open-cookie-settings", reopen)
  }, [])

  const decide = useCallback((next: Choice) => {
    writeChoice(next)
    setChoice(next)
    if (next === "declined") clearAnalyticsCookies()
  }, [])

  return (
    <>
      {/* Analytics is not merely hidden when consent is absent: the tags are
          never rendered, so gtag.js is never requested and no analytics cookie
          is ever set. That is what makes this prior consent rather than a
          notice after the fact. */}
      {choice === "accepted" && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
        </>
      )}

      {choice === null && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label="Cookie choices"
          className="fixed inset-x-0 bottom-0 z-[120] p-3 sm:p-4"
        >
          <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-black/90 backdrop-blur-xl p-4 sm:p-5 shadow-2xl">
            <p className="text-gray-300 font-sora text-sm leading-relaxed">
              This site uses Google Analytics to understand how visitors find it. Those
              cookies are only set if you accept. Declining leaves the site fully
              working.{" "}
              <Link
                href="/privacy"
                className="text-purple-300 underline underline-offset-2 hover:text-purple-200"
              >
                Privacy policy
              </Link>
              .
            </p>
            <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:justify-end">
              <button
                type="button"
                onClick={() => decide("declined")}
                className="order-2 sm:order-1 px-5 py-2.5 rounded-full border border-white/20 text-white font-sora text-sm hover:bg-white/10 transition-colors duration-200"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={() => decide("accepted")}
                className="order-1 sm:order-2 px-5 py-2.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-sora text-sm font-medium transition-colors duration-200"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

/**
 * Footer link that reopens the banner. Withdrawing consent has to be as easy
 * as giving it, so this stays reachable after a choice has been made.
 */
export function CookieSettingsLink({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("sg:open-cookie-settings"))}
      className={className}
    >
      Cookie settings
    </button>
  )
}
