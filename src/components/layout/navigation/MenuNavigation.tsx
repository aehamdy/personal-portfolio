import { navItems } from "@/config/navItems";
import { usePathname } from "next/navigation";
import TransitionLink from "@/components/ui/TransitionLink";
import TextRoll from "@/components/animations/TextRoll";

type MenuNavigationProps = {
  onNavigate: () => void;
};

export default function MenuNavigation({ onNavigate }: MenuNavigationProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation">
      <ul className="flex flex-col gap-4 lg:gap-3 h-full">
        {navItems.map((item, index) => {
          const isActive = pathname === item.to;

          return (
            <TransitionLink
              key={item.id}
              href={item.to}
              onClick={onNavigate}
              className="group flex items-baseline gap-5 py-2"
            >
              <span className="text-xs text-muted">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span
                className={`font-display font-bold uppercase text-8xl text-[#edeae4] leading-none transition-all duration-normal ${
                  isActive
                    ? "font-normal text-accent tracking-widest"
                    : "group-hover:text-accent tracking-wider"
                }`}
              >
                <TextRoll duration={0.5} hoverClassName="text-accent">
                  {item.label}
                </TextRoll>
              </span>
            </TransitionLink>
          );
        })}
      </ul>
    </nav>
  );
}
