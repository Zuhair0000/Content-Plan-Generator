import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import Logo from "../assets/Logo3.png";
import { Menu, X } from "lucide-react";

export default function Navbar({ showbuttons = true, transparent = false }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [navigate]);
  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`relative flex justify-between items-center border border-white/10 rounded-4xl m-5
          px-10 text-white shadow-2xl z-50 overflow-hidden
          ${
            transparent
              ? " backdrop-blur-2xl bg-white/10"
              : "bg-[#1F2028]/80 backdrop-blur-2xl border-white/10"
          }
        `}
      >
        {/* Glass overlay layer */}
        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-white/20 to-transparent opacity-10 pointer-events-none rounded-4xl" />

        {/* Logo */}
        <Link
          to={token ? "/dashboard" : "/"}
          className="flex items-center font-bold text-lg gap-2 z-10"
        >
          <img src={Logo} alt="Hive Logo" className="w-12 object-contain" />
          Hive Content
        </Link>

        {/* Desktop Links */}
        {showbuttons && (
          <div className="hidden md:flex gap-4 items-center z-10">
            <Link to="/signup" className="px-4 py-2 hover:text-white/80">
              Signup
            </Link>
            <Button onClick={() => navigate("/login")}>Login</Button>
          </div>
        )}

        {token && (
          <Button
            onClick={() => {
              handleLogout();
              setMenuOpen(false);
            }}
          >
            Logout
          </Button>
        )}

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden z-10 focus:outline-none"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* MOBILE MENU (glassy fullscreen overlay) */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-start pt-32 text-white backdrop-blur-2xl bg-white/5 border-t border-white/10 shadow-2xl animate-fade-in">
          {/* Gradient glass reflection */}
          <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent opacity-10 pointer-events-none" />

          {showbuttons && (
            <>
              <Link
                to="/signup"
                className="px-6 py-3 text-lg font-medium hover:text-white/80 relative z-10"
                onClick={() => setMenuOpen(false)}
              >
                Signup
              </Link>
              <Button
                onClick={() => {
                  navigate("/login");
                  setMenuOpen(false);
                }}
              >
                Login
              </Button>
            </>
          )}

          {token && (
            <Button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
            >
              Logout
            </Button>
          )}
        </div>
      )}
    </>
  );
}
