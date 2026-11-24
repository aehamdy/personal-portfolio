import TextRoll from "@/components/animations/TextRoll";

type MenuButtonProps = {
  isOpen: boolean;
  onClick: () => void;
};

export default function MenuButton({ isOpen, onClick }: MenuButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      aria-expanded={isOpen}
      aria-controls="fullscreen-menu"
      className="group flex items-center gap-3 hover:text-accent cursor-pointer"
    >
      <span className="relative flex h-4 w-6 flex-col justify-center gap-1.5">
        <span
          className={`h-px w-full bg-foreground group-hover:bg-accent transition-transform duration-300 ${
            isOpen && "translate-y-[3.5px] rotate-45"
          }`}
        />

        <span
          className={`h-px w-full bg-foreground group-hover:bg-accent transition-transform duration-300 ${
            isOpen && "translate-y-[-3.5px] -rotate-45"
          }`}
        />
      </span>

      <span className="min-w-12 text-xs font-medium uppercase tracking-wider">
        <TextRoll
          hoverText={isOpen ? "Close" : "Menu"}
          // hoverClassName="text-accent"
        >
          {isOpen ? "Close" : "Menu"}
        </TextRoll>
      </span>
    </button>
  );
}
