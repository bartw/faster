import React from "react";
import Nav from "./nav";

const Layout = ({ children }) => (
  <div>
    <header>
      <h1>faster</h1>
    </header>
    <Nav />
    <main>{children}</main>
  </div>
);

export default Layout;
