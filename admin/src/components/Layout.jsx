import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex">
      <Sidebar open={open} setOpen={setOpen} />

      {/* Content Area */}
      <div className="flex-1 md:ml-64 bg-gray-50 min-h-screen transition-all duration-300">
        <Navbar open={open} setOpen={setOpen} />

        <div className="p-5 mt-16">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
