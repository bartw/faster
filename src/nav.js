import React from "react";
import { NavLink } from "react-router-dom";
import { useUser } from "./firebase";
import LogOutButton from "./log-out-button";

const NavItem = ({ children }) => (
  <li className="inline-block mr-4" style={{ fontVariant: "small-caps" }}>
    {children}
  </li>
);

const NavItemLink = ({ to, label }) => (
  <NavItem>
    <NavLink exact to={to} activeClassName="border-b-4 border-green-600">
      {label}
    </NavLink>
  </NavItem>
);

const Nav = () => {
  const user = useUser();

  return (
    <nav className="my-4 md:inline-block md:ml-8">
      <ul>
        <NavItemLink to="/" label="Home" />
        {!!user && <NavItemLink to="/scale" label="Scale" />}
        {!!user && (
          <NavItem>
            <LogOutButton />
          </NavItem>
        )}
        {!user && <NavItemLink to="/sign-up" label="Sign up" />}
        {!user && <NavItemLink to="/log-in" label="Log in" />}
      </ul>
    </nav>
  );
};

export default Nav;
