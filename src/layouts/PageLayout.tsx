import { Outlet } from "react-router-dom";
import { useState } from "react";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import { useScreenSize } from "../hooks/useScreenSize";

const PageLayout: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { isDesktop } = useScreenSize();

  const handleMenuToggle = (): void => setShowMenu((prev) => !prev);

  return (
    <div className="wrapper max-h-screen w-screen flex-1 m-auto">
      {!isDesktop && <Header handleMenuToggle={handleMenuToggle} />}
      <SideBar showMenu={showMenu} closeMenu={() => setShowMenu(false)} />

      <main className="main">
        <Outlet />
      </main>
    </div>
  );
};

export default PageLayout;
