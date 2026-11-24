"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import MenuButton from "./navigation/MenuButton";
import ROUTES from "@/config/routes";
import FullscreenMenu from "./navigation/FullscreenMenu";
import { ActionLink } from "../ui/ActionLink";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="fixed z-100 flex h-header w-full items-center justify-between bg-transparent px-8 backdrop-blur-xl">
        <ActionLink
          href={`${ROUTES.home}`}
          aria-label="Go to homepage"
          variant="none"
        >
          <Logo />
        </ActionLink>

        <MenuButton
          isOpen={isMenuOpen}
          onClick={() => setIsMenuOpen((previous) => !previous)}
        />
      </header>

      <FullscreenMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  );
}

export default Header;
