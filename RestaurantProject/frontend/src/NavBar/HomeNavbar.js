import React from "react";
import { NavLink } from "react-router-dom";

//navbar for home page

const HomeNavbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-light bg-primary">
        
        <h2 className="LogoImg"></h2>
        <h3 className="compHeader">Zonions</h3>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item active"></li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                <div className="loginDes">Login</div>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default HomeNavbar;
