"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;

/** Use this anywhere (e.g. anchor links): getLenis()?.scrollTo("#contact") */
export const getLenis = () => lenisInstance;

export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    // Respect users who prefer reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.07, // lower = smoother/slower (0.05 – 0.15 is the useful range)
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      autoRaf: false, // GSAP's ticker drives it instead
    });
    lenisInstance = lenis;

    // Keep ScrollTrigger in sync with Lenis
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  // Reset scroll position on route change
  useEffect(() => {
    lenisInstance?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
