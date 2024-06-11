import React from "react";
import Navbar from "@/components/Navbar";

const page = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col flex-grow layout-padding">
        <main>
          {children}
        </main>
      </div>
    </div>
  );
};

export default page;
