import React from "react"
import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Web3Provider } from '@/components/web3/Web3Provider'
import { FarcasterProvider } from '@/lib/farcaster/FarcasterProvider'
import './globals.css'

export const viewport: Viewport = {
  themeColor: '#1a3a2a',
  width: 'device-width',
  initialScale: 1,
  userScalable: true,
}

export const metadata: Metadata = {
  title: 'Soccer Quiz Pro | Earn SOCPT Tokens on CELO',
  description: 'Play soccer trivia, pay 0.1 CELO, earn SOCPT tokens based on your score. A Farcaster Mini App powered by Web3.',
  generator: 'v0.app',
  openGraph: {
    title: 'Soccer Quiz Pro',
    description: 'Earn crypto tokens by testing your soccer knowledge',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <Web3Provider>
          <FarcasterProvider>
            {children}
          </FarcasterProvider>
        </Web3Provider>
        <Analytics />
      </body>
    </html>
  )
}
