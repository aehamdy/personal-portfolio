"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

type FooterRevealProps = {
  children: ReactNode;
  footer: ReactNode;
};

export default function FooterReveal({ children, footer }: FooterRevealProps) {
  const footerRef = useRef<HTMLDivElement>(null);
  const [footerHeight, setFooterHeight] = useState(0);

  useLayoutEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const update = () =>
      setFooterHeight(Math.ceil(el.getBoundingClientRect().height));

    update();

    const observer = new ResizeObserver(update);
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* No z-index / background here: it must NOT create a stacking context,
          otherwise the fixed hero would be trapped above the footer. */}
      <div>{children}</div>

      {/* In-flow box that is exactly the footer's height. clip-path clips the
          fixed footer to this box, so it is only visible once the content
          above has scrolled away. */}
      <div
        className="scroll relative z-10"
        style={{ height: footerHeight, clipPath: "inset(0)" }}
      >
        <div ref={footerRef} className="fixed inset-x-0 bottom-0">
          {footer}
        </div>
      </div>
    </>
  );
}
