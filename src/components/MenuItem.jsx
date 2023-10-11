import { NavLink } from "react-router-dom";

const MenuItem = ({ title, to, Icon }) => {
  return (
    <li className="w-full flex items-center justify-center md:block">
      <NavLink to={to} className="menu-link" activeClassName="active">
        <span>{Icon && <Icon size={24} />}</span>
        <span className="hidden md:block">{title}</span>
      </NavLink>
    </li>
  );
};

export default MenuItem;
