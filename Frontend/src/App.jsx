import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Nav from "./Components/Navbar/Nav";
import LogIn from "./Components/Authentication/Login";
import SignUp from "./Components/Authentication/SignUp";
import "./App.css";
import Contests from "./Pages/Contest/Contests";
import Error from "./Pages/Error/Error";

const App = () => {
  const [userdata, setuser] = useState(null);

  useEffect(() => {
    const fetchuserinfo = () => {
      fetch("http://localhost:5000/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setuser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchuserinfo();
  }, []);

  return (
    <BrowserRouter>
      <Nav userdata={userdata} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/codeforces/contest" element={<Contests />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
