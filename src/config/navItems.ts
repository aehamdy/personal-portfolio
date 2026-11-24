import ROUTES from "./routes";

export type navItemT = {
  id: number;
  label: string;
  to: string;
};

export const navItems: navItemT[] = [
  { id: 1, label: "Home", to: ROUTES.home },
  { id: 2, label: "About", to: ROUTES.about },
  { id: 3, label: "Projects", to: ROUTES.projects },
  { id: 4, label: "Contact", to: ROUTES.contact },
];
