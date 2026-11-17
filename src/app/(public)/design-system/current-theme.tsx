"use client";

import { useEffect, useState } from "react";

export function CurrentTheme() {
  const [theme, setTheme] = useState("white");

  useEffect(() => {
    const root = document.documentElement;

    const updateTheme = () => {
      setTheme(root.dataset.theme ?? "white");
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);

    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return <>{theme}</>;
}
