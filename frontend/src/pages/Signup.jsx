import React from "react";
import Navbar from "../components/Navbar";
import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const handleSignup = async (formData, setFormData) => {
    try {
      const res = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Sign up failed");

      setFormData({
        name: "",
        email: "",
        password: "",
      });

      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="min-h-screen bg-[#1f2028]">
      <Navbar />

      <div className="mt-40">
        <AuthForm type="signup" onSubmit={handleSignup} />
      </div>
    </div>
  );
}
