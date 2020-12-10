import React from "react";
import MainNavigation from "../Navigation/MainNavigation";

function Layout({ children }) {
  return (
    <div className="h-screen flex">
      <MainNavigation />
      <main className="w-full p-4 bg-gray-100">{children}</main>
    </div>
  );
}

export default Layout;
