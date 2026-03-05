import type { MenuBtnProps } from "../types/Menu";

const MenuBtn: React.FC<MenuBtnProps> = ({ handleMenuToggle }) => {
  return (
    <button className="menu-btn" onClick={handleMenuToggle}>
      <span className="first"></span>
      <span className="second"></span>
    </button>
  );
};

export default MenuBtn;
