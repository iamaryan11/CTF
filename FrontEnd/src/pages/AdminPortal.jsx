import React, { useState } from "react";

import axiosClient from "../utils/axiosClient";
import { Loader2, PlusCircle } from "lucide-react";
import { toast } from "react-hot-toast";

const AdminPortal = () => {
  const [formData, setFormData] = useState({
    questionNumber: "",
    title: "",
    description: "",
    imageUrl: "",
    flag: "",
    points: "",
    hint: "",
    level: "Easy",
  });

  const [loading, setLoading] = useState(false);

  // handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axiosClient.post("/letadmincook/addquestion", formData);
      toast.success(res.data || "Question added successfully!");
      setFormData({
        questionNumber: "",
        title: "",
        description: "",
        imageUrl: "",
        flag: "",
        points: "",
        hint: "",
        level: "Easy",
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to add question. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-200 flex flex-col items-center justify-center py-12 px-6">
      <div className="bg-gray-900/60 shadow-2xl rounded-2xl w-full max-w-3xl p-8 border border-red-800/40">
        <h1 className="text-4xl font-bold text-center mb-6 text-red-600 font-orbi tracking-widest">
          ADMIN PORTAL
        </h1>
        <p className="text-center text-gray-400 mb-8 font-orbi">
          Add new CTF challenges here securely.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 font-orbi tracking-wide"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="number"
              name="questionNumber"
              placeholder="Question Number"
              value={formData.questionNumber}
              onChange={handleChange}
              className="input input-bordered bg-gray-950 border-red-800 text-gray-200"
              required
            />
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              className="input input-bordered bg-gray-950 border-red-800 text-gray-200"
              required
            />
          </div>

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="textarea textarea-bordered bg-gray-950 border-red-800 text-gray-200 w-full"
            rows="4"
          ></textarea>

          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL (optional)"
            value={formData.imageUrl}
            onChange={handleChange}
            className="input input-bordered bg-gray-950 border-red-800 text-gray-200 w-full"
          />

          <textarea
            name="hint"
            placeholder="Enter the hin"
            value={formData.hint}
            onChange={handleChange}
            className="textarea textarea-bordered bg-gray-950 border-red-800 text-gray-200 w-full"
            rows="4"
          ></textarea>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="flag"
              placeholder="Flag (e.g. csa_ctf{your_flag})"
              value={formData.flag}
              onChange={handleChange}
              className="input input-bordered bg-gray-950 border-red-800 text-gray-200"
              required
            />
            <input
              type="number"
              name="points"
              placeholder="Points"
              value={formData.points}
              onChange={handleChange}
              className="input input-bordered bg-gray-950 border-red-800 text-gray-200"
              required
            />
          </div>

          <select
            name="level"
            value={formData.level}
            onChange={handleChange}
            className="select select-bordered bg-gray-950 border-red-800 text-gray-200 w-full"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <button
            type="submit"
            className="btn w-full bg-red-700 hover:bg-red-800 border-none text-white tracking-widest font-bold mt-4"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Adding Question...
              </>
            ) : (
              <>
                <PlusCircle className="w-5 h-5 mr-2" /> Add Question
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPortal;