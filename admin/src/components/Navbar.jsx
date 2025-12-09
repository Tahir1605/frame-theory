import {
  BellIcon,
  SunIcon,
  MoonIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  UserIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

import { NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const Navbar = ({ open, setOpen }) => {
  const [dark, setDark] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className="
        fixed top-0 left-0 md:ml-64 w-full md:w-[calc(100%-16rem)]
        bg-white shadow-md z-30 px-4 sm:px-6 py-3
        flex justify-between items-center
      "
    >
      {/* Left Section */}
      <div className="flex items-center gap-3">
        {/* Sidebar Toggle */}
        <button
          className="p-2 rounded-lg cursor-pointer hover:bg-gray-100 md:hidden"
          onClick={() => setOpen(!open)}
        >
          <Bars3Icon className="w-7 h-7" />
        </button>

        {/* Search Bar */}
        <div
          className="
            hidden sm:flex items-center bg-gray-100 
            px-3 py-2.5 rounded-md
            w-56 sm:w-80 md:w-72
            shadow-inner focus-within:ring-3 focus-within:ring-blue-400
          "
        >
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search anything..."
            className="ml-2 bg-transparent outline-none w-full text-sm"
          />
        </div>
      </div>

      {/* Right Icons */}
      <div className="flex items-center gap-5">
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDark(!dark)}
          className="p-2 cursor-pointer rounded-full hover:bg-gray-100 transition"
        >
          {dark ? (
            <SunIcon className="w-6 h-6 text-yellow-500" />
          ) : (
            <MoonIcon className="w-6 h-6" />
          )}
        </button>

        {/* Notification Icon */}
        <button className="relative p-2 cursor-pointer rounded-full hover:bg-gray-100">
          <BellIcon className="w-6 h-6" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <img
            src="https://i.pravatar.cc/40"
            className="w-10 h-10 rounded-full shadow cursor-pointer"
            alt="profile"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />

          {dropdownOpen && (
            <div
              className="
                absolute right-0 mt-3 w-48 bg-white shadow-lg rounded-lg
                border border-gray-200 py-2 animate-fadeIn
              "
            >
              {/* Profile Link */}
              <NavLink
                to="/profile"
                className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setDropdownOpen(false)}
              >
                <UserIcon className="w-5 h-5 text-gray-600" />
                Profile
              </NavLink>

              {/* Logout Link */}
              <NavLink
                to="/logout"
                className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setDropdownOpen(false)}
              >
                <ArrowRightOnRectangleIcon className="w-5 h-5 text-gray-600" />
                Logout
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
