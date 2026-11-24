import { navItems } from "@/config/navItems";
import TransitionLink from "../ui/TransitionLink";
import TextRoll from "../animations/TextRoll";

function Nav() {
  return (
    <nav className="flex items-center gap-4">
      {navItems.map((item) => (
        <li key={item.id}>
          <TransitionLink
            href={item.to}
            className="font-body uppercase font-medium text-sm lg:text-[1vw]"
          >
            <TextRoll hoverClassName="text-accent">{item.label}</TextRoll>
          </TransitionLink>
        </li>
      ))}
    </nav>
  );
}

export default Nav;
