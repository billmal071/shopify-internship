import React from 'react';
import {NavLink} from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <h4 className="text-9xl text-red-700 text-center"> 404 </h4>
      <p className="text-3xl text-white text-center uppercase">page not found</p>
      <NavLink exact to="/" className="text-green-400 text-xl uppercase">go back</NavLink>
    </div>
  );
};

export default NotFound;
