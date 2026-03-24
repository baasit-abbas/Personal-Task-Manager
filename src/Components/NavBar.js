"use client";
import React, { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loader from '@/Components/Loader'
import Links from "./Links";
const NavBar = () => {
  const { data: session, status } = useSession();
  const [isShow, setisShow] = useState(false)
  const router = useRouter();
  return (
    <div className="fixed top-0 bg-slate-900 h-15 left-0 right-0 flex items-center justify-between px-20 z-10">
      <h1 className="text-slate-400 text-4xl font-bold">Task Manager</h1>
      <div>
        {status === "unauthenticated" ? (
          <div>
            <button
              onClick={() => {
                router.push("/login");
              }}
              className="bg-slate-800 rounded-md px-3 py-2 border-none hover:bg-slate-700 active:scale-[0.9] font-bold cursor-pointer text-slate-400 transition-all duration-300"
            >
              Log In
            </button>
          </div>
        ) : status === "loading" ? (
          <div className="flex justify-center items-center">
            <Loader color='border-white' />
          </div>
        ) : (
          <div className="relative">
            <div className="relative text-gray-900">
            <button onBlur={() => {setTimeout(() => {
                setisShow(false)
            },300)}} onClick={() => {setisShow(!isShow)}} className="px-3 py-2 pr-8 bg-white font-bold text-md  rounded-md cursor-pointer hover:bg-gray-200 transition-all duration-300">Hello {session?.user?.name}</button>
            <RiArrowDropDownLine size={35} className="absolute top-1/2 translate-y-[-50%] right-0" />
            </div>
            {isShow && <ul className="w-40 bg-white font-bold rounded-md absolute top-13 flex flex-col justify-center items-center">
                <Links name='Home' href='/'/>
                <Links name='Dashboard' href='/dashboard'/>
                <Links name='Log Out' Click={() => signOut({callbackUrl:'/login'})}/>
            </ul>}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
