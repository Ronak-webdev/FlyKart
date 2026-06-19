import type { Metadata } from "next";
import { Outfit, Geist } from "next/font/google";
import "./globals.css";

export const dynamic = 'force-static';
import { Header } from "@/components/layout/Header";
import { MegaMenuNav } from "@/components/layout/MegaMenuNav";
import { Footer } from "@/components/layout/Footer";
import { ToasterProvider } from "@/components/providers/ToasterProvider";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "FlyKart | Premium E-Commerce",
  description: "Shop the best Namkeen, Bakery, Chocolates, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <ToasterProvider />
        <Header />
        <MegaMenuNav />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
