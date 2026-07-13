import { motion } from "framer-motion";
import { FileText, Sparkles, CheckCircle2 } from "lucide-react";

function SummaryCard({ analysis }) {

  if (!analysis) return null;

  return (

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6"
    >

      {/* Header */}

      <div className="flex items-center gap-3 mb-6">

        <FileText
          className="text-blue-600"
          size={28}
        />

        <div>

          <h2 className="text-2xl font-bold text-slate-800">
            AI Resume Summary
          </h2>

          <p className="text-gray-500 text-sm">
            Generated using Retrieval-Augmented Generation (RAG)
          </p>

        </div>

      </div>

      {/* Summary */}

      <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">

        <div className="flex items-center gap-2 mb-3">

          <Sparkles
            size={20}
            className="text-yellow-500"
          />

          <h3 className="font-semibold text-slate-800">
            Professional Summary
          </h3>

        </div>

        <p className="text-gray-700 leading-8 text-justify">

          {analysis.summary}

        </p>

      </div>

      {/* Strength Section */}

      <div className="mt-6">

        <div className="flex items-center gap-2 mb-4">

          <CheckCircle2
            className="text-green-600"
            size={22}
          />

          <h3 className="font-semibold text-slate-800">
            Resume Highlights
          </h3>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

          <div className="bg-green-50 border border-green-200 rounded-xl p-3">
            ✅ AI Generated Summary
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
            📄 Resume Parsed Successfully
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-xl p-3">
            🤖 Powered by LangChain + Groq
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
            🎯 ATS Ready Analysis
          </div>

        </div>

      </div>

    </motion.div>

  );

}

export default SummaryCard;