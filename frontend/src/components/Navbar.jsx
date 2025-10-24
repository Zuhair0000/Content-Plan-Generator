import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";

export default function Navbar({ showbuttons = true }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <nav className="flex justify-between items-center bg-[#1F2028] px-10 text-white">
      <Link to={token ? "/dashboard" : "/"} className="font-bold text-lg ">
        Content-Planner
      </Link>

      {showbuttons && (
        <div className="flex gap-4 items-center">
          <Link className="px-4 py-2">Signup</Link>
          <Button>Login</Button>
        </div>
      )}
      {token && <Button onClick={handleLogout}>Logout</Button>}
    </nav>
  );
}
