import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ViewNavbar from "../NavBar/ViewNavbar";

//getting single record from server using get method.

const RestoInfo = () => {
  const [resto, setResto] = useState({});

  const { id } = useParams();

  useEffect(() => {
    loadResto();
  }, []);

  const loadResto = async () => {
    const res = await axios.get(`http://localhost:5000/resto/${id}`);
    console.log(id);
    setResto(res.data);
  };

  return (
    <>
      <ViewNavbar />
      <div className="container3">
        <table>
          <tr>
            <td>
              {resto.imageUrl && (
                <img className="viewData" src={resto.imageUrl} />
              )}
            </td>
            <td className="viewData1">
              Name:{resto.name} <br />
              Address:{resto.address}
              <br />
              OpenTime:{resto.openTime}
              <br />
              CloseTime:{resto.closeTime}
              <br />
              Phone:{resto.phone}
              <br />
            </td>
          </tr>
        </table>
      </div>
    </>
  );
};

export default RestoInfo;
