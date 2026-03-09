import { useAuth } from "../context/AuthContext";
import type { NavProps } from "../types/Nav";
import NavBar from "./NavBar";
import User from "./User";

const SideBar: React.FC<NavProps> = ({ showMenu, closeMenu, isDesktop }) => {
  const { token, logoutUser } = useAuth();

  return (
    <nav className={`sidebar ${showMenu ? "opened" : ""}`}>
      {isDesktop && <User />}
      <NavBar showMenu={showMenu} closeMenu={closeMenu} isDesktop={isDesktop} />
      {token && (
        <button onClick={logoutUser} className="logout-btn btn">
          Logout
        </button>
      )}
    </nav>
  );
};

export default SideBar;
