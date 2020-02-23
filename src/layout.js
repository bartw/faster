import React from "react";
import { Link } from "react-router-dom";
import Nav from "./nav";

const Layout = ({ loading, children }) => (
  <div className="p-4">
    <header>
      <Link to="/">
        <h1 className="text-5xl font-extrabold">faster</h1>
      </Link>
    </header>
    {!loading && (
      <>
        <Nav />
        <main>{children}</main>
      </>
    )}
  </div>
);

export default Layout;
