import type { Metadata } from "next"
import Link from "next/link"
import { CookieSettingsLink } from "@/components/cookie-consent"

export const metadata: Metadata = {
  title: "Privacy Policy | StereoGraphic Production",
  description:
    "How StereoGraphic Production handles personal data: analytics, the contact form, third party processors, and your rights.",
  alternates: { canonical: "https://stereographic.pro/privacy" },
}

const UPDATED = "21 September 2026"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl sm:text-2xl font-semibold text-white font-inter-tight mb-3">
        {title}
      </h2>
      <div className="space-y-3 text-gray-400 font-sora text-sm sm:text-base leading-relaxed">
        {children}
      </div>
    </section>
  )
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black px-4 sm:px-6 py-16 sm:py-24">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-block mb-10 text-purple-300 hover:text-purple-200 font-sora text-sm transition-colors"
        >
          Back to the site
        </Link>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white font-inter-tight mb-3">
          Privacy Policy
        </h1>
        <p className="text-gray-500 font-sora text-sm mb-12">Last updated {UPDATED}</p>

        <Section title="Who is responsible">
          <p>
            This site is run by StereoGraphic Production, an audio post-production
            studio based in Belgrade, Serbia. For anything in this policy, including
            requests about your data, write to{" "}
            <a
              href="mailto:stevan@stereographic.pro"
              className="text-purple-300 hover:text-purple-200 underline underline-offset-2"
            >
              stevan@stereographic.pro
            </a>
            .
          </p>
        </Section>

        <Section title="Analytics, and why nothing runs until you say so">
          <p>
            This site uses Google Analytics to see how many people visit and how they
            found it. It is loaded only if you press Accept on the cookie banner. If
            you decline, or simply ignore the banner, the Google Analytics script is
            never requested and no analytics cookie is placed on your device.
          </p>
          <p>
            If you do accept, Google Analytics sets cookies named{" "}
            <code className="text-gray-300">_ga</code> and{" "}
            <code className="text-gray-300">_ga_*</code> which give your browser a
            random identifier so repeat visits can be counted as one visitor. It
            records things like pages viewed, approximate location derived from your
            IP address, referring site, and device and browser type. It is not used to
            identify you by name and it is not used for advertising.
          </p>
          <p>
            You can change your mind at any time: <CookieSettingsLink className="text-purple-300 hover:text-purple-200 underline underline-offset-2" />.
            Declining after having accepted also deletes the analytics cookies this
            site can see.
          </p>
        </Section>

        <Section title="The contact form">
          <p>
            If you send a message through the form, it collects your name, email
            address, the project type and budget range you pick, and whatever you
            write in the message. That information is used to reply to you and to
            discuss the work. It is not sold and not used for marketing lists.
          </p>
          <p>
            The form is protected by Cloudflare Turnstile, which checks that a person
            rather than a bot is submitting it. Turnstile receives your IP address and
            basic browser information to make that check.
          </p>
        </Section>

        <Section title="Who else processes your data">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <span className="text-gray-300">Vercel</span> hosts this site and keeps
              standard server logs, including IP addresses, for security and
              reliability.
            </li>
            <li>
              <span className="text-gray-300">Google Analytics</span> processes
              analytics data, and only if you accept.
            </li>
            <li>
              <span className="text-gray-300">Formspree</span> receives and delivers
              contact form submissions by email.
            </li>
            <li>
              <span className="text-gray-300">Cloudflare</span> provides the Turnstile
              anti-bot check on the contact form.
            </li>
          </ul>
          <p>
            Some of these are based outside Serbia and the European Economic Area, so
            your data may be processed abroad under the transfer safeguards those
            providers operate.
          </p>
        </Section>

        <Section title="How long it is kept">
          <p>
            Contact form messages are kept for as long as needed to answer you and to
            keep a record of work discussed, and are deleted on request. Google
            Analytics data is retained according to the retention period set in that
            account, after which Google deletes it.
          </p>
        </Section>

        <Section title="Your rights">
          <p>
            You can ask what personal data is held about you, ask for it to be
            corrected or deleted, withdraw consent to analytics, or object to how it is
            used. Email{" "}
            <a
              href="mailto:stevan@stereographic.pro"
              className="text-purple-300 hover:text-purple-200 underline underline-offset-2"
            >
              stevan@stereographic.pro
            </a>{" "}
            and it will be handled. If you are in the European Economic Area or the
            United Kingdom you also have the right to complain to your national data
            protection authority; in Serbia this is the Commissioner for Information of
            Public Importance and Personal Data Protection.
          </p>
        </Section>

        <Section title="Changes">
          <p>
            If this policy changes, the date at the top of the page changes with it.
          </p>
        </Section>

        <Link
          href="/"
          className="inline-block mt-4 text-purple-300 hover:text-purple-200 font-sora text-sm transition-colors"
        >
          Back to the site
        </Link>
      </div>
    </main>
  )
}
