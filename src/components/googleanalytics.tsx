"use client";
import Script from "next/script";

interface IGAnalytics {
    measurementID?: string;
}
const GoogleAnalytics = ({ measurementID }: IGAnalytics) => {
    if (!measurementID) return <></>
    return (
        <>
            <Script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${measurementID}`}
            ></Script>
            <Script id="google-analytics">
                {`window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${measurementID}');
                `}
            </Script>
        </>
    );
};

export default GoogleAnalytics;
