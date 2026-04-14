import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import CustomCursor from "@/components/custom-cursor";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "ZAP Agency | Web & Mobile Development Studio",
  description:
    "We build modern web and mobile applications that scale. From idea to launch — your digital product partner.",
  openGraph: {
    title: "ZAP Agency | Web & Mobile Development Studio",
    description:
      "We design and develop high-performance web and mobile applications for startups and businesses worldwide.",
    type: "website",
  },
 icons: {
  icon: "https://www.zapsolutionz.com/ZAP%20WMS%20R.png",
}
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
      <head>
        {/* Favicon (extra fallback for safety) */}
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-[#050505] text-white`}
      >
        <CustomCursor />
        {children}
        <Analytics />
      </body>
    </html>
  );
}