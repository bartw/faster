import React from "react";
import Nav from "./nav";

const Layout = ({ loading, children }) => (
  <div className="p-4">
    <header>
      <h1 className="text-5xl font-extrabold">faster</h1>
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
