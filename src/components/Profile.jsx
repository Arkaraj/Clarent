import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      {user ? <h1>Hi, {user.firstname}</h1> : <p className="loading"></p>}
    </div>
  );
};

export default Profile;
