import type React from "react";
import MenuBtn from "./MenuBtn";
import type { MenuBtnProps } from "../types/Menu";

const Header: React.FC<MenuBtnProps> = ({ handleMenuToggle }) => {
  return (
    <header className="header">
      <MenuBtn handleMenuToggle={handleMenuToggle} />

      <div className="profile">p</div>

      <div className="signout">signout</div>
    </header>
  );
};

export default Header;
