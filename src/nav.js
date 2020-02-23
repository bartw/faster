import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FirebaseContext } from "./firebase";

const Nav = () => {
  const firebase = useContext(FirebaseContext);
  
  return (
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
};

export default Nav;
