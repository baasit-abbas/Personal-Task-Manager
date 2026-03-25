"use client";
import React, { useRef, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const FormInput = (props) => {
  const inputRef = useRef();
  const [show, setshow] = useState(false);
  return (
    <div className="flex flex-col relative">
      <label className="text-black font-bold text-lg " htmlFor={props.name}>
        {props.name}:
      </label>
      <input
        ref={inputRef}
        onChange={(e) => props.setter(e.target.value)}
        value={props.getter || ""}
        required
        type={props.type === 'password'? (
          show? 'text':'password'
        ):
        (props.type)}
        name={props.name}
        placeholder={`Enter ${props.name}`}
        className="border-2 border-slate-500 focus:border-blue-700 focus:ring-2 focus:ring-blue-200 focus:outline-none rounded-md md:w-90 w-80 px-3 pr-10 py-2"
      />
      <div className="cursor-pointer" onClick={() => setshow(!show)}>
        {props.type === "password" && (
          show ?(
          <FaEye
            className="absolute top-10  right-3"
            size={20}
          />
        ) : (
          <FaEyeSlash className="absolute top-10  right-3" size={20} />
        )
        )}
      </div>
    </div>
  );
};

export default FormInput;
