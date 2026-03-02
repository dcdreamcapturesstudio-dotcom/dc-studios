import { Instrument_Serif, Funnel_Display, Antic_Didone } from "next/font/google";
import localFont from "next/font/local";

// Google Fonts - All fonts loaded from Google Fonts
export const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const funnelDisplay = Funnel_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const sedgwickAveDisplay = localFont({
  src: "../public/waltograph42.otf",
  variable: "--font-sedgwick",
});

export const anticDidone = Antic_Didone({
  variable: "--font-antic",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
});

// Export all font variables for easy use
export const fontVariables = `${instrumentSerif.variable} ${funnelDisplay.variable} ${sedgwickAveDisplay.variable} ${anticDidone.variable}`;