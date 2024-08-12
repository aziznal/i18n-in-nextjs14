import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/lib/client/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "I18n in nextjs and the react world",
  description: "Just what is the latest in i18n nowadays?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
