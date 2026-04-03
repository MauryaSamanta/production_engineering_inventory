import { useState } from "react";
import axios from "axios";

export default function CreateLabModal({ onClose, onLabCreated }) {

  const [name, setName] = useState("");
  const [type, setType] = useState("None");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ FIX 1: validate BEFORE API call
    if (!name.trim()) {
      setMessage("❌ Lab name is required");
      return;
    }

    if (type === "None") {
      setMessage("❌ Please select a valid lab type");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/labs",
        { name, type },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setMessage("✅ Lab created successfully");

      // ✅ FIX 2: update sidebar instantly
      onLabCreated(res.data);

      // reset
      setName("");
      setType("None");

      // auto close modal
      setTimeout(() => {
        onClose();
      }, 700);

    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Error creating lab");
    }
  };

  return (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

    <div className="bg-white w-[420px] p-8 rounded-2xl shadow-2xl border border-purple-100">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-purple-700">
          Create New Lab
        </h2>

        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
        >
          ✕
        </button>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* LAB NAME */}
        <div>
          <label className="text-sm font-medium text-gray-600 mb-1 block">
            Lab Name
          </label>
          <input
            type="text"
            placeholder="Enter lab name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                       focus:ring-2 focus:ring-purple-500 focus:border-purple-500 
                       outline-none transition"
          />
        </div>

        {/* LAB TYPE */}
        <div>
          <label className="text-sm font-medium text-gray-600 mb-1 block">
            Lab Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                       focus:ring-2 focus:ring-purple-500 focus:border-purple-500 
                       outline-none transition"
          >
            <option value="None">Select Type</option>
            <option value="Class">Class</option>
            <option value="Lab">Lab</option>
            <option value="Office">Office</option>
          </select>
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 
                     text-white py-3 rounded-xl font-semibold 
                     hover:from-purple-700 hover:to-indigo-700 
                     transition shadow-md"
        >
          + Create Lab
        </button>

      </form>

      {/* MESSAGE */}
      {message && (
        <div className="mt-4 text-center text-sm text-gray-700">
          {message}
        </div>
      )}

    </div>
  </div>
);
}