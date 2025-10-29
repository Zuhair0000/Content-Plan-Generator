import React from "react";

export default function ContentDetalsModal({ item, handleCloseModal }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md flex justify-center items-center overflow-auto py-10">
      <div className="relative text-white p-6 sm:p8 rounded-2xl border-2 w-[85%] my-auto">
        <div className="border-b">
          <h1 className="text-center text-2xl sm:text-3xl font-bold bg-linear-to-r from-[#F3911D] to-[#840B86] text-transparent bg-clip-text p-10">
            Content Details
          </h1>
        </div>

        <div className="my-10">
          <h3 className="font-bold text-orange-500 text-lg">Title:</h3>
          <p>{item.title}</p>

          <h3 className="font-bold text-orange-500 text-lg">Idea:</h3>
          <p>{item.idea}</p>

          <h3 className="font-bold text-orange-500 text-lg">Script:</h3>
          <p>{item.script}</p>

          <h3 className="font-bold text-orange-500 text-lg">Caption:</h3>
          <p>{item.caption}</p>

          <h3 className="font-bold text-orange-500 text-lg">Hashtags:</h3>
          <p className="break-all">{item.hashtags}</p>

          <h3 className="font-bold text-orange-500 text-lg">CTA:</h3>
          <p>{item.call_to_action}</p>

          <h3 className="font-bold text-orange-500 text-lg">Visuals:</h3>
          <p>{item.visual_suggestion}</p>
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
  );
}
