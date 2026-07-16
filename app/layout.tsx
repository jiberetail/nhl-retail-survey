import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import "./globals.css";

const nhlFont = Oswald({
  variable: "--font-nhl",
  weight: "variable",
  subsets: ["latin", "latin-ext", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NHL Retail Survey",
  description: "Interactive NHL retail survey and merchandise finder.",
  icons: {
    icon: "/nhl-logo.png",
    shortcut: "/nhl-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nhlFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
