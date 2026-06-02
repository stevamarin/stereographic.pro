import type { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "StereoGraphic Production | Links",
  description: "Connect with StereoGraphic Production - portfolio, booking, social media, and more.",
}

const links = [
  {
    label: "View Our Portfolio",
    href: "https://stereographic.pro",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    label: "Book a Session",
    href: "https://stereographic.pro/#contact",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/marinkovicstevan/",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/stevan-marinkovi%C4%87-8b7ba0199/",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "Email Us",
    href: "mailto:stevan@stereographic.pro",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
]

export default function LinksPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center px-4 py-12">
      {/* Profile */}
      <div className="flex flex-col items-center mb-10">
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-purple-500/50 mb-4">
          <Image
            src="/stevan.jpg"
            alt="Stevan Marinković"
            width={96}
            height={96}
            className="w-full h-full object-cover"
            priority
          />
        </div>
        <Image
          src="/logos/main/Stereographic_PNG-06.png"
          alt="StereoGraphic Production"
          width={220}
          height={60}
          className="h-8 w-auto mb-2"
          priority
        />
        <p className="text-gray-400 font-sora text-sm text-center max-w-[260px]">
          Sound Design & Audio Post-Production
        </p>
      </div>

      {/* Links */}
      <div className="w-full max-w-[360px] flex flex-col gap-3">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("mailto:") ? undefined : "_blank"}
            rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
            className="group flex items-center gap-3 w-full px-5 py-3.5 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-purple-500/10 hover:border-purple-500/30 text-white transition-all duration-300"
          >
            <span className="text-purple-400 group-hover:scale-110 transition-transform duration-300">
              {link.icon}
            </span>
            <span className="font-sora text-sm font-medium flex-1">
              {link.label}
            </span>
            <svg className="w-4 h-4 text-gray-600 group-hover:text-purple-400 transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </a>
        ))}
      </div>

      {/* Footer */}
      <p className="mt-12 text-gray-600 text-xs font-sora">
        stereographic.pro
      </p>
    </div>
  )
}
