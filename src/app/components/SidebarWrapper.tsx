"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import { FaBars, FaTimes } from "react-icons/fa";

export default function SidebarWrapper() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Button hanya tampil di mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 right-4 z-50 bg-white p-2  h-fit"
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar overlay untuk mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 backdrop-blur-lg z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed z-50 top-0 left-0 h-full bg-white shadow-md transform
          transition-transform duration-300 ease-in-out
          w-[300px]
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:relative md:flex md:w-[300px]
        `}
      >
        <Sidebar onClose={() => setIsOpen(false)} />
      </div>
    </>
  );
}
