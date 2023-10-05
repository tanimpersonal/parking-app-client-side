import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserLoginRegisterContext } from "../Context/UserLoginRegisterContext";
import axios from "axios";

const Menu = () => {
  const { email, image, setImage } = useContext(UserLoginRegisterContext);
  console.log(email, image);

  useEffect(() => {
    const imageFetch = async (email) => {
      if (email) {
        await axios
          .get(`api/v1/publicUsers/retrieveimage/${email}`, {
            responseType: "arraybuffer",
          })
          .then((res) => {
            console.log(res);
            const imageBlob = new Blob([res.data], { type: "image/jpeg" });
            const imageUrl = URL.createObjectURL(imageBlob);
            setImage(imageUrl);
            console.log(imageUrl);
          })
          .catch((err) => console.log(err));
      }
    };
    imageFetch(email);
  }, [email]);

  return (
    <div className="w-screen bg-black p-5">
      <menu className="container w-full  text-white m-auto flex justify-between">
        <div className="logo">
          <p>Parking Space</p>
        </div>
        <div className="nav-menu">
          <ul className="flex gap-5">
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="/loginregister">
              <li>Owner Login</li>
            </Link>
            <Link to="/ownerprofile">
              <li>Owner Profile</li>
            </Link>
            {image && (
              <li>
                <img src={image} alt="" srcSet="" />
              </li>
            )}
            <Link to="/userloginregister">
              <li>User Login</li>
            </Link>
          </ul>
        </div>
      </menu>
    </div>
  );
};

export default Menu;
