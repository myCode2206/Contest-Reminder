import { Link } from "react-router-dom";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaGoogle } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";

const LogIn = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, username } = formData;
    try {
      const res = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });
      console.log(res);
    } catch (e) {
      console.error("Error:", e);
    }
    setFormData({
      password: "",
      username: "",
    });
  };
  const googleLogIn = async () => {
    window.open("http://localhost:5000/google", "_self");
  };
  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center text-white">
            <span className="bg-gradient-to-r text-transparent from-blue-500 to-purple-500 bg-clip-text">
              LogIn
            </span>
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="username"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                <FaUser style={{ display: "inline" }} />
                Username
              </label>
              <div>
                <input
                  id="username"
                  name="username"
                  onChange={handleChange}
                  value={formData.username}
                  type="text"
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your name"
                />
              </div>
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                <RiLockPasswordFill style={{ display: "inline" }} />
                Password
              </label>
              <div>
                <input
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type="password"
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your password"
                />
              </div>
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              >
                LogIn
              </button>
            </div>
            <div className="text-center mt-4">
              <a href="#" className="text-gray-600 hover:underline">
                Forgot password?
              </a>
            </div>
          </form>
          <p className="text-center text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
          <div className="mt-4">
            <p className="text-center text-gray-600">Or log in with:</p>
            <div className="flex justify-center mt-2">
              <Link
                onClick={googleLogIn}
                to="#"
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-2"
              >
                <FaGoogle style={{ display: "inline" }} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;
