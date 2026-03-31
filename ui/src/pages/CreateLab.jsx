import { useState } from "react";
import axios from "axios";

export default function CreateLab() {

  // const user = JSON.parse(localStorage.getItem("user"));

  // if (user?.role !== "admin") {
  //   return <h1 className="text-center mt-20">Access Denied</h1>;
  // }

  const [name, setName] = useState("");
  const [type, setType] = useState("None");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      setName("");
      setType("None");

    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Error creating lab");
    }
  };

 return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-indigo-100 to-purple-200">

    <div className="bg-white p-10 rounded-3xl shadow-2xl w-[400px] border border-purple-100">

      {/* Title */}
      <h2 className="text-3xl font-bold text-purple-700 mb-2 text-center">
        Create Lab
      </h2>

      <p className="text-gray-500 text-center mb-6">
        Add a new lab to your system
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Lab Name */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
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

        {/* Lab Type */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
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

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold 
                     hover:bg-purple-700 active:scale-95 transition-all duration-200 shadow-md"
        >
          + Create Lab
        </button>

      </form>

      {/* Message */}
      {message && (
        <div
          className={`mt-5 text-center text-sm font-medium px-4 py-2 rounded-lg ${
            message.includes("success")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

    </div>
  </div>
);
}