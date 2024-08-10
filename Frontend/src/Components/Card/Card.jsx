import React from "react";
import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg m-5 border border-gray-200 transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <div className="relative h-40">
        <img
          className="absolute h-full w-full object-cover"
          src={props.img}
          alt={props.title}
          style={{
            objectFit: "contain",
            border: "1px solid lightgrey",
          }}
        />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{props.title}</div>
        <p className="text-gray-700 text-base">{props.desc}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <Link to={props.redirect}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-all duration-300 ease-in-out">
            Check
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
