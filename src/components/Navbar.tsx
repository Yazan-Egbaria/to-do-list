import { Link, NavLink } from "react-router";

const Navbar = () => {
  return (
    <div className="flex w-full items-center justify-between px-8 py-4 shadow-md">
      <Link to="/">
        <img className="w-48" src="logo.png" alt="To-Do-List Logo" />
      </Link>

      <li className="list-none text-lg">
        <NavLink
          className={({ isActive }) => {
            return isActive ? "font-bold" : "";
          }}
          to="/"
        >
          Home
        </NavLink>
      </li>
    </div>
  );
};

export default Navbar;
