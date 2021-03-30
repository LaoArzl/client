import React, { useState, useEffect } from "react";
import Axios from "axios";

const NavProfile = () => {
  const [id, setId] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    setId(window.location.pathname.replace("/admin/edit-user/", ""));
  }, []);

  useEffect(() => {
    Axios.get(`http://localhost:3001/${id}`).then((response) => {
      setData(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <>
      <h1>NavProfile</h1>
      <p>{id}</p>
      {data.map((value) => {
        return (
          <>
            <p>{value._id}</p>
            <p>{value.username}</p>
            <p>{value.password}</p>
            <p>{value.fullName}</p>
          </>
        );
      })}
    </>
  );
};

export default NavProfile;
