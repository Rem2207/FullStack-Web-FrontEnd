"use client";
import { Toaster } from "react-hot-toast";

export function Providers({ children }) {
  return (
    <>
      <div className="relative h-full w-full overflow-hidden md:overflow-clip"><div className="absolute bottom-0 left-[-20%] md:left-[10%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div><div className="absolute bottom-0 right-[-20%] md:right-[10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div></div>
      {children}
      <Toaster position="bottom-center" />
    </>
  );
}
