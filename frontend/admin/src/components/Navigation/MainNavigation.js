import React from "react";
import { NavLink } from "react-router-dom";

import AuthContext from "../../context/auth-context";

function MainNavigation(props) {
  return (
    <AuthContext.Consumer>
      {(context) => {
        return (
          <nav className="h-screen flex flex-col w-1/4 p-4 bg-gray-200 shadow-lg justify-between">
            <div className="navigation-start">
              <div className="logo font-bold text-2xl">Yolo</div>

              <ul>
                <li>
                  {context.isLogged && <NavLink to="/posts">Posts</NavLink>}
                </li>
                <li>
                  <NavLink to="/comments">Comments</NavLink>
                </li>
              </ul>
            </div>
            <div className="navigation-end">
              <ul>
                {context.isLogged() && <li onClick={context.logout}>logout</li>}
              </ul>
            </div>
          </nav>
        );
      }}
    </AuthContext.Consumer>
  );
}

export default MainNavigation;
