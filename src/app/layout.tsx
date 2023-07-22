import Nav from "@/components/layout/nav";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/layout/footer";
import { Toaster } from "@/components/ui/toaster";
import SvgBackground from "@/components/layout/background";
import GoogleAnalytics from "@/components/ganalytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Leetcode Sheets",
    description: "Generate spreadsheets from public leetcode lists.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <meta name="google-site-verification" content="5Sy0Ek5fJZ3vhUMWMXogWUd5NKNdPTqmcUdGz4JUVaw" />
            </head>
            <GoogleAnalytics />
            <body className={`relative ${inter.className}`}>
                <Nav />
                <main className="relative px-4 min-h-[90vh] pb-16">
                    {children}
                    <SvgBackground />
                </main>
                <Toaster />
                <Footer />
            </body>
        </html>
    );
}
