"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import MenuNavigation from "./MenuNavigation";
import Link from "next/link";

type FullscreenMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function FullscreenMenu({
  isOpen,
  onClose,
}: FullscreenMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const bottomDataRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const menu = menuRef.current;
      if (!menu) return;

      const items = menu.querySelectorAll("[data-menu-item]");
      const bottomData = bottomDataRef.current;
      const bottomItems = bottomData?.querySelectorAll(
        "[data-menu-bottom-item]",
      );

      const timeline = gsap.timeline({ paused: true });

      timeline
        .fromTo(
          menu,
          {
            clipPath: "inset(0 0 100% 0)",
            autoAlpha: 1,
          },
          {
            clipPath: "inset(0 0 0% 0)",
            autoAlpha: 1,
            duration: 0.8,
            ease: "power4.inOut",
          },
        )
        .fromTo(
          items,
          {
            y: 40,
            autoAlpha: 0,
          },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.25",
        );

      if (bottomItems?.length) {
        timeline.fromTo(
          bottomItems,
          {
            y: 20,
            autoAlpha: 0,
          },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.6,
            stagger: 0.12,
            ease: "power3.out",
          },
          "-=0.1",
        );
      }

      timelineRef.current = timeline;

      return () => {
        timeline.kill();
        timelineRef.current = null;
      };
    },
    { scope: menuRef },
  );

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    if (isOpen) {
      timeline.timeScale(0.8).play();
    } else {
      timeline.timeScale(1.3).reverse(); // close 30% faster
    }
  }, [isOpen]);

  return (
    <div
      ref={menuRef}
      id="fullscreen-menu"
      aria-hidden={!isOpen}
      className="invisible fixed inset-0 z-90 flex flex-col justify-center min-h-dvh px-10 pb-2 pt-28 bg-[#111010] overflow-y-auto"
      style={{ pointerEvents: isOpen ? "auto" : "none" }}
    >
      <div className="flex flex-col justify-between gap-16 w-full max-w-7xl h-full mx-auto">
        <MenuNavigation onNavigate={onClose} />

        <div
          ref={bottomDataRef}
          className="flex justify-between items-center flex-wrap gap-4 py-4 border-t border-border"
        >
          <p
            data-menu-bottom-item
            className="uppercase text-xs text-muted  tracking-wider"
          >
            Cairo, Egypt
          </p>

          <div
            data-menu-bottom-item
            className="flex gap-5 uppercase text-xs text-muted tracking-wider"
          >
            <Link
              href="https://github.com/aehamdy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              GitHub ↗
            </Link>

            <Link
              href="https://linkedin.com/in/aehamdy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              LinkedIn ↗
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
