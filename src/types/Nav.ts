import type { IconDefinition } from "@fortawesome/free-regular-svg-icons";

export interface NavProps {
  showMenu: boolean;
  closeMenu: () => void;
}

export type NavType = {
  id: number;
  name: string;
  path: string;
  icon: IconDefinition;
};
