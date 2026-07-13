import { motion } from "framer-motion";
import {
  Briefcase,
  Calendar,
  Clock,
  CheckCircle2,
} from "lucide-react";

function ExperienceCard({ analysis }) {

  if (!analysis) return null;

  const experience = analysis.experience || {};

  const years = experience.years || "Not Available";
  const details =
    experience.details ||
    "No professional experience information found in the uploaded resume.";

  return (

    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6"
    >

      {/* Header */}

      <div className="flex items-center gap-3 mb-6">

        <Briefcase
          className="text-blue-600"
          size={28}
        />

        <div>

          <h2 className="text-2xl font-bold text-slate-800">
            Work Experience
          </h2>

          <p className="text-sm text-gray-500">
            AI extracted professional experience
          </p>

        </div>

      </div>

      {/* Experience Card */}

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 p-5">

        <div className="flex items-center gap-3">

          <Clock
            size={22}
            className="text-blue-600"
          />

          <div>

            <p className="text-sm text-gray-500">
              Total Experience
            </p>

            <h3 className="text-4xl font-bold text-blue-700">

              {years}

            </h3>

          </div>

        </div>

      </div>

      {/* Details */}

      <div className="mt-6">

        <div className="flex items-center gap-2 mb-3">

          <Calendar
            size={20}
            className="text-indigo-600"
          />

          <h3 className="font-semibold text-slate-800">

            Experience Details

          </h3>

        </div>

        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5">

          <p className="text-gray-700 leading-8 whitespace-pre-line">

            {details}

          </p>

        </div>

      </div>

      {/* Career Insight */}

      <div className="mt-6 bg-green-50 border border-green-200 rounded-2xl p-4">

        <div className="flex items-center gap-2 mb-2">

          <CheckCircle2
            size={20}
            className="text-green-600"
          />

          <h3 className="font-semibold text-green-700">

            AI Career Insight

          </h3>

        </div>

        <p className="text-sm text-gray-700">

          Experience plays a major role in ATS ranking.
          Highlight measurable achievements, technologies
          used, and business impact to improve interview
          opportunities.

        </p>

      </div>

    </motion.div>

  );

}

export default ExperienceCard;