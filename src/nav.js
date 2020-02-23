import React from "react";
import { Link } from "react-router-dom";

const Nav = () => (
  <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/scale">Scale</Link>
      </li>
      <li>
        <Link to="/sign-up">Sign up</Link>
      </li>
      <li>
        <Link to="/log-in">Log in</Link>
      </li>
    </ul>
  </nav>
);

export default Nav;
