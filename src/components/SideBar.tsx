import { NavLink } from "react-router-dom";
import type { NavProps, NavType } from "../types/Nav";
import { faHome } from "@fortawesome/free-regular-svg-icons";
import {
  faCheck,
  faExclamation,
  faListCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SideBar: React.FC<NavProps> = ({ showMenu, closeMenu }) => {
  const navList: NavType[] = [
    { id: 1, name: "All Task", path: "/", icon: faHome },
    { id: 2, name: "Completed", path: "/completed", icon: faCheck },
    { id: 3, name: "Important", path: "/important", icon: faListCheck },
    { id: 4, name: "Due Now", path: "/due", icon: faExclamation },
  ];

  return (
    <nav className={`nav sidebar ${showMenu ? "opened" : ""}`}>
      <ul className="nav sidebar-ul">
        {navList.map((item) => (
          <li className="nav-li sidebar-li" key={item.id}>
            <NavLink
              to={item.path}
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <FontAwesomeIcon className="" icon={item.icon} />
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideBar;
