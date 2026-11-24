"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { cn } from "@/lib/utils";

gsap.registerPlugin(SplitText);

type TextRollProps = {
  /** The visible label (must be a string) */
  children: string;
  /** Text shown after hover. If omitted, the same text rolls in (style it with `hoverClassName`) */
  hoverText?: string;
  className?: string;
  /** Classes applied to the second face, e.g. "text-accent" */
  hoverClassName?: string;
  /**
   * "roll": letters turn over like cube faces
   * "hop":  letters lift, swap at the top, then drop back into place
   */
  variant?: "roll" | "hop";
  /** Seconds each letter takes (one full turn for "roll", one full hop for "hop") */
  duration?: number;
  /** Seconds between letters (auto-compressed so long words land within 0.7s) */
  stagger?: number;
  /** "hop" only: how high letters lift, in em */
  lift?: number;
  /** "roll" only: shadow on the outgoing face, glint on the incoming one */
  shading?: boolean;
  /** Where the shorter text sits when the two texts differ in width */
  align?: "start" | "center" | "end";
  /**
   * "auto": hover area is the closest <a>, <button> or [data-roll-trigger] (falls back to itself)
   * "self": only hovering the text itself triggers it
   */
  trigger?: "auto" | "self";
};

const ROT = 90;
const MAX_TOTAL = 0.7;

/* ---------- shared pointer-speed tracker (one listener for all instances) ---------- */
const tracker = { x: 0, y: 0, t: 0, v: 0 };
let trackerUsers = 0;

function onPointerMove(e: PointerEvent) {
  const now = performance.now();
  if (tracker.t) {
    const dt = Math.max(now - tracker.t, 1);
    const speed = Math.hypot(e.clientX - tracker.x, e.clientY - tracker.y) / dt;
    tracker.v += (speed - tracker.v) * 0.35;
  }
  tracker.x = e.clientX;
  tracker.y = e.clientY;
  tracker.t = now;
}

function startTracking() {
  if (trackerUsers++ === 0) {
    window.addEventListener("pointermove", onPointerMove, { passive: true });
  }
}

function stopTracking() {
  if (--trackerUsers === 0) {
    window.removeEventListener("pointermove", onPointerMove);
    tracker.t = 0;
    tracker.v = 0;
  }
}

/** 0 = slow/gentle hover, 1 = fast flick */
function pointerSpeed01() {
  if (!tracker.t || performance.now() - tracker.t > 100) return 0;
  return gsap.utils.clamp(0, 1, (tracker.v - 0.4) / 2);
}

