import React from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

//navbar for manage Restaurant page

const ManageRestoNavbar = () => {
  let history = useHistory();

  //remove response which get after login from local storage
  const logoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("admin");
    history.push("/");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-light bg-primary">
        <h3 className="compHeader">Zonions</h3>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/resto/add">
                <div className="addResto">Add Restaurant</div>
              </NavLink>
            </li>
            <li>
              <button className="logout-btn" onClick={(e) => logoutHandler(e)}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default ManageRestoNavbar;
