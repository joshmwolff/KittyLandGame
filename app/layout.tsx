import type { Metadata } from "next";
import { Playfair_Display, Space_Grotesk } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Unprompted 2035 | S.W. Gale",
  description:
    "Unprompted Magazine's best stories on how AI shaped life, society, and the planet in 2035.",
  openGraph: {
    title: "Unprompted 2035",
    description:
      "A magazine-style collection on AI, society, and the planet in 2035.",
    url: "https://example.com",
    siteName: "Unprompted 2035",
    images: [
      {
        url: "/og-placeholder.svg",
        width: 1200,
        height: 630,
        alt: "Unprompted 2035 cover placeholder",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unprompted 2035",
    description:
      "Unprompted Magazine's best stories on how AI shaped life, society, and the planet in 2035.",
    images: ["/og-placeholder.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${playfair.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
