import { useAuth0 } from "@auth0/auth0-react";
// import { useAuth } from "../context/auth-context";
import type { NavProps } from "../types/Nav";
import NavBar from "./NavBar";
import User from "./User";

const SideBar: React.FC<NavProps> = ({ showMenu, closeMenu, isDesktop }) => {
  // const { isAuthenticated, logoutUser } = useAuth();
  const { logout } = useAuth0();

  return (
    <nav className={`sidebar ${showMenu ? "opened" : ""}`}>
      {isDesktop && <User />}
      <NavBar showMenu={showMenu} closeMenu={closeMenu} isDesktop={isDesktop} />
      {/* {isAuthenticated && (
        <button onClick={logoutUser} className="logout-btn btn">
          Logout
        </button>

      )} */}

      <button
        onClick={() =>
          logout({
            logoutParams: { returnTo: import.meta.env.VITE_AUTH0_CALLBACK_URL },
          })
        }
        className="logout-btn btn"
      >
        Log Out
      </button>
    </nav>
  );
};

export default SideBar;
