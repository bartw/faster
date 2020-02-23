import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "./firebase";
import LogOutButton from "./log-out-button";

const Nav = () => {
  const user = useUser();

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {!!user && (
          <>
            <li>
              <Link to="/scale">Scale</Link>
            </li>
            <li>
              <LogOutButton />
            </li>
          </>
        )}
        {!user && (
          <>
            <li>
              <Link to="/sign-up">Sign up</Link>
            </li>
            <li>
              <Link to="/log-in">Log in</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
