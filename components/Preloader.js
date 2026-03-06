"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Preloader() {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');
  
  // Set true initially so it renders instantly during hydration preventing the content flash
  const [isLoading, setIsLoading] = useState(!isAdminRoute);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (isAdminRoute) {
      setIsLoading(false);
      return;
    }

    // Force scroll to top on reload so the preloader animation always happens at the top
    window.scrollTo(0, 0);
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // We can rely on a specific custom event from the Hero/Content component to dismiss.
    // We add a fallback timer just in case an image fails to load or no event is emitted.
    let isMounted = true;
    let fallbackTimer;

    const handleHidePreloader = () => {
      if (isMounted) {
        setIsExiting(true);
        // Wait for the "Coverer" animation to complete before unmounting
        setTimeout(() => {
          setIsLoading(false);
          setIsInitialLoad(false);
        }, 1200); // Duration should match the coverer animation
      }
    };

    // Fallback if the component doesn't emit the event
    fallbackTimer = setTimeout(() => {
      handleHidePreloader();
    }, isInitialLoad ? 3000 : 800);

    // --- Navigation Interception ---
    // Listen for all clicks. If it's a link to a non-admin page, show the preloader.
    const handleLinkClick = (e) => {
      const link = e.target.closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      const target = link.getAttribute('target');

      // Skip criteria:
      // - External links (starts with http)
      // - Same-page anchors (starts with #)
      // - Admin links (starts with /admin)
      // - Special links (mailto, tel, etc.)
      // - Links opening in new tabs
      if (
        !href || 
        href.startsWith('http') || 
        href.startsWith('#') || 
        href.startsWith('mailto:') || 
        href.startsWith('tel:') ||
        href.startsWith('/admin') ||
        target === '_blank'
      ) {
        return;
      }

      // If we're already on that page, don't show preloader (unless it's a forced reload)
      if (href === window.location.pathname) return;

      // Show preloader immediately for the transition
      setIsExiting(false);
      setIsLoading(true);
    };

    window.addEventListener('click', handleLinkClick);

    return () => {
      isMounted = false;
      window.removeEventListener('heroImagesLoaded', handleHidePreloader);
      window.removeEventListener('click', handleLinkClick);
      clearTimeout(fallbackTimer);
    };
  }, [pathname, isAdminRoute, isInitialLoad]);

  if (isAdminRoute) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ 
            y: "-100%",
            transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-9999 flex items-center justify-center bg-white"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-center"
          >
            <h1 className="font-sedgwick text-4xl md:text-5xl lg:text-7xl capitalize preloader-shimmer">
              Dc Studios
            </h1>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
