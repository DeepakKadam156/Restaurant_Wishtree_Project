import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import validateInfo from "../validation/validateInfo";
import AddUpdateRestoNav from "../NavBar/AddUpdateRestoNav";

//add restaurant page which is only accessible to admin

const AddResto = () => {
  let history = useHistory();
  const [resto, setResto] = useState({
    name: "",
    address: "",
    openTime: "",
    closeTime: "",
    phone: "",
    imageUrl: "",
    active: false,
  });

  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(false);

  useEffect(() => {
    let token=localStorage.getItem("admin");
    if(token==null)
    {
        history.push('/login')
        alert("Login First..")
    }
;
  }, []);

  const { name, address, openTime, closeTime, phone } = resto;

  const changeHandler = (e) => {
    setResto({ ...resto, [e.target.name]: e.target.value });

    e.preventDefault();
  };

  const imageHandler = async (e) => {
    e.preventDefault();
    const { files } = document.querySelector('input[type="file"]');

    const formData = new FormData();
    formData.append("file", files[0]);

    formData.append("upload_preset", "my12upload");
    const options = {
      method: "POST",
      body: formData,
    };

    await fetch(
      `https://api.cloudinary.com/v1_1/myimgcloud2261/image/upload`,
      options
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res.secure_url);
        setResto({ ...resto, imageUrl:res.secure_url});
        console.log(resto.imageUrl);
      });
  };

  const addHandler = async (e) => {
    e.preventDefault();

    const [isValid, isErrors] = validateInfo(resto);
    setErrors(isErrors);
    setValid(isValid);

    if (valid) {
      const resp = await axios.post(`http://localhost:5000/resto`, resto);
      if (resp) {
        console.log(resp.data);
        history.push("/manageResto");
      }
    }
  };

  return (
    <>
      <AddUpdateRestoNav />
      <div className="container3">
        <div className="container2">
          <div className="header1">
            <h1>Add Restaurant</h1>
          </div>
          <table>
          <div className="main1">
            <form>
              <tr>
              <div>
                <th><b>Name:</b></th>
                <td><input
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
                
                <td colSpan="2">
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
                ></input>
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
                <td>
                <input
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
              <div>
                <th>
                <b>Image</b>
                </th>
                <td>
                <input
                  className="inputClass"
                  type="file"
                  name="imageUrl"
                  onChange={(e) => imageHandler(e)}
                />
                {errors.imageUrl && <p className="statusInput">{errors.imageUrl}</p>}
                </td>
              </div>
              </tr>
              <tr>
                <th colSpan="2">
              <button onClick={(e) => addHandler(e)}>Add</button>
              </th>
              </tr>
            </form>
          </div>
          </table>
        </div>
      </div>
    </>
  );
};

export default AddResto;
