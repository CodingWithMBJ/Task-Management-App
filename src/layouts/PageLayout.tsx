import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import { useState } from "react";
import Header from "../components/Header";

const PageLayout: React.FC = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const handleMenuToggle = (): void => {
    setShowMenu((prev) => !prev);
  };

  return (
    <div className="wrapper max-h-screen w-screen flex-1 m-auto">
      <Header handleMenuToggle={handleMenuToggle} />
      <SideBar showMenu={showMenu} closeMenu={() => setShowMenu(false)} />
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
};

export default PageLayout;
