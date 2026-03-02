import "./globals.css";
import { fontVariables } from "./fonts";
import SmoothScroll from "../components/SmoothScroll";
import Preloader from "../components/Preloader";

export const metadata = {
  title: "DC Studios | Dream Capture Studio",
  description: "A premier photography studio specializing in newborn, maternity, toddlers, and conceptual fashion.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${fontVariables} font-display font-serif relative`}>
        <Preloader />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
