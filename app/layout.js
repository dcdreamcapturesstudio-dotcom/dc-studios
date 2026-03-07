import "./globals.css";
import { fontVariables } from "./fonts";
import SmoothScroll from "../components/SmoothScroll";
import Preloader from "../components/Preloader";

import FloatingContact from "../components/FloatingContact";

export const metadata = {
  metadataBase: new URL("https://dcstudios.in"),
  title: {
    default: "DC Studios | Premium Photography in Tirupati",
    template: "%s | DC Studios"
  },
  description: "Exclusively for Newborn, toddlers, maternity shoots and conceptual fashion photography in Tirupati. Capturing your most precious memories with artistic precision.",
  keywords: ["photography studio Tirupati", "newborn photography", "maternity shoots", "toddler photography Tirupati", "fashion shoots AP", "best photographer in Tirupati", "DC Studios", "Dream Capture Studios", "Dream Capture", "DC", "Dream Capture Photography", "Dream Capture Photography Tirupati"],
  authors: [{ name: "DC Studios" }],
  creator: "DC Studios",
  publisher: "DC Studios",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/dc-image.jpg" },
      { url: "/dc-image.jpg", sizes: "32x32", type: "image/jpeg" },
    ],
    shortcut: "/dc-image.jpg",
    apple: "/dc-image.jpg",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://dcstudios.in",
    siteName: "DC Studios",
    title: "DC Studios | Premium Photography Studio",
    description: "Specializing in Newborn, Maternity, and Fashion photography. Capturing timeless memories with a touch of art.",
    images: [
      {
        url: "/dc-image.jpg",
        width: 1200,
        height: 630,
        alt: "DC Studios Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DC Studios | Premium Photography Studio",
    description: "Exclusively for Newborn, Maternity, and Fashion shoots in Tirupati.",
    images: ["/dc-image.jpg"],
  },
  alternates: {
    canonical: "/",
    title: "Dream Capture Studios | Premium Photography in Tirupati",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${fontVariables} font-display font-serif relative`}>
        <Preloader />
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <FloatingContact />
      </body>
    </html>
  );
}
