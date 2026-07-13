import { useState } from "react";
import { Upload, FileText, LoaderCircle, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import api from "../services/api";

function UploadResume({ setAnalysis }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const uploadResume = async () => {
    if (!file) {
      alert("Please select a PDF resume.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setMessage("");

      // Upload Resume
      const uploadResponse = await api.post(
        "/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage(uploadResponse.data.message);

      // Analyze Resume
      const analysisResponse = await api.post("/analyze");

      setAnalysis(analysisResponse.data.analysis);

    } catch (error) {
      console.error(error);
      alert("Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <Upload className="text-blue-600" size={28} />
        <h2 className="text-2xl font-bold text-slate-800">
          Upload Resume
        </h2>
      </div>

      <label
        htmlFor="resume-upload"
        className="cursor-pointer block border-2 border-dashed border-blue-300 hover:border-blue-500 bg-blue-50 rounded-2xl p-10 text-center transition"
      >
        <Upload
          size={50}
          className="mx-auto text-blue-600 mb-4"
        />

        <h3 className="text-lg font-semibold text-slate-700">
          Drag & Drop Resume
        </h3>

        <p className="text-gray-500 mt-2">
          or Click to Browse
        </p>

        <p className="text-sm text-gray-400 mt-1">
          PDF files only
        </p>

        <input
          id="resume-upload"
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={(e) => {
            if (e.target.files.length > 0) {
              setFile(e.target.files[0]);
            }
          }}
        />
      </label>

      {file && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3"
        >
          <FileText className="text-green-600" />

          <div>
            <p className="font-semibold">
              Selected File
            </p>

            <p className="text-sm text-gray-600">
              {file.name}
            </p>
          </div>
        </motion.div>
      )}

      <button
        onClick={uploadResume}
        disabled={loading}
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl font-semibold flex justify-center items-center gap-2 disabled:opacity-70"
      >
        {loading ? (
          <>
            <LoaderCircle className="animate-spin" size={20} />
            Analyzing Resume...
          </>
        ) : (
          <>
            <Upload size={20} />
            Analyze Resume
          </>
        )}
      </button>

      {message && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-5 bg-green-100 border border-green-300 rounded-xl p-4 flex items-center gap-3"
        >
          <CheckCircle2 className="text-green-600" />

          <span className="text-green-800 font-medium">
            {message}
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}

export default UploadResume;