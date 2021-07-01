import React from "react";
import { NavLink } from "react-router-dom";

//Separate navbar for add and update restaurant pages with back link to the admin manage restaurant page.

const AddUpdateRestoNav = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-light bg-primary">
        <h3 className="compHeader">Zonions</h3>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item active">
              <NavLink className="nav-link" to="/manageResto">
                <div className="viewResto1">Back</div>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default AddUpdateRestoNav;
