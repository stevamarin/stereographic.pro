import type React from "react"
import type { Metadata } from "next"
import { Inter_Tight } from "next/font/google"
import { Sora } from "next/font/google"
import "./globals.css"

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
  title: "Stereographic Production",
  description: "Turning Ideas Into Experiences",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`bg-black ${interTight.variable} ${sora.variable}`}>
      <body className={`${interTight.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}
