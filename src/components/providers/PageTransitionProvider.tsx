"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { usePathname, useRouter } from "next/navigation";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { navItems } from "@/config/navItems";

gsap.registerPlugin(useGSAP);

type PageTransitionContextT = {
  navigate: (href: string, label?: string) => void;
};

type PageTransitionProviderProps = {
  children: ReactNode;
};

const PageTransitionContext = createContext<PageTransitionContextT | null>(
  null,
);

const STRIPE_COUNT = 6;
const STRIPE_DURATION = 0.65;
const STRIPE_STAGGER = 0.075;
const WIPE_TOTAL = STRIPE_DURATION + STRIPE_STAGGER * (STRIPE_COUNT - 1);

export function PageTransitionProvider({
  children,
}: PageTransitionProviderProps) {
  const router = useRouter();
  const pathname = usePathname();

  const containerRef = useRef<HTMLDivElement>(null);
  const stripesRef = useRef<HTMLDivElement[]>([]);

  const isTransitioningRef = useRef(false);
  const previousPathRef = useRef(pathname);

  const [isActive, setIsActive] = useState(false);

  // Every stripe has its own copy of the title and line
  const getTitles = () =>
    gsap.utils.toArray<HTMLElement>("[data-title]", containerRef.current);
  const getLines = () =>
    gsap.utils.toArray<HTMLElement>("[data-line]", containerRef.current);

  const resetState = useCallback(() => {
    gsap.set(stripesRef.current, { yPercent: 100 });
    gsap.set(
      gsap.utils.toArray<HTMLElement>("[data-title]", containerRef.current),
      { scale: 0.25, transformOrigin: "left bottom" },
    );
    gsap.set(
      gsap.utils.toArray<HTMLElement>("[data-line]", containerRef.current),
      { scaleX: 0, transformOrigin: "left center" },
    );
  }, []);

  useGSAP(
    () => {
      resetState();
    },
    { scope: containerRef },
  );

  const navigate = useCallback(
    (href: string, label?: string) => {
      if (isTransitioningRef.current) return;

      const destination = new URL(href, window.location.href);

      if (destination.origin !== window.location.origin) {
        window.location.assign(destination.href);
        return;
      }

      if (destination.pathname === window.location.pathname) return;

      const destinationLabel =
        label ??
        navItems.find((item) => item.to === destination.pathname)?.label ??
        destination.pathname.split("/").filter(Boolean).pop() ??
        "Home";

      isTransitioningRef.current = true;
      previousPathRef.current = pathname;
      setIsActive(true);

      getTitles().forEach((title) => {
        title.textContent = destinationLabel;
      });

      resetState();

      gsap
        .timeline()
        // Stripes rise from the bottom (the title rides inside them)
        .to(
          stripesRef.current,
          {
            yPercent: 0,
            duration: STRIPE_DURATION,
            stagger: STRIPE_STAGGER,
            ease: "power3.inOut",
          },
          0,
        )
        // Title starts small and grows while the stripes fill the screen
        .to(
          getTitles(),
          {
            scale: 1,
            duration: WIPE_TOTAL,
            ease: "power3.out",
          },
          0,
        )
        .to(
          getLines(),
          {
            scaleX: 1,
            duration: 0.55,
            ease: "power2.inOut",
          },
          0.3,
        )
        // Short hold so the name can be read, then change the route
        .call(
          () => {
            router.push(
              `${destination.pathname}${destination.search}${destination.hash}`,
            );
          },
          [],
          ">+0.1",
        );
    },
    [pathname, router, resetState],
  );

  useEffect(() => {
    if (!isTransitioningRef.current || pathname === previousPathRef.current) {
      return;
    }

    // Only the stripes move: the title is inside them, so it leaves with
    // them and can never be seen after the last stripe closes.
    const revealTimeline = gsap.timeline({
      onComplete: () => {
        resetState();
        isTransitioningRef.current = false;
        setIsActive(false);
      },
    });

    revealTimeline.to(stripesRef.current, {
      yPercent: -100,
      duration: STRIPE_DURATION,
      stagger: STRIPE_STAGGER,
      ease: "power3.inOut",
    });

    return () => {
      revealTimeline.kill();
    };
  }, [pathname, resetState]);

  return (
    <PageTransitionContext.Provider value={{ navigate }}>
      {children}

      <div
        ref={containerRef}
        aria-hidden="true"
        className={`fixed inset-0 z-9999 ${
          isActive
            ? "pointer-events-auto visible"
            : "pointer-events-none invisible"
        }`}
      >
        {Array.from({ length: STRIPE_COUNT }, (_, index) => (
          <div
            key={index}
            ref={(element) => {
              if (element) {
                stripesRef.current[index] = element;
              }
            }}
            className="absolute inset-y-0 overflow-hidden bg-accent"
            style={{
              left: `${(index / STRIPE_COUNT) * 100}%`,
              // +1px hides hairline seams between stripes
              width: `calc(${100 / STRIPE_COUNT}% + 1px)`,
            }}
          >
            {/* Full-viewport-wide layer, shifted so each stripe shows its own slice */}
            <div
              className="absolute inset-y-0"
              style={{
                width: `calc(${STRIPE_COUNT} * (100% - 1px))`,
                left: `calc(${-index} * (100% - 1px))`,
              }}
            >
              <div className="absolute inset-x-0 bottom-10 px-6 md:bottom-14 md:px-12">
                <p
                  data-title
                  className="font-display uppercase text-[35vw] md:text-[20vw] lg:text-[10vw] text-accent-contrast leading-none tracking-wide"
                />

                <div
                  data-line
                  className="mt-3 h-0.5 w-full bg-accent-contrast md:mt-4"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageTransitionContext.Provider>
  );
}

export function usePageTransition() {
  const context = useContext(PageTransitionContext);

  if (!context) {
    throw new Error(
      "usePageTransition must be used within PageTransitionProvider",
    );
  }

  return context;
}
