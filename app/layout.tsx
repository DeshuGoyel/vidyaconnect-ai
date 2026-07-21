import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VidyaConnect AI — Find Your Perfect Tutor",
  description:
    "India's first AI-powered tutoring marketplace. Get matched with the right teacher, powered by GPT-5.6. For students, by teachers.",
  keywords: ["tutor", "education", "AI", "India", "learning", "online tutor"],
  authors: [{ name: "VidyaConnect AI" }],
  openGraph: {
    title: "VidyaConnect AI",
    description: "Find your perfect tutor with AI-powered matching",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#F97316",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-ink-50 text-ink-900 antialiased">{children}</body>
    </html>
  );
}
