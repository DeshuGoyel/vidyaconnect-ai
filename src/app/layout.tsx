import type { Metadata, Viewport } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: {
    default: "VidyaConnect AI | Apni Gali Ka Best Teacher",
    template: "%s | VidyaConnect AI"
  },
  description: "Pan-India hyperlocal tuition platform with AI teacher matching, free demos, and parent progress reports.",
  applicationName: "VidyaConnect AI",
  manifest: "/manifest.json",
  openGraph: {
    title: "VidyaConnect AI",
    description: "Apni Gali Ka Best Teacher",
    type: "website"
  }
};

export const viewport: Viewport = {
  themeColor: "#FF6B00",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
