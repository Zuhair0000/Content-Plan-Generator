import React from "react";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen text-white flex flex-col justify-center items-center overflow-hidden">
      <video
        loop
        muted
        autoPlay
        playsInline
        className="absolute h-full w-full top-0 left-0 object-cover"
      >
        <source src="/video/bg.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/80 "></div>

      <div className="w-full absolute min-h-screen ">
        <Navbar transparent={true} />

        <div className="flex flex-col justify-center items-center flex-1 text-center sm:px-9 mt-20 sm:mt-32 md:mt-80">
          <h1 className="text-4xl md:text-6xl sm:text-5xl  font-bold bg-linear-to-r from-[#f3911D] to-[#840B86] text-transparent bg-clip-text m-5">
            Plan Your Content with AI
          </h1>
          <p className="text-sm md:text-lg sm:text-base text-gray-300 text-center mb-10 ">
            Turn any idea into a complete content plan with AI-generated posts,
            captions, hashtags, visuals, and schedules.
            <br /> Designed to help you create engaging, ready-to-publish social
            media content effortlessly.
          </p>

          <Button onClick={() => navigate("/login")}>Get Started !</Button>
        </div>
      </div>
    </div>
  );
}
