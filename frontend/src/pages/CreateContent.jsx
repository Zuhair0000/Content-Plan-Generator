import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function CreateContent() {
  const [formData, setFormData] = useState({
    businessName: "",
    targetAudience: "",
    contentType: "Reels",
    duration: "1 week",
    frequency: "daily",
    details: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/content/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Content plan generated successfully!");
        navigate("/dashboard");
      } else {
        toast.error(data.message || "Failed to generate content plan");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while generating the plan");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar showbuttons={false} />
      <div className="min-h-screen bg-[#1F2028] text-white flex flex-col items-center">
        <form
          onSubmit={handleSubmit}
          className="bg-[#1F2028] shadow-2xl rounded-2xl p-10 mt-20 w-full max-w-3xl"
        >
          <h1 className="text-2xl text-center text-orange-500 font-bold mb-3">
            Create Content Plan
          </h1>
          <p className="text-gray-400 text-sm mb-5 text-center">
            Tell us about your business, and AI will create a full content plan
            with ideas, scripts, and posting schedule.
          </p>

          <div className="space-y-5">
            {/* Business Name */}
            <div>
              <label className="text-sm text-gray-400 block mb-1">
                Business Name
              </label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-2xl p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Target Audience */}
            <div>
              <label className="text-sm text-gray-400 block mb-1">
                Target Audience
              </label>
              <input
                type="text"
                name="targetAudience"
                value={formData.targetAudience}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-2xl p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Content Type */}
            <div>
              <label className="text-sm text-gray-400 block mb-1">
                Content Type
              </label>
              <select
                name="contentType"
                value={formData.contentType}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-2xl p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="Reels">Reels</option>
                <option value="Short Videos">Short Videos</option>
                <option value="Long Videos">Long Videos</option>
                <option value="Mixed">Mixed</option>
              </select>
            </div>

            {/* Duration */}
            <div>
              <label className="text-sm text-gray-400 block mb-1">
                Duration
              </label>
              <select
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-2xl p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="1 week">1 Week</option>
                <option value="2 weeks">2 Weeks</option>
                <option value="3 weeks">3 Weeks</option>
                <option value="1 month">1 Month</option>
              </select>
            </div>

            {/* Frequency */}
            <div>
              <label className="text-sm text-gray-400 block mb-1">
                Posting Frequency
              </label>
              <select
                name="frequency"
                value={formData.frequency}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-2xl p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="daily">Daily</option>
                <option value="every 2 days">Every 2 Days</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>

            {/* Additional Details */}
            <div>
              <label className="text-sm text-gray-400 block mb-1">
                Additional Details
              </label>
              <textarea
                name="details"
                value={formData.details}
                onChange={handleChange}
                rows="4"
                placeholder="Example: We offer travel packages to Bali and want to attract young travelers..."
                className="w-full bg-gray-800 border border-gray-700 rounded-2xl p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              ></textarea>
            </div>

            {/* Submit Button */}
            <Button onClick={handleSubmit} type="submit">
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
                  Generating…
                </div>
              ) : (
                <>Generate Content Plan</>
              )}
            </Button>
          </div>
        </form>

        <div className="flex-1 w-full bg-linear-to-r from-[#F3911D] to-[#840B86] rounded-t-[100px] mt-10"></div>
      </div>
    </>
  );
}
