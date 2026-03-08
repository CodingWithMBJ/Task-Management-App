import type React from "react";
import MenuBtn from "./MenuBtn";
import type { MenuBtnProps } from "../types/Menu";
import { useTheme } from "../hooks/useTheme";

const Header: React.FC<MenuBtnProps> = ({ handleMenuToggle }) => {
  const { isDark, toggleTheme } = useTheme();

  const iconName = isDark ? "moon-outline" : "sunny-outline";
  const title = isDark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <header className="header">
      <MenuBtn handleMenuToggle={handleMenuToggle} />

      <div className="profile">P</div>

      <div className="header-actions">
        <button
          type="button"
          className="theme-btn"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title={title}
        >
          <ion-icon name={iconName}></ion-icon>
        </button>
      </div>
    </header>
  );
};

export default Header;
