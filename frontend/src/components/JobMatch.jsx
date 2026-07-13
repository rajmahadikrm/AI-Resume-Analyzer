import { useState } from "react";
import api from "../services/api";

function JobMatch() {
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeJob = async () => {
    if (!jobDescription.trim()) {
      alert("Please enter the Job Description.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/job-match", {
        job_description: jobDescription,
      });

      setResult(response.data.result);
    } catch (error) {
      console.error(error);
      alert("Job Match Failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-xl font-bold mb-5">
        📄 Resume vs Job Description
      </h2>

      <textarea
        rows={8}
        placeholder="Paste Job Description here..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        className="w-full border rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={analyzeJob}
        disabled={loading}
        className="mt-5 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl"
      >
        {loading ? "Analyzing..." : "Analyze Match"}
      </button>

      {result && (
        <div className="mt-8 space-y-6">

          {/* Match Score */}
          <div className="bg-blue-50 rounded-xl p-5">

            <h3 className="font-bold text-lg">
              ⭐ Match Score
            </h3>

            <div className="text-5xl font-bold text-blue-600 mt-3">
              {result.match_score}%
            </div>

          </div>

          {/* Matched Skills */}
          <div>

            <h3 className="font-bold mb-3">
              ✅ Matching Skills
            </h3>

            <div className="flex flex-wrap gap-2">

              {result.matched_skills?.map((skill, index) => (
                <span
                  key={index}
                  className="bg-green-100 text-green-700 px-3 py-2 rounded-full"
                >
                  {skill}
                </span>
              ))}

            </div>

          </div>

          {/* Missing Skills */}
          <div>

            <h3 className="font-bold mb-3">
              ❌ Missing Skills
            </h3>

            <div className="flex flex-wrap gap-2">

              {result.missing_skills?.map((skill, index) => (
                <span
                  key={index}
                  className="bg-red-100 text-red-700 px-3 py-2 rounded-full"
                >
                  {skill}
                </span>
              ))}

            </div>

          </div>

          {/* Recommendations */}
          <div>

            <h3 className="font-bold mb-3">
              💡 Recommendations
            </h3>

            <ul className="space-y-2">

              {result.recommendations?.map((item, index) => (
                <li
                  key={index}
                  className="bg-gray-100 rounded-xl p-3"
                >
                  ✔ {item}
                </li>
              ))}

            </ul>

          </div>

        </div>
      )}

    </div>
  );
}

export default JobMatch;