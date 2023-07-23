import Nav from "@/components/layout/nav";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/layout/footer";
import { Toaster } from "@/components/ui/toaster";
import SvgBackground from "@/components/layout/background";
import GoogleAnalytics from "@/components/googleanalytics";

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
                <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION} />
            </head>
            <GoogleAnalytics measurementID={process.env.NEXT_PUBLIC_MEASUREMENT_ID} />
            <body className={`relative ${inter.className} h-screen`}>
                <Nav />
                <main className="relative px-4 min-h-[calc(100vh-theme(space.28))] pb-16">
                    {children}
                    <SvgBackground />
                </main>
                <Toaster />
                <Footer />
            </body>
        </html>
    );
}
