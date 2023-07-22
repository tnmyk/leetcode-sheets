import Nav from "@/components/layout/nav";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/layout/footer";
import { Toaster } from "@/components/ui/toaster";
import SvgBackground from "@/components/layout/background";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Leetcode Lists",
    description: "Generate spreadsheets from public leetcode lists.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`relative ${inter.className}`}>
                <Nav />
                <main className="relative px-4 min-h-[90vh] pb-16">
                    {children}
                    <SvgBackground />
                </main>
                <Toaster />
                <Footer />
            </body>
            <Script
                async
                src="https://www.googletagmanager.com/gtag/js?id=G-XF2N43JGWR"
            ></Script>
            <Script>
                {`window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-XF2N43JGWR');
                `}
            </Script>
        </html>
    );
}
