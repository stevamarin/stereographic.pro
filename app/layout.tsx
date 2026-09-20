import type React from "react"
import type { Metadata } from "next"
import { Inter_Tight } from "next/font/google"
import { Sora } from "next/font/google"
import "./globals.css"
import { CookieConsent } from "@/components/cookie-consent"

const interTight = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-tight",
})

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sora",
})

export const metadata: Metadata = {
  title: "StereoGraphic Production",
  description:
    "Professional sound design, mixing, mastering, and audio post-production for content creators, filmmakers, and game studios. Based in Belgrade, working worldwide.",
  keywords: [
    "sound design",
    "audio post-production",
    "mixing and mastering",
    "game audio",
    "Wwise",
    "foley",
    "dialogue editing",
    "original score",
    "content creator audio",
    "podcast editing",
    "Belgrade audio engineer",
  ],
  openGraph: {
    title: "StereoGraphic Production | Sound Design & Audio Post-Production",
    description:
      "Professional sound design, mixing, mastering, and audio post-production for content creators, filmmakers, and game studios.",
    url: "https://stereographic.pro",
    siteName: "StereoGraphic Production",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StereoGraphic Production | Sound Design & Audio Post-Production",
    description:
      "Professional sound design, mixing, mastering, and audio post-production for content creators, filmmakers, and game studios.",
  },
  metadataBase: new URL("https://stereographic.pro"),
  alternates: {
    canonical: "https://stereographic.pro",
  },
  // Proves ownership of the site to Google Search Console. Not a secret: it
  // is public in the page source by design, and only confirms control of
  // this domain. Removing it can un-verify the property, so leave it in place.
  verification: {
    google: "jYVM1DrMMh7C1hIGXXguOi1NWSkEW6l4YRLQS4qj18w",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "StereoGraphic Production",
  description:
    "Professional sound design, audio post-production, mixing, mastering, and game audio services for content creators, filmmakers, and game studios.",
  url: "https://stereographic.pro",
  email: "stevan@stereographic.pro",
  telephone: "+381621576924",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Belgrade",
    addressCountry: "RS",
  },
  sameAs: [
    "https://www.instagram.com/marinkovicstevan/",
    "https://www.linkedin.com/in/stevan-marinkovi%C4%87-8b7ba0199/",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Audio Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Mixing & Mastering",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Sound Design",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Dialogue Editing",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Original Score Production",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Foley & SFX",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Game Audio",
        },
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`bg-black ${interTight.variable} ${sora.variable}`}>
      <head>
        {/* Google Analytics is no longer loaded here. It now lives inside
            <CookieConsent /> and is only rendered once a visitor has opted in,
            so gtag.js is never requested and no analytics cookie is set until
            then. JSON-LD stays: it is static markup and sets nothing. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${interTight.className} antialiased`}>
        {children}
        <CookieConsent />
      </body>
    </html>
  )
}
