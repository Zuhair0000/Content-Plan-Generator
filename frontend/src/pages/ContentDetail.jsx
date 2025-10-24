// src/pages/ContentDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Card, CardContent } from "../components/Card";
import Schedule from "../components/Schedule";
import Content from "../components/Content";

export default function ContentDetail() {
  const [activeTab, setActiveTab] = useState("content");
  const [contentItems, setContentItems] = useState([]);
  const [schedule, setSchedule] = useState({});
  const { id } = useParams();
  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch(`${API_URL}/api/content/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();

        const contentArray = Array.isArray(data.content)
          ? data.content
          : data.content?.content || [];
        setContentItems(contentArray);
        setSchedule(data.schedule || {});
      } catch (err) {
        console.error("Error fetching content:", err);
      }
    };

    fetchContent();
  }, [API_URL, id, token]);

  return (
    <>
      <Navbar showbuttons={false} />
      <div className="min-h-screen bg-[#1F2028] flex flex-col items-center text-white px-6 py-20">
        <h1 className="text-3xl font-bold text-orange-500 mb-6">
          Content Plan Details
        </h1>

        {/* Tabs */}
        <div className="flex space-x-10 border-b border-gray-700 mb-6">
          {["content", "schedule"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`capitalize pb-2 ${
                activeTab === tab
                  ? "text-orange-500 border-b-2 border-orange-500"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "content" && (
          <Content content={contentItems} setContent={setContentItems} />
        )}

        {activeTab === "schedule" && (
          <Schedule schedule={schedule} content={contentItems} />
        )}
      </div>
    </>
  );
}
