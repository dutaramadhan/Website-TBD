import React from "react";
import logo from './assets/GRB_logo.png';

export const Header = () =>{
    return(
        <>
       <header
        className="flex justify-between items-center bg-blue-600 text-black p-3"
      >
        <h1 className="text-xl font-bold flex items-center">
          <img src={logo} className="w-12 h-12" />
          <div>Good Reading Bookstore</div>
        </h1>
      </header>
      </>
    )
}