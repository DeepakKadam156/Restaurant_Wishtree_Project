import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import ManageRestoNavbar from "../NavBar/ManageRestoNavbar";
import { Link } from "react-router-dom";

//This the page where admin can perform edit,delete,add and view restaurant operations.

const ManageResto = () => {
  const [resto, setResto] = useState([]);
  const [name, setName] = useState("");
  useEffect(() => {
    let token = localStorage.getItem("admin");
    setName(JSON.parse(token).name);

    if (token == null) {
      history.push("/login");
      alert("Login First..");
    }

    console.log(name);
    loadResto();
  }, []);

  let history = useHistory();

  const loadResto = async () => {
    const resp = await axios.get(`http://localhost:5000/resto/allResto`);
    setResto(resp.data);
  };

  const addHandler = (e) => {
    e.preventDefault();
    history.push("/resto/add");
  };

  const deleteResto = async (id) => {
    await axios.delete(`http://localhost:5000/resto/${id}`);
    loadResto();
    window.alert("Restaurant deleted Sucessfully..");
  };

  return (
    <>
      <ManageRestoNavbar />
      <div className="container3">
        <div className="py-4">
          <h2 className="adminHeader">Welcome {name}</h2>
          <table className="table border shadow">
            <thead className="theadData">
              <tr>
                <th>#</th>
                <th scope="col">Restaurant Name</th>
                <th scope="col">Address</th>
                <th scope="col">Status</th>
                <th scope="col" colSpan="2">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {resto.map((rest, index) => (
                <tr className="homeData" key={rest._id}>
                  <td>{index+1}</td>
                  <td>{rest.name}</td>
                  <td>{rest.address}</td>
                  <td>{rest.active.toString() == "true" ? "Open" : "Close"}</td>
                  <td>
                    <Link
                      className="btn btn-success mr-2"
                      to={`/resto/${rest._id}`}
                    >
                      View
                    </Link>
                    <Link
                      className="btn btn-primary mr-2"
                      to={`/resto/edit/${rest._id}`}
                    >
                      Update
                    </Link>
                    <Link
                      className="btn btn-danger"
                      onClick={() => deleteResto(rest._id)}
                    >
                      Delete
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ManageResto;
