"use client";
import Submit from "@/Components/Submit";
import React, { useEffect, useState } from "react";
import API from "../lib/api_client";
import { useRouter, useSearchParams } from "next/navigation";
import Loader from "@/Components/Loader";
import { toast } from "react-toastify";

const Form = () => {
  const [id,setId] = useState("")
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [dueDate, setdueDate] = useState("");
  const [selected, setSelected] = useState("");
  const [Loading, setLoading] = useState(false);
  const [isEdit, setisEdit] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const raw = searchParams.get("data");
    if (!raw) return;

    try {
      const dict = JSON.parse(decodeURIComponent(raw));
      setId(dict._id || "")
      settitle(dict.title || "");
      setdescription(dict.description || "");
      setdueDate(dict.dueDate || "");
      setSelected(dict.priority || "");
      setisEdit(true);
    } catch {
      toast.error("Invalid edit data in URL");
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      title: title,
      description: description,
      dueDate: dueDate,
      priority: selected,
    };
    try {
      let res;
      if (!isEdit){
          console.log('Hello')
          res = await API.post("/tasks", data);
      }
      else{
        data = {...data,id:id}
        res = await API.put('/tasks',data)
      }
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success(res.message);
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error("Failed to Upload this task");
    } finally {
      setLoading(false);
      settitle("");
      setdescription("");
      setSelected("");
      setdueDate("");
      setisEdit(false)
    }
  };
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-emerald-50 text-green-900 gap-10">
      <h1 className="md:text-5xl text-3xl font-bold text-green-900">
        Fill the Details About Task
      </h1>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div>
          <label className="font-bold text-2xl text-green-900" htmlFor="title">
            Enter Title:
          </label>
          <div className="md:w-120 w-90">
            <input
              onChange={(e) => settitle(e.target.value)}
              className="w-full py-3 border-2 border-green-300 focus:border-green-800 focus:outline-none rounded-md placeholder:text-lg px-3 text-xl placeholder:text-green-600 text-green-900 placeholder:font-normal font-bold"
              value={title || ""}
              name="title"
              type="text"
              placeholder="Enter title"
              required
            />
          </div>
        </div>
        <div>
          <label className="font-bold text-2xl text-green-900" htmlFor="desc">
            Enter Description:
          </label>
          <div className="md:w-120 w-90">
            <input
              onChange={(e) => setdescription(e.target.value)}
              className="w-full py-3 border-2 border-green-300 focus:border-green-800 focus:outline-none rounded-md placeholder:text-lg px-3 text-xl placeholder:text-green-600 text-green-900 placeholder:font-normal font-bold"
              value={description || ""}
              name="desc"
              type="text"
              placeholder="Enter Descripton"
              required
            />
          </div>
        </div>
        <div>
          <label
            className="font-bold text-2xl text-green-900"
            htmlFor="dueDate"
          >
            Select Due Date:
          </label>
          <div className="font-bold text-green-400 text-lg">
            <input
              onChange={(e) => setdueDate(e.target.value)}
              type="date"
              name="dueDate"
              value={dueDate}
              required
            />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-green-900 font-bold text-2xl">
            Select Priority:
          </h1>
          <div className="flex gap-3 items-center w-23 justify-between">
            <label htmlFor="Low">Low</label>
            <input
              id="Low"
              name="option"
              value="Low"
              checked={selected === "Low"}
              onChange={(e) => setSelected(e.target.value)}
              type="radio"
            />
          </div>
          <div className="flex gap-3 items-center w-23 justify-between">
            <label htmlFor="Medium">Medium</label>
            <input
              id="Medium"
              name="option"
              value="Medium"
              checked={selected === "Medium"}
              onChange={(e) => setSelected(e.target.value)}
              type="radio"
            />
          </div>
          <div className="flex gap-3 items-center w-23 justify-between">
            <label htmlFor="High">High</label>
            <input
              id="High"
              name="option"
              value="High"
              checked={selected === "High"}
              onChange={(e) => setSelected(e.target.value)}
              type="radio"
            />
          </div>
        </div>

        {Loading ? <Loader /> : isEdit? <Submit name='Update'/>:<Submit />}
      </form>
    </div>
  );
};

export default Form;
