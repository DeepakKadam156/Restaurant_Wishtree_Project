import React from "react";
import { useHistory } from "react-router-dom";

//navbar for view page

const ViewNavbar = () => {
  const history = useHistory();

  //routing based on conditions
  const backHandler = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("admin");
    if (token == null) {
      history.push("/");
    } else {
      history.push("/manageResto");
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-light bg-primary">
        <h3 className="compHeader">Zonions</h3>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item active">
              <button
                className="viewResto"
                onClick={(e) => {
                  backHandler(e);
                }}
              >
                back
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default ViewNavbar;
