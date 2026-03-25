"use client";
import NavBar from "@/Components/NavBar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import API from "../lib/api_client";
import Card from "@/Components/Card";
import { toast } from "react-toastify";
import Show from "@/Components/Show";

const Page = () => {
  const [tasks, setTasks] = useState([]);
  const [selected, setSelected] = useState("Show All");
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    const fetchDate = async () => {
      const task = await API.get("/tasks");
      setTasks(task);
    };
    fetchDate();
  }, []);


  const formatDueDate = (dateValue) => {
    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) return props.date;

    return date.toLocaleDateString("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const handleEdit = (id) => {
    let updateData = tasks.find((t) => String(t._id) === String(id))
    updateData.dueDate = formatDueDate(updateData.dueDate);
    const encoded = encodeURIComponent(JSON.stringify(updateData));
    router.push(`/form?data=${encoded}`);
  };

  const handleStatus = async (data) => {
    let new_status = data.status;
    const newTasks = tasks.map((task) =>
      task._id === data.id ? { ...task, ...data } : task,
    );
    const res = await API.put("/tasks", data);
    setTasks(newTasks);
    if (res.message) {
      if (new_status === "In Progress") {
        toast.info("Task is in Progress");
      } else if (new_status === "Done") {
        toast.success("Congratulations on Completing a task");
      } else {
        toast.info("Task has to be done");
      }
    } else {
      toast.error(res.error);
    }
  };

  const handleDelete = async (id) => {
    const newTasks = tasks.filter((task) => task._id !== id);
    const res = await API.delete("/tasks", { id });
    setTasks(newTasks);
    if (res.message) {
      toast.success(res.message);
    } else {
      toast.error(res.error);
    }
  };

  const handleSelected = (name) => {
    setSelected(name)
  }

  const showTask = () => {
    if (selected === "Show All") return tasks;
    if (selected === "Show Low") {
      return tasks.filter((task) => task.priority === "Low");
    }
    if (selected === "Show Medium") {
      return tasks.filter((task) => task.priority === "Medium");
    }
    return tasks.filter((task) => task.priority === "High");
  };
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,#e2fbe7_0%,#f8fafc_45%,#ecfdf3_100%)]">
      <NavBar />
      <button
        onClick={() => router.push("/form")}
        className="fixed top-20 left-1/2 -translate-x-1/2 z-10 px-6 py-2.5 rounded-full bg-linear-to-r from-emerald-500 to-green-600 text-white font-bold cursor-pointer shadow-lg shadow-emerald-300/50 hover:from-emerald-400 hover:to-green-500 transition-all duration-300 active:scale-95"
      >
        Add Task
      </button>
      <div className="flex gap-3 items-center fixed top-33 md:left-1/2 md:translate-x-[-25%] z-[-1] w-full md:px-0 px-2">
        <Show selected={selected} id={'Show All'} name={'Show All'} func = {handleSelected} />
        <Show selected={selected} id={'Show Low'} name={'Show Low Priority tasks'} func = {handleSelected} />
        <Show selected={selected} id={'Show Medium'} name={'Show Medium Priority tasks'} func = {handleSelected} />
        <Show selected={selected} id={'Show High'} name={'Show High Priority tasks'} func = {handleSelected} />
        
        
      </div>
      {showTask().length === 0 ? (
        <div className="h-40 w-full flex items-center md:justify-center md:mt-60 mt-80">
          <h1 className="md:text-8xl text-7xl md:w-[60%] w-full md:px-0 px-5 font-bold text-green-400">
            No Tasks to Show {session?.user?.name}.
          </h1>
        </div>
      ) : (
        <div className="container flex flex-wrap gap-8 md:mt-50 mt-55 px-10 pb-16">
          {showTask().map((task) => {
            return (
              <Card
                key={task._id}
                id={task._id}
                user={task.user}
                title={task.title}
                desc={task.description}
                date={task.dueDate}
                priority={task.priority}
                status={task.status}
                deleteFunc={handleDelete}
                statusFunc={handleStatus}
                editFunc={handleEdit}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Page;
