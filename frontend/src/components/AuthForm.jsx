import React, { useState } from "react";
import Button from "./Button";

export default function AuthForm({ type, onSubmit, IsLoading }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, setFormData);
  };

  const isSignup = type === "signup";
  return (
    <div className="w-full max-w-md mx-auto bg-[#1F2028] backdrop:blur-lg rounded-2xl p-8 shadow-lg text-white border border-white/10">
      <h1 className="text-5xl text-orange-500 text-center font-bold mb-6">
        {isSignup ? "Signup" : "Login"}
      </h1>

      <form className="space-y-5" onSubmit={handleSubmit}>
        {isSignup && (
          <div>
            <label className="block text-sm mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md bg-white/5 border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
        )}

        <div>
          <label className="block mb-1 text-sm">Email</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded-md border-white/20 bg-white/5 focus:outline-none focus:ring-2 focus:ring-pink-500 "
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-white/20 bg-white/5 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
        <div className="flex justify-center">
          <Button onSubmit={onSubmit}>{isSignup ? "Sign up" : "Login"}</Button>
        </div>
      </form>
      <p className="text-center mt-3 text-sm">
        {isSignup ? (
          <>
            Already have and account?{" "}
            <a className="text-pink-400 hover:underline" href="/login">
              Login
            </a>
          </>
        ) : (
          <>
            New?{" "}
            <a className="text-pink-400 hover:underline" href="/signup">
              Sign up
            </a>
          </>
        )}
      </p>
    </div>
  );
}
