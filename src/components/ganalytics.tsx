"use client";
import Script from "next/script";

const GoogleAnalytics = () => {
    return (
        <>
            <Script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=G-${process.env.NEXT_PUBLIC_GTAG_ID}`}
            ></Script>
            <Script id="google-analytics">
                {`window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-${process.env.NEXT_PUBLIC_GTAG_ID}');
                `}
            </Script>
        </>
    );
};

export default GoogleAnalytics;
