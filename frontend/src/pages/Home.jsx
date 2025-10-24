import React from "react";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#1F2028] text-white">
      <Navbar />
      <div className="flex flex-col justify-center items-center p-10 min-h-[80vh]">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#f3911D] to-[#840B86] text-transparent bg-clip-text m-5">
          Plan your content with AI!
        </h1>
        <p className="text-md text-gray-300 text-center">
          Transform your company’s vision into compelling brand stories that
          resonate with your audience.
          <br /> Powered by advanced AI to craft narratives that inspire and
          convert.
        </p>

        <Button onClick={() => navigate("/login")}>Get Started !</Button>
      </div>
    </div>
  );
}
