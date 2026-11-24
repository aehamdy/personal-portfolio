import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Suspense, type ReactNode } from "react";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import GlobalLayout from "@/components/layout/GlobalLayout";
import { PageTransitionProvider } from "@/components/providers/PageTransitionProvider";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const humane = localFont({
  src: [
    {
      path: "./fonts/font-display/Humane-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/font-display/Humane-Medium.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/font-display/Humane-Regular.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/font-display/Humane-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/font-display/Humane-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-humane",
  display: "swap",
});

const HKGuise = localFont({
  src: [
    {
      path: "./fonts/font-body/HK-Guise-ExtraLight.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./fonts/font-body/HK-Guise-Thin.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/font-body/HK-Guise-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/font-body/HK-Guise-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/font-body/HK-Guise-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/font-body/HK-Guise-Semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/font-body/HK-Guise-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-HKGuise",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yourdomain.com"),

  title: {
    default: "Ahmed Essam | Frontend Developer",
    template: "%s | Ahmed Essam",
  },

  description:
    "Ahmed Essam is a Frontend Developer passionate about building modern, responsive, and user-friendly web experiences.",

  applicationName: "Ahmed Essam Portfolio",

  openGraph: {
    type: "website",
    siteName: "Ahmed Essam Portfolio",
    title: "Ahmed Essam | Frontend Developer",
    description:
      "Explore my portfolio, projects, skills, and experience in frontend development.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Ahmed Essam – Frontend Developer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Ahmed Essam | Frontend Developer",
    description:
      "Explore my portfolio, projects, skills, and experience in frontend development.",
    images: ["/opengraph-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="black"
      className={cn(
        "h-full",
        "antialiased",
        humane.variable,
        HKGuise.variable,
        "font-sans",
        geist.variable,
      )}
    >
      <body>
        <Suspense fallback={<div className="min-h-screen" />}>
          <PageTransitionProvider>
            <GlobalLayout>{children}</GlobalLayout>
          </PageTransitionProvider>
        </Suspense>
      </body>
    </html>
  );
}
