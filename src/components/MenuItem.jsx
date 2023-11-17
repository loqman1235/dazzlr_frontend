import { NavLink } from "react-router-dom";

const MenuItem = ({ title, to, Icon }) => {
  return (
    <li className="w-full flex items-center justify-center md:block">
      <NavLink
        to={to}
        className={(navData) =>
          navData.isActive ? "menu-link active" : "menu-link"
        }
      >
        <span>{Icon && <Icon size={24} className="w-6 h-6 stroke-2" />}</span>
        <span className="hidden md:block font-semibold">{title}</span>
      </NavLink>
    </li>
  );
};

export default MenuItem;
