import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import HomeNavbar from "../NavBar/HomeNavbar";

//home page getting only open restaurants.

const HomePage = () => {
  const [resto, setResto] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadResto();
  }, []);

  const loadResto = async () => {
    const resp = await axios.get(`http://localhost:5000/resto`);
    setResto(resp.data);
  };

  return (
    <>
      <HomeNavbar />
      <div className="container5">
        <div className="searchTask">
          <input
            className="searchTask1"
            type="text"
            placeholder="Search"
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </div>
        <div className="container">
          <div className="py-4">
            <table className="table border shadow">
              <thead className="theadData">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Restaurant Name</th>
                  <th scope="col">Address</th>
                  <th scope="col">Open Timing</th>
                  <th scope="col">Close Timing</th>
                  <th image="col">Image</th>
                  <th scope="col">Details</th>
                </tr>
              </thead>
              <tbody>
                {resto
                  .filter((rest) => {
                    if (search == "") {
                      return rest;
                    } else if (
                      rest.name.toLowerCase().includes(search.toLowerCase())
                    ) {
                      return rest;
                    }
                  })
                  .map((rest, index) => (
                    <tr className="homeData" key={rest._id}>
                      <td>{index + 1}</td>
                      <td>{rest.name}</td>
                      <td>{rest.address}</td>
                      <td>{rest.openTime}</td>
                      <td>{rest.closeTime}</td>
                      <td>
                        {rest.imageUrl && (
                          <img className="imageData" src={rest.imageUrl} />
                        )}
                      </td>
                      <td>
                        <NavLink
                          className="btn btn-primary mr-2"
                          to={`/resto/${rest._id}`}
                        >
                          View
                        </NavLink>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
