"use client";
import NavBar from "@/Components/NavBar";
export default function Home() {
  return (
    <div className="h-screen text-slate-950 flex md:flex-row flex-col items-center md:justify-between justify-center px-3 md:px-15 bg-[url('/bg_alt.svg')] bg-cover bg-center">
    <NavBar />
    <div className="flex flex-col gap-5">
      <h1 className="md:text-8xl text-6xl md:w-200 w-full font-bold">Your Own Task Manager</h1>
      <p className="font-bold text-lg">Organize your work and stay productive.</p>
      <p className="text-slate-400">Manage your daily tasks, set priorities, track progress, and complete your goals efficiently with your personal task manager.</p>
    </div>
        <div className="w-80 h-80 md:w-96 md:h-96 bg-transparent flex-shrink-0">
          <img className="w-full h-full bg-transparent rounded-full object-cover" src="/worker.gif" alt="task manager illustration" />
        </div>
    </div>
  );
}
