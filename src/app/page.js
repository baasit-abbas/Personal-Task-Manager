"use client";
import NavBar from "@/Components/NavBar";
export default function Home() {
  return (
    <div className="h-screen text-slate-950 flex items-center justify-between px-15 bg-[url('/bg_alt.svg')] bg-cover bg-center">
    <NavBar />
    <div className="flex flex-col gap-5">
      <h1 className="text-8xl w-200 font-bold">Your Own Task Manager</h1>
      <p className="font-bold text-lg">Organize your work and stay productive.</p>
      <p className="text-slate-400">Manage your daily tasks, set priorities, track progress, and complete your goals efficiently with your personal task manager.</p>
    </div>
        <div className="w-100 h-100 bg-transparent">
          <img className="w-full h-full bg-transparent rounded-full" src="/worker.gif" alt="" />
        </div>
    </div>
  );
}
