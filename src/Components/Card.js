"use client";
import React from "react";
import { MdDateRange } from "react-icons/md";
import { FcHighPriority } from "react-icons/fc";
import { FcLowPriority } from "react-icons/fc";
import { FcMediumPriority } from "react-icons/fc";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const Card = (props) => {

  const handleDone = (e) => {
      props.statusFunc({
        'id':props.id,
        'title':props.title,
        'description':props.desc,
        'dueDate':props.date,
        'priority':props.priority,
        'status':e.target.id})}


  const formatDueDate = (dateValue) => {
    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) return props.date;

    return date.toLocaleDateString("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <div
      className={`flex flex-col gap-3 w-80 rounded-lg border-t-12 ${props.status === "To-DO" ? "border-t-red-500" : props.status === "In Progress" ? "border-t-yellow-500" : "border-t-green-400"} border-2 border-gray-700 min-h-80 py-2 bg-green-50 px-2`}
    >
      <div className="w-full font-bold text-blue-400 text-xl flex items-center justify-center border-b-2 border-black">
        {props.title}
      </div>
      <div className="w-full text-slate-900 ">{props.desc}</div>
      <div className="flex gap-3 font-bold text-lg items-center justify-center rounded-md bg-gray-300 py-2">
        {props.priority === "High" ? (
          <>
            <p className="text-red-700">High Priority</p>
            <FcHighPriority className="text-red-700" size={30} />
          </>
        ) : props.priority === "Medium" ? (
          <>
            <p className="text-yellow-700">Medium Priority</p>
            <FcMediumPriority className="text-yellow-700" size={30} />
          </>
        ) : (
          <>
            <p className="text-green-500">Low Priority</p>
            <FcLowPriority className="text-green-500" size={30} />
          </>
        )}
      </div>
      <div className="font-bold text-slate-800 flex gap-3 items-center justify-center py-2 rounded-md bg-green-200">
        <p>Due Date: {formatDueDate(props.date)}</p>
        <MdDateRange className="text-green-400" size={25} />
      </div>
      <div className="flex justify-between font-bold text-lg px-2 rounded-md bg-blue-200 py-2 transition-all duration-300">
            <p onClick = {handleDone} id='To-DO' className="text-blue-600 cursor-pointer hover:text-blue-500 hover:scale-105">To DO</p>
            <p onClick = {handleDone} id="In Progress" className="text-yellow-600 cursor-pointer hover:text-yellow-500 hover:scale-105">In Progress</p>
            <p onClick = {handleDone} id="Done" className="text-green-600 cursor-pointer hover:text-green-500 hover:scale-105">Done</p>
      </div>
      <div className="flex justify-around font-bold rounded-md bg-amber-100 py-2 transition-all duration-300">
        <p onClick={() => {props.deleteFunc(props.id)}} className="flex gap-2 text-red-500 cursor-pointer hover:scale-105">Delete <MdDelete size={25}/></p>
        <p onClick={() => props.editFunc(props.id)} className="flex gap-2 text-purple-500 cursor-pointer hover:scale-105">Edit <FaEdit size={25}/></p>
      </div>
    </div>
  );
};

export default Card;
