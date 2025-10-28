import { BookOpen } from "lucide-react";
import React, { useState } from "react";
import { Card, CardContent } from "./Card";
import Button from "./Button";
import toast from "react-hot-toast";

export default function Content({ content, setContent }) {
  const [formData, setFormData] = useState({
    title: "",
    idea: "",
    script: "",
    caption: "",
    hashtags: [],
    call_to_action: "",
    visual_suggestion: "",
    content_type: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReadModal, setIsReadModal] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEditContent = async () => {
    try {
      const res = await fetch(`${API_URL}/api/content/edit/${currentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      toast.success("Content Updated Successfully");
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error updating:", err);
      setErrorMessage(err.message || "Unknown error occurred");
    }
  };

  const handleDeleteContent = async (e, id) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/content/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Something went wrong");
      }
      toast.success("Content deleted Successfully");

      setContent((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error deleting:", err);
      setErrorMessage(err.message || "Unknown error occurred");
    }
  };

  const handleOpenModal = (e, item, edit = false) => {
    e.preventDefault();
    {
      edit ? setIsModalOpen(true) : setIsReadModal(true);
    }
    setCurrentId(item.id);
    setFormData({ ...item });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCloseModal = () => {
    setIsReadModal(false);
    setIsModalOpen(false);
  };

  return (
    <div className="py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#F3911D] via-[#C94BAA] to-[#840B86] rounded-xl mb-4">
          <BookOpen className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-bold mb-2 text-white">Content Items</h2>
        <p className="text-muted-foreground text-lg">
          Manage your AI-generated content plan
        </p>
      </div>

      {/* Content List */}
      <div className="max-w-3xl mx-auto space-y-6">
        {content.map((item, index) => (
          <Card
            key={item.id || index}
            className="bg-[#1F2028]/80 border border-white/10 shadow-md hover:shadow-xl transition-all"
            onClick={(e) => handleOpenModal(e, item, false)}
          >
            <CardContent className="p-6 flex flex-col gap-4">
              <div>
                <h3 className="text-xl font-semibold text-white mb-1 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#F3911D]" /> {item.title}
                </h3>
                <p className="text-gray-400 text-sm mb-1"> Idea: {item.idea}</p>
                {item.script && (
                  <p className="text-gray-500 text-sm mb-1">
                    Script: {item.script}
                  </p>
                )}
                {item.caption && (
                  <p className="text-gray-400 text-sm mb-1">
                    Caption: {item.caption}
                  </p>
                )}
                {item.hashtags?.length > 0 && (
                  <p className="text-gray-500 text-sm mb-1">
                    Hashtags: {item.hashtags.join(", ")}
                  </p>
                )}
                {item.call_to_action && (
                  <p className="text-gray-400 text-sm">
                    CTA: {item.call_to_action}
                  </p>
                )}
                {item.visual_suggestion && (
                  <p className="text-gray-500 text-sm">
                    Visual: {item.visual_suggestion}
                  </p>
                )}
              </div>
              <div className="flex gap-3">
                <button onClick={(e) => handleOpenModal(e, item, true)}>
                  Edit
                </button>
                <button onClick={(e) => handleDeleteContent(e, item.id)}>
                  Delete
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm overflow-auto py-10">
          <div className="relative bg-[#1F2028] text-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md border border-white/10 my-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-6  top-0 pb-2 z-10">
              <h2 className="text-xl sm:text-2xl font-bold bg-linear-to-r from-[#F3911D] via-[#C94BAA] to-[#840B86] bg-clip-text text-transparent">
                ✏️ Edit Content
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <form className="space-y-4">
              {[
                { label: "Title", name: "title", type: "text" },
                { label: "Idea", name: "idea", type: "textarea" },
                { label: "Script", name: "script", type: "textarea" },
                { label: "Caption", name: "caption", type: "textarea" },
                { label: "Hashtags", name: "hashtags", type: "text" },
                { label: "CTA", name: "call_to_action", type: "text" },
                {
                  label: "Visual Suggestion",
                  name: "visual_suggestion",
                  type: "text",
                },
                { label: "Content Type", name: "content_type", type: "text" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    {field.label}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      rows="3"
                      className="w-full bg-[#2A2B36] border border-gray-700 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#F3911D] text-gray-100 placeholder-gray-500"
                    />
                  ) : (
                    <input
                      type="text"
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="w-full bg-[#2A2B36] border border-gray-700 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#F3911D] text-gray-100 placeholder-gray-500"
                      placeholder={`Enter ${field.label.toLowerCase()}...`}
                    />
                  )}
                </div>
              ))}

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row justify-end sm:space-x-3 gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2.5 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-all"
                >
                  Cancel
                </button>
                <Button onClick={handleEditContent}>Save Changes</Button>
              </div>
            </form>

            {errorMessage && (
              <p className="text-red-400 text-sm mt-2">{errorMessage}</p>
            )}
          </div>
        </div>
      )}
      {/* Read Modal */}
      {isReadModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center backdrop-blur-md overflow-auto py-10">
          <div className="relative bg-[#f2028] text-white p-6 rounded-2xl sm:p-8 border-2 w-[85%] my-auto">
            <div className="border-b">
              <h1 className="text-center text-2xl sm:text-3xl font-bold bg-linear-to-r from-[#F3911D] to-[#840B86] text-transparent bg-clip-text p-10">
                Content Details
              </h1>
            </div>

            <div className="my-10">
              <h3 className="font-bold text-orange-500 text-lg">Title:</h3>
              <p>{formData.title}</p>

              <h3 className="font-bold text-orange-500 text-lg">Idea:</h3>
              <p>{formData.idea}</p>

              <h3 className="font-bold text-orange-500 text-lg">Script:</h3>
              <p>{formData.script}</p>

              <h3 className="font-bold text-orange-500 text-lg">Caption:</h3>
              <p>{formData.caption}</p>

              <h3 className="font-bold text-orange-500 text-lg">Hashtags:</h3>
              <p className="break-all">{formData.hashtags}</p>

              <h3 className="font-bold text-orange-500 text-lg">CTA:</h3>
              <p>{formData.call_to_action}</p>

              <h3 className="font-bold text-orange-500 text-lg">Visuals:</h3>
              <p>{formData.visual_suggestion}</p>
            </div>
            <div className="flex flex-col sm:flex-row justify-end sm:space-x-3 gap-3 pt-4">
              <button
                type="button"
                onClick={handleCloseModal}
                className="px-4 py-2.5 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