export default function TextRoll({
  children,
  hoverText,
  className,
  hoverClassName,
  variant = "roll",
  duration = 0.34,
  stagger = 0.024,
  lift = 0.3,
  shading = true,
  align = "center",
  trigger = "auto",
}: TextRollProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const frontRef = useRef<HTMLSpanElement>(null);
  const backRef = useRef<HTMLSpanElement>(null);

  const backText = hoverText ?? children;

  useEffect(() => {
    const root = rootRef.current;
    const front = frontRef.current;
    const back = backRef.current;
    if (!root || !front || !back) return;

    const isHop = variant === "hop";

    const target: HTMLElement =
      trigger === "self"
        ? root
        : (root.closest<HTMLElement>("a, button, [data-roll-trigger]") ?? root);

    const sideOf = (clientX: number): "start" | "end" => {
      const r = root.getBoundingClientRect();
      return clientX < r.left + r.width / 2 ? "start" : "end";
    };

    const mm = gsap.matchMedia();

    mm.add(
      {
        reduce: "(prefers-reduced-motion: reduce)",
        normal: "(prefers-reduced-motion: no-preference)",
      },
      (ctx) => {
        const { reduce } = ctx.conditions as { reduce: boolean };

        /* ---------------- reduced motion: simple crossfade ---------------- */
        if (reduce) {
          gsap.set(back, { opacity: 0 });
          const fade = (toBack: boolean) => {
            gsap.to(front, { opacity: toBack ? 0 : 1, duration: 0.15 });
            gsap.to(back, { opacity: toBack ? 1 : 0, duration: 0.15 });
          };
          const enter = (e: PointerEvent) => {
            if (e.pointerType !== "touch") fade(true);
          };
          const leave = (e: PointerEvent) => {
            if (e.pointerType !== "touch") fade(false);
          };
          const focusIn = () => {
            if (target.matches(":focus-visible")) fade(true);
          };
          const focusOut = () => fade(false);

          target.addEventListener("pointerenter", enter);
          target.addEventListener("pointerleave", leave);
          target.addEventListener("focusin", focusIn);
          target.addEventListener("focusout", focusOut);

          return () => {
            target.removeEventListener("pointerenter", enter);
            target.removeEventListener("pointerleave", leave);
            target.removeEventListener("focusin", focusIn);
            target.removeEventListener("focusout", focusOut);
            gsap.set([front, back], { clearProps: "opacity" });
          };
        }

        /* ---------------- shared state ---------------- */
        let frontChars: HTMLElement[] = [];
        let backChars: HTMLElement[] = [];
        let frontWords: HTMLElement[] = [];
        let backWords: HTMLElement[] = [];
        let tl: gsap.core.Timeline | null = null;
        let rolled = false;

        const fontSize = () =>
          parseFloat(getComputedStyle(root).fontSize) || 16;

        const metrics = () => {
          const fs = fontSize();
          return {
            origin: `50% 50% ${-fs * 0.5}px`,
            perspective: Math.max(500, fs * 12),
          };
        };

        /** Resting pose for the current state */
        const prepare = () => {
          if (!frontChars.length || !backChars.length) return;

          gsap.set([...frontWords, ...backWords], { display: "inline-block" });

          if (isHop) {
            gsap.set([...frontChars, ...backChars], {
              display: "inline-block",
              y: 0,
              scaleY: 1,
              transformOrigin: "50% 100%",
            });
            gsap.set(frontChars, { visibility: rolled ? "hidden" : "visible" });
            gsap.set(backChars, { visibility: rolled ? "visible" : "hidden" });
            return;
          }

          const { origin, perspective } = metrics();
          gsap.set([...frontChars, ...backChars], {
            display: "inline-block",
            backfaceVisibility: "hidden",
            transformPerspective: perspective,
            transformOrigin: origin,
          });
          gsap.set(frontChars, {
            rotationX: rolled ? ROT : 0,
            visibility: rolled ? "hidden" : "visible",
            ...(shading && {
              filter: rolled ? "brightness(0.35)" : "brightness(1)",
            }),
          });
          gsap.set(backChars, {
            rotationX: rolled ? 0 : -ROT,
            visibility: rolled ? "visible" : "hidden",
            ...(shading && {
              filter: rolled ? "brightness(1)" : "brightness(0.35)",
            }),
          });
        };

        const splitOptions = {
          type: "words,chars",
          autoSplit: true, // re-splits automatically when fonts finish loading
          aria: "none" as const,
        };

        const splitFront = SplitText.create(front, {
          ...splitOptions,
          onSplit: (self) => {
            frontChars = self.chars as HTMLElement[];
            frontWords = self.words as HTMLElement[];
            prepare();
          },
        });
        const splitBack = SplitText.create(back, {
          ...splitOptions,
          onSplit: (self) => {
            backChars = self.chars as HTMLElement[];
            backWords = self.words as HTMLElement[];
            prepare();
          },
        });

        /** Per-letter delay, shared by both faces so they stay in sync */
        const timing = (from: "start" | "end") => {
          const maxN = Math.max(frontChars.length, backChars.length);
          const each =
            maxN > 1
              ? Math.min(
                  stagger,
                  Math.max(0, (MAX_TOTAL - duration) / (maxN - 1)),
                )
              : 0;
          return {
            maxN,
            delay: (i: number) => (from === "start" ? i : maxN - 1 - i) * each,
          };
        };

        /* ---------------- variant: roll ---------------- */
        const roll = (
          toBack: boolean,
          from: "start" | "end",
          gentle: boolean,
        ) => {
          tl?.kill();
          rolled = toBack;

          const { origin, perspective } = metrics();
          gsap.set([...frontChars, ...backChars], {
            visibility: "visible",
            transformOrigin: origin,
            transformPerspective: perspective,
          });

          const k = gentle ? 0 : pointerSpeed01() * 4.5;
          const ease = k < 0.3 ? "power3.out" : `back.out(${k.toFixed(2)})`;
          const { delay } = timing(from);
          const common = { duration, ease, delay };

          tl = gsap.timeline({
            onComplete: () => {
              gsap.set(toBack ? frontChars : backChars, {
                visibility: "hidden",
              });
            },
          });

          tl.to(
            frontChars,
            {
              rotationX: toBack ? ROT : 0,
              ...(shading && {
                filter: toBack ? "brightness(0.35)" : "brightness(1)",
              }),
              ...common,
            },
            0,
          ).to(
            backChars,
            {
              rotationX: toBack ? 0 : -ROT,
              ...(shading && {
                filter: toBack ? "brightness(1)" : "brightness(0.35)",
              }),
              ...common,
            },
            0,
          );
        };

        /* ---------------- variant: hop ---------------- */
        const hop = (
          toBack: boolean,
          from: "start" | "end",
          gentle: boolean,
        ) => {
          tl?.kill();
          rolled = toBack;

          // Faster pointer = higher lift
          const rise =
            fontSize() * lift * (1 + (gentle ? 0 : pointerSpeed01()) * 0.8);
          const up = duration * 0.45;
          const down = duration * 0.55;
          const { maxN, delay } = timing(from);

          const isVisible = (el?: HTMLElement) =>
            !!el && gsap.getProperty(el, "visibility") !== "hidden";

          tl = gsap.timeline();

          for (let i = 0; i < maxN; i++) {
            const a = frontChars[i];
            const b = backChars[i];
            const incoming = toBack ? b : a;
            const outgoing = toBack ? a : b;
            const t0 = delay(i);

            const inVisible = isVisible(incoming);
            const outVisible = isVisible(outgoing);

            // Already showing the right letter (e.g. interrupted mid-hop): just land it
            if (incoming && inVisible && !outVisible) {
              tl.to(
                incoming,
                { y: 0, scaleY: 1, duration: down, ease: "power2.in" },
                t0,
              );
              continue;
            }

            // Old letter goes up a little and disappears at the crest
            if (outgoing && outVisible) {
              tl.to(
                outgoing,
                { y: -rise, scaleY: 1.1, duration: up, ease: "power2.out" },
                t0,
              ).set(
                outgoing,
                { visibility: "hidden", y: 0, scaleY: 1 },
                t0 + up,
              );
            }

            // New letter appears at the crest, then drops into its place
            if (incoming) {
              tl.set(
                incoming,
                { visibility: "visible", y: -rise, scaleY: 1.1 },
                t0 + up,
              ).to(
                incoming,
                { y: 0, scaleY: 1, duration: down, ease: "power2.in" },
                t0 + up,
              );
            }
          }
        };

        /* ---------------- events ---------------- */
        const go = (toBack: boolean, from: "start" | "end", gentle = false) => {
          if (!frontChars.length || !backChars.length) return;
          if (toBack === rolled && !tl?.isActive()) return;
          (isHop ? hop : roll)(toBack, from, gentle);
        };

        const onEnter = (e: PointerEvent) => {
          if (e.pointerType === "touch") return;
          go(true, sideOf(e.clientX));
        };
        const onLeave = (e: PointerEvent) => {
          if (e.pointerType === "touch") return;
          go(false, sideOf(e.clientX));
        };
        const onFocusIn = () => {
          if (target.matches(":focus-visible")) go(true, "start", true);
        };
        const onFocusOut = () => go(false, "start", true);

        startTracking();
        target.addEventListener("pointerenter", onEnter);
        target.addEventListener("pointerleave", onLeave);
        target.addEventListener("focusin", onFocusIn);
        target.addEventListener("focusout", onFocusOut);

        return () => {
          stopTracking();
          target.removeEventListener("pointerenter", onEnter);
          target.removeEventListener("pointerleave", onLeave);
          target.removeEventListener("focusin", onFocusIn);
          target.removeEventListener("focusout", onFocusOut);
          tl?.kill();
          splitFront.revert();
          splitBack.revert();
        };
      },
    );

    return () => mm.revert();
  }, [children, backText, variant, duration, stagger, lift, shading, trigger]);

  const faceStyle = {
    gridArea: "1 / 1",
    whiteSpace: "nowrap",
    fontKerning: "none",
    fontVariantLigatures: "none",
    justifySelf: align,
  } as const;

  return (
    <span ref={rootRef} className={cn("inline-grid align-top", className)}>
      {/* Read once by screen readers */}
      <span className="sr-only">{children}</span>

      {/* key = text, so React re-creates the node instead of patching a split DOM */}
      <span
        key={`front-${children}`}
        ref={frontRef}
        aria-hidden="true"
        style={faceStyle}
      >
        {children}
      </span>

      <span
        key={`back-${backText}`}
        ref={backRef}
        aria-hidden="true"
        className={hoverClassName}
        style={faceStyle}
      >
        {backText}
      </span>
    </span>
  );
}
