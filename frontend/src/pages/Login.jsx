import React from "react";
import AuthForm from "../components/AuthForm";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const handleLogin = async (formData, setFormData) => {
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setFormData({
        email: "",
        password: "",
      });
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="bg-[#1f2028] min-h-screen">
      <Navbar />
      <div className="mt-40">
        <AuthForm type="login" onSubmit={handleLogin} />
      </div>
    </div>
  );
}
