import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "./firebase";
import LogOutButton from "./log-out-button";

const NavItem = ({ children }) => (
  <li className="inline-block mr-4" style={{ fontVariant: "small-caps" }}>
    {children}
  </li>
);

const Nav = () => {
  const user = useUser();

  return (
    <nav className="my-4">
      <ul>
        <NavItem>
          <Link to="/">Home</Link>
        </NavItem>
        {!!user && (
          <>
            <NavItem>
              <Link to="/scale">Scale</Link>
            </NavItem>
            <NavItem>
              <LogOutButton />
            </NavItem>
          </>
        )}
        {!user && (
          <>
            <NavItem>
              <Link to="/sign-up">Sign up</Link>
            </NavItem>
            <NavItem>
              <Link to="/log-in">Log in</Link>
            </NavItem>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
