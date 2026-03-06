import type React from "react";
import MenuBtn from "./MenuBtn";
import type { MenuBtnProps } from "../types/Menu";
import { useTheme } from "../hooks/useTheme"; // adjust path if needed

const Header: React.FC<MenuBtnProps> = ({ handleMenuToggle }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="header">
      <MenuBtn handleMenuToggle={handleMenuToggle} />

      <div className="profile">p</div>

      <div className="header-actions">
        <button
          type="button"
          className="theme-btn"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title={isDark ? "Switch to light theme" : "Switch to dark theme"}
        >
          {isDark ? "🌙" : "☀️"}
        </button>
      </div>
    </header>
  );
};

export default Header;
