import React, { useState } from "react";
import PersonIcon from "@material-ui/icons/Person";
import LockIcon from "@material-ui/icons/Lock";
import axios from "axios";
import LoginNavbar from "../NavBar/LoginNavbar";
import { useHistory } from "react-router-dom";

const LoginPage = () => {
  let history = useHistory();
  const [admin, setAdmin] = useState({
    email: "",
    password: "",
  });

  const { email, password } = admin;

  const changeHandler = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
    e.preventDefault();
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    //login Authentication

    axios
      .post(`http://localhost:5000/admin/login`, admin)
      .then((resp) => {
        console.log(resp.data);
        if (resp.data) {
          localStorage.setItem("admin", JSON.stringify(resp.data));
          history.push("/manageResto");
        }
      })
      .catch((err) => {
        window.alert("Invalid credentials.");
      });
  };

  return (
    <>
      <LoginNavbar />
      <div className="container3">
        <div className="container1">
          <div className="header">
            <h1>Login</h1>
          </div>
          <div className="main">
            <form>
              <div>
                <i>
                  <PersonIcon />
                </i>
                <input
                  className="inputClass"
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={(e) => changeHandler(e)}
                />
              </div>
              <div>
                <i>
                  <LockIcon />
                </i>
                <input
                  className="inputClass"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={(e) => changeHandler(e)}
                />
              </div>

              <button onClick={(e) => submitHandler(e)}>Login</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
