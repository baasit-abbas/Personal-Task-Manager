"use client";
import FormInput from "@/Components/FormInput";
import React , {useState} from "react";
import API from "../lib/api_client";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { FaGithub } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Loader from "@/Components/Loader";
import Submit from "@/Components/Submit";

const Login = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [Loading, setLoading] = useState(false)
  const router = useRouter()
  const handleSubmit = async (e) => {
      e.preventDefault()
      const data = {
        username,
        email,
        password,
      }
      setUsername('')
      setEmail('')
      setPassword('')

      setLoading(true)
      try {
        const res = await signIn('credentials', {
          ...data, 
          redirect:false
        })
        console.log(res)

        if (res?.ok) {
          toast.success('Login Successfull')
          router.push('/')
        } else {
          toast.error('Invalid Username or Passowrd')
        }
      } catch (error) {
        toast.error('Something went wrong while logging in')
      } finally {
        setLoading(false)
      }
  }
  const githubLogIn = async () => {
    try{
      await signIn('github', { callbackUrl: '/' })
    }
    catch (error){
      toast.error('Failed to Log In with Github')
    }
  }
  return (
    <div className="h-screen bg-white p-6">
      <div className="bg-gray-200 rounded-md w-full h-full flex items-center justify-center px-10 gap-10 flex-col ">
        <h1 className="text-7xl text-green-400 font-bold">TaskManager</h1>
        <h2 className="text-2xl text-black">Enter your Login credentials</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3">
            <FormInput name="Username" type="text" getter={username} setter={setUsername} />
            <FormInput name="Email" type="email" getter={email} setter={setEmail} />
            <FormInput name="Password" type="password" getter={password} setter={setPassword} />
          </div>
          <Submit />
        </form>
        {Loading && <div><Loader color='black' /></div>}
        <div onClick={githubLogIn} className="relative w-[30%] h-10 active:scale-[0.9] transition-all duration-300">
          <button className="select-none w-full h-full text-center rounded-md text-lg font-bold text-slate-800 bg-white border-none cursor-pointer hover:bg-gray-200 transition duration-300">Continue with github</button>
          <FaGithub size={25} className="absolute left-3 top-1/2 translate-y-[-50%] cursor-pointer hover:text-gray-600 transition-all duration-300"  />
        </div>
        <div className="flex gap-3">
            <p className="font-bold text-slate-900">Don&apos;t have an account ? </p>
            <a className="hover:underline hover:text-blue-500" href="/register">Create an account</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
