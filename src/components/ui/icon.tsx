import {
  MdArrowBack,
  MdArrowForward,
  MdClose,
  MdCropFree,
  MdMenu,
  MdMinimize,
} from "react-icons/md";

const icons = {
  "arrow-back": MdArrowBack,
  "arrow-forward": MdArrowForward,
  menu: MdMenu,
  close: MdClose,
  crop: MdCropFree,
  minimize: MdMinimize,
} as const;

type IconName = keyof typeof icons;
type IconSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl";

type IconProps = {
  name: IconName;
  size?: IconSize;
  className?: string;
};

const sizeStyles: Record<IconSize, string> = {
  xs: "size-3",
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
  xl: "size-8",
  "2xl": "size-10",
  "3xl": "size-12",
  "4xl": "size-14",
  "5xl": "size-16",
};

export function Icon({ name, size = "md", className }: IconProps) {
  const IconComponent = icons[name];

  return (
    <span
      aria-hidden="true"
      className={[
        "inline-flex shrink-0 items-center justify-center",
        sizeStyles[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <IconComponent className="size-full" />
    </span>
  );
}
