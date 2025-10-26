import React, { useState } from "react";
import Button from "./Button";
import { Link } from "react-router-dom";

export default function AuthForm({ type, onSubmit, isLoading }) {
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
    <div className="w-[90%] sm:w-[85%] md:w-full max-w-md mx-auto bg-[#1F2028] backdrop:blur-lg rounded-2xl p-8 shadow-lg text-white border border-white/10">
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
          <Button onClick={handleSubmit}>
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="w-5 h-5 mr-2 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                  ></path>
                </svg>
                Processing…
              </div>
            ) : isSignup ? (
              "Sign up"
            ) : (
              "Login"
            )}
          </Button>
        </div>
      </form>
      <p className="text-center mt-3 text-sm">
        {isSignup ? (
          <>
            Already have and account?{" "}
            <Link className="text-pink-400 hover:underline" to="/login">
              Login
            </Link>
          </>
        ) : (
          <>
            New?{" "}
            <Link className="text-pink-400 hover:underline" to="/signup">
              Sign up
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
