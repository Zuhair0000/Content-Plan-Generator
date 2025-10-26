import React from "react";
import AuthForm from "../components/AuthForm";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Login() {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [isLoading, setIsloading] = useState(false);

  const handleLogin = async (formData, setFormData) => {
    setIsloading(true);
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
      toast.success("Login successfull");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setIsloading(false);
    }
  };
  return (
    <div className="bg-[#1f2028] min-h-screen">
      <Navbar />
      <div className="my-50">
        <AuthForm type="login" onSubmit={handleLogin} isLoading={isLoading} />
      </div>
    </div>
  );
}
