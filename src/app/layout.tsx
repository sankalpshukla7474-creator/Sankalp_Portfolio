import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Sankalp Shukla | Enterprise AI & Automation Engineer",
  description:
    "Premium developer portfolio for Sankalp Shukla, Enterprise AI & Automation Engineer building RAG systems, custom AI agents, and n8n workflows.",
  keywords: [
    "Sankalp Shukla",
    "AI Engineer",
    "Automation Engineer",
    "RAG Systems",
    "LangChain",
    "n8n",
    "Custom AI Agents",
  ],
  authors: [{ name: "Sankalp Shukla" }],
  openGraph: {
    title: "Sankalp Shukla | Enterprise AI & Automation Engineer",
    description:
      "Production-ready RAG systems, custom AI agents, and workflow automation for real business problems.",
    type: "website",
    images: ["/sankalp-profile.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jakarta.variable} scroll-smooth antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
