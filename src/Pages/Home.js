import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [userDetail, setUserDetail] = useState({});
  const navigate = useNavigate();

  const userDataInLocalStorage = () => {
    const user = JSON.parse(localStorage.getItem("startoon-userInfo"));
    setUserDetail(user);
    if (user) navigate("/home");
    else navigate("/");
  };

  useEffect(() => userDataInLocalStorage(), []);
  return (
    <div>
      <h1>
        Hi {userDetail.name}. Thank you for using this app. In below you can see
        your profile details
      </h1>
      <p>Name : {userDetail.name}</p>
      <p>Email : {userDetail.email}</p>
      <p>Password : {userDetail.password}</p>
      <p>Gender : {userDetail.gender}</p>
    </div>
  );
};
