import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AnalyticsProvider, ScrollProgressTracker, AnalyticsDebugger } from '@/components/analytics/advanced-analytics'
import PerformanceMetricsDashboard from '@/components/analytics/performance-metrics-dashboard'

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ADmyBRAND AI Suite - Transform Your Marketing with AI",
  description: "Revolutionize your marketing strategy with our AI-powered suite. Create, optimize, and scale your brand presence with advanced AI content generation, smart audience targeting, and automated campaign optimization.",
  keywords: ["AI marketing", "content creation", "marketing automation", "brand optimization", "digital marketing", "AI suite"],
  authors: [{ name: "ADmyBRAND AI Team" }],
  creator: "ADmyBRAND AI",
  publisher: "ADmyBRAND AI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://admybrand-ai.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ADmyBRAND AI Suite - Transform Your Marketing with AI",
    description: "Revolutionize your marketing strategy with our AI-powered suite. Create, optimize, and scale your brand presence like never before.",
    url: "https://admybrand-ai.vercel.app",
    siteName: "ADmyBRAND AI Suite",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ADmyBRAND AI Suite - AI-Powered Marketing Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ADmyBRAND AI Suite - Transform Your Marketing with AI",
    description: "Revolutionize your marketing strategy with our AI-powered suite. Create, optimize, and scale your brand presence like never before.",
    images: ["/og-image.jpg"],
    creator: "@admybrandai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
    yahoo: "yahoo-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#3B82F6" />
        <meta name="color-scheme" content="light" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className={`font-sans antialiased`}>
        <AnalyticsProvider>
          {children}
          <ScrollProgressTracker />
          <AnalyticsDebugger />
          <PerformanceMetricsDashboard />
        </AnalyticsProvider>
      </body>
    </html>
  );
}
