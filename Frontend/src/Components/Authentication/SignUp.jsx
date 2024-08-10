import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaGoogle } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
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
    const { email, password, username } = formData;
    try {
      const res = await axios.post(
        "https://contest-reminder-backend.vercel.app/signup",
        {
          email,
          password,
          username,
        }
      );
      console.log(res);
    } catch (e) {
      console.error("Error:", e);
    }
    setFormData({
      email: "",
      password: "",
      username: "",
      role: "",
    });
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen mt-2">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center text-white">
            <span className="bg-gradient-to-r text-transparent from-blue-500 to-purple-500 bg-clip-text">
              Sign Up
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
                  value={formData.username}
                  type="text"
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your name"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                <MdEmail style={{ display: "inline" }} />
                Email
              </label>
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your email"
                  onChange={handleChange}
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
                  type="password"
                  name="password"
                  value={formData.password}
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your password"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              >
                Sign Up
              </button>
            </div>
            <div className="text-center mt-4">
              <a href="#" className="text-gray-600 hover:underline">
                Forgot password?
              </a>
            </div>
          </form>
          <p className="text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Log In
            </Link>
          </p>
          <div className="mt-4">
            <p className="text-center text-gray-600">Or log in with:</p>
            <div className="flex justify-center mt-2">
              <Link
                to="#"
                className="bg-red-600  hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-2"
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

export default SignUp;
