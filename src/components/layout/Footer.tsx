import { ReactNode } from "react";

type FooterProps = {
  children: ReactNode;
};

function Footer({ children }: FooterProps) {
  return <footer className="relative px-4 bg-background">{children}</footer>;
}

export default Footer;
