import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Armorray | Enterprise Hybrid PACS Platform",
  description:
    "Premium Hybrid PACS for medical imaging. View diagnostic-quality images on any device. Vendor-neutral archives. Impacting 37M+ lives across 105+ countries.",
  openGraph: {
    title: "Armorray | Enterprise Hybrid PACS Platform",
    description:
      "Data, detail, and diagnosis. Enterprise-grade hybrid PACS trusted by radiology centers, hospitals, and clinics worldwide.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
