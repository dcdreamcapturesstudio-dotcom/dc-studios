import { Instrument_Serif, Funnel_Display, Sedgwick_Ave_Display } from "next/font/google";

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


export const sedgwickAveDisplay = Sedgwick_Ave_Display({
  variable: "--font-sedgwick",
  subsets: ["latin"],
  weight: ["400"],
});

// Export all font variables for easy use
export const fontVariables = `${instrumentSerif.variable} ${funnelDisplay.variable} ${sedgwickAveDisplay.variable}`;