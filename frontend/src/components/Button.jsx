import React from "react";

export default function Button({ children, onClick }) {
  return (
    <button
      className="bg-linear-to-r from-[#f3911D] to-[#840B86] px-8 py-3 rounded-xl m-5 text-white"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
