import Nav from "@/components/layout/nav";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/layout/footer";

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
            <body className={`${inter.className} px-4`}>
                <Nav />
                {children}
                <Footer />
            </body>
        </html>
    );
}
