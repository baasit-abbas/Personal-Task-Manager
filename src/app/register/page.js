"use client"
import FormInput from "@/Components/FormInput";
import Submit from "@/Components/Submit";
import Link from "next/link";
import React, { useState } from "react";
import API from "../lib/api_client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Loader from "@/Components/Loader";
import { signIn } from "next-auth/react";

const Register = () => {
  const [username, setusername] = useState("");
  const [password, setPassowrd] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassowrd, setconfirmPassowrd] = useState("");
  const [Loading, setLoading] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassowrd){
        toast.error('Passowrd do not match')
        return
    }
    const data = {
        username:username,
        email:email,
        password:password
    }
    setLoading(true)
    try{
      var res = await API.post('/auth/register',data)
    }
    catch(error){
      toast.error('This username or email already exists')
      setLoading(false)
      return
    }
    setusername('')
    setEmail('')
    setPassowrd('')
    setconfirmPassowrd('')
    if (res.message){
        await signIn('credentials',{...data,callbackUrl:'/'})
    }
    else{
        toast.error(res.error)
    }
    setLoading(false)
  };
  return (
    <div className="flex flex-col items-center justify-center bg-amber-50 m-10 rounded-md gap-8">
      <h1 className="text-6xl font-bold text-slate-800">Create Your Account</h1>
      <form className="flex flex-col gap-7" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3">
          <FormInput
            name="Username"
            type="text"
            setter={setusername}
            getter={username}
          />
          <FormInput
            name="Email"
            type="email"
            setter={setEmail}
            getter={email}
          />
          <FormInput
            name="Password"
            type="password"
            setter={setPassowrd}
            getter={password}
          />
          <FormInput
            name="Confirm Passowrd"
            type="password"
            setter={setconfirmPassowrd}
            getter={confirmPassowrd}
          />
        </div>
        <div>
            <Submit />
        </div>
      </form>
      {Loading && <Loader />}
      <p className="font-bold text-md text-slate-900">Already have an account? <Link className="hover:underline font-normal hover:text-blue-700" href={'/login'}>Log in</Link></p>
    </div>
  );
};

export default Register;
