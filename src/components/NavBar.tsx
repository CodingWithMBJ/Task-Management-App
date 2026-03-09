import { NavLink } from "react-router-dom";
import type { NavProps, NavType } from "../types/Nav";
import { faHome } from "@fortawesome/free-regular-svg-icons";
import {
  faCheck,
  faExclamation,
  faListCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavBar: React.FC<NavProps> = ({ closeMenu }) => {
  const navList: NavType[] = [
    { id: 1, name: "All Task", path: "/", icon: faHome },
    { id: 2, name: "Completed", path: "/completed", icon: faCheck },
    { id: 3, name: "Important", path: "/important", icon: faListCheck },
    { id: 4, name: "Due Now", path: "/due", icon: faExclamation },
  ];

  return (
    <nav className={`nav`}>
      <ul className="nav-ul">
        {navList.map((item) => (
          <li className="nav-li" key={item.id}>
            <NavLink
              to={item.path}
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
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

export default NavBar;
