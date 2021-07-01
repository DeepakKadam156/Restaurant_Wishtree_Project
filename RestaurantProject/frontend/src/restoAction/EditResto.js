import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import AddUpdateRestoNav from "../NavBar/AddUpdateRestoNav";
import validateInfo from "../validation/validateInfo";
import { Switch } from "@material-ui/core";

//Restaurant edit page 

const EditResto = () => {
  let history = useHistory();
  const { id } = useParams();
  const [resto, setResto] = useState({
    name: "",
    address: "",
    openTime: "",
    closeTime: "",
    phone: "",
    imageUrl: "",
    active: "",
  });

  useEffect(() => {
    let token = localStorage.getItem("admin");
    if (token == null) {
      history.push("/login");
      alert("Login First..");
    }
  }, []);

  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(false);

  const { name, address, openTime, closeTime, phone, active } = resto;

  const changeHandler = (e) => {
    setResto({ ...resto, [e.target.name]: e.target.value });
    e.preventDefault();
  };

  const switchHandler=(e,val)=> {
    setResto({...resto, active:val});
    console.log(val);
  }

  useEffect(() => {
    loadResto();
    console.log(resto.active)
  }, []);

  const updateHandler = async (e) => {
    e.preventDefault();

    const [isValid, isErrors] = validateInfo(resto);
    setErrors(isErrors);
    setValid(isValid);

    if (valid) {
      const resp = await axios.patch(
        `http://localhost:5000/resto/${id}`,
        resto
      );
      console.log(resp);
      if (resp.status === 200) history.push("/manageResto");
    }
  };

  const loadResto = async () => {
    const resp = await axios.get(`http://localhost:5000/resto/${id}`);
    setResto(resp.data);
  };

  return (
    <>
      <AddUpdateRestoNav />
      <div className="container3">
        <div className="container2">
          <div className="header1">
            <h1>Update Restaurant</h1>
          </div>
          <table>
          <div className="main1">
            <form>
              <tr>
              <div>
                <th>
                <b>Name:</b>
                </th>
                <td>
                <input
                  className="inputClass"
                  type="text"
                  placeholder="Enter Restaurant Name"
                  name="name"
                  value={name}
                  onChange={(e) => changeHandler(e)}
                />
                {errors.name && <p className="statusInput">{errors.name}</p>}
                </td>
              </div>
              </tr>
              <tr>
              <div>
                <td>
                <textarea
                  className="textareaClass"
                  type="text"
                  rows="3"
                  cols="33"
                  placeholder="Enter Restaurant Address"
                  name="address"
                  value={address}
                  onChange={(e) => changeHandler(e)}
                />
                {errors.address && <p className="statusInput">{errors.address}</p>}
                </td>
              </div>
              </tr>
              <tr>
              <div>
                <th>
                <b>Open</b>
                </th>
                <td>
                <input
                  className="inputClass"
                  type="time"
                  name="openTime"
                  value={openTime}
                  onChange={(e) => changeHandler(e)}
                />
                {errors.openTime && <p className="statusInput">{errors.openTime}</p>}
                </td>
              </div>
              </tr>
              <tr>
              <div>
                <th>
                <b>Close</b>
                </th>
                <td>
                <input
                  className="inputClass"
                  type="time"
                  name="closeTime"
                  value={closeTime}
                  onChange={(e) => changeHandler(e)}
                />
                {errors.closeTime && <p className="statusInput">{errors.closeTime}</p>}
                </td>
              </div>
              </tr>
              <tr>
              <div>
                <th>
                <b>Phone</b>
                </th>
                <td><input
                  className="inputClass"
                  type="text"
                  placeholder="Enter Restaurant Phone"
                  name="phone"
                  value={phone}
                  onChange={(e) => changeHandler(e)}
                />
                {errors.phone && <p className="statusInput">{errors.phone}</p>}
                </td>
              </div>
              </tr>
              <tr>
              <div className="switchStatus">
                <th>
               <b>Status:</b>
               </th>
               <td>
              <span className="switchClass">Close</span>
                 <Switch color="primary" size="medium" name="active" onChange={switchHandler} />
                 <span>Open</span>
                 </td>
              </div>
              </tr>
              <button onClick={(e) => updateHandler(e)}>Update</button>
            </form>
          </div>
          </table>
        </div>
      </div>
    </>
  );
};

export default EditResto;
