import { motion } from "framer-motion";
import {
  Award,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  XCircle
} from "lucide-react";

function ATSCard({ analysis }) {

  if (!analysis) return null;

  const score = analysis.ats_score || 0;

  let progressColor = "bg-red-500";
  let status = "Needs Improvement";
  let icon = <XCircle className="text-red-500" size={22} />;
  let bg = "bg-red-50 border-red-200";

  if (score >= 80) {
    progressColor = "bg-green-500";
    status = "Excellent Resume";
    icon = <CheckCircle2 className="text-green-500" size={22} />;
    bg = "bg-green-50 border-green-200";
  } else if (score >= 60) {
    progressColor = "bg-yellow-500";
    status = "Good Resume";
    icon = <AlertTriangle className="text-yellow-500" size={22} />;
    bg = "bg-yellow-50 border-yellow-200";
  }

  return (

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .4 }}
      className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6"
    >

      <div className="flex items-center gap-3 mb-6">

        <Award
          className="text-yellow-500"
          size={30}
        />

        <h2 className="text-2xl font-bold text-slate-800">

          ATS Resume Score

        </h2>

      </div>

      <div className="text-center">

        <motion.div
          initial={{ scale: .8 }}
          animate={{ scale: 1 }}
          transition={{ duration: .5 }}
          className="text-6xl font-extrabold text-blue-600"
        >
          {score}
          <span className="text-3xl">%</span>
        </motion.div>

        <p className="text-gray-500 mt-2">

          Applicant Tracking Score

        </p>

      </div>

      <div className="mt-8">

        <div className="flex justify-between text-sm mb-2">

          <span>Resume Strength</span>

          <span>{score}%</span>

        </div>

        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">

          <motion.div

            initial={{ width: 0 }}

            animate={{ width: `${score}%` }}

            transition={{ duration: 1 }}

            className={`${progressColor} h-4 rounded-full`}

          />

        </div>

      </div>

      <div
        className={`mt-8 rounded-2xl border p-4 flex items-center gap-3 ${bg}`}
      >

        {icon}

        <div>

          <h3 className="font-bold">

            {status}

          </h3>

          <p className="text-sm text-gray-600">

            {score >= 80 &&
              "Your resume is well optimized for ATS systems."}

            {score >= 60 &&
              score < 80 &&
              "A few improvements can increase interview chances."}

            {score < 60 &&
              "Your resume needs significant optimization."}

          </p>

        </div>

      </div>

      <div className="mt-8 bg-slate-50 rounded-2xl p-4">

        <div className="flex items-center gap-2 mb-3">

          <TrendingUp
            size={20}
            className="text-blue-600"
          />

          <h3 className="font-semibold">

            Quick Tips

          </h3>

        </div>

        <ul className="space-y-2 text-sm text-gray-700">

          <li>✔ Add measurable achievements.</li>

          <li>✔ Include relevant job keywords.</li>

          <li>✔ Keep formatting ATS friendly.</li>

          <li>✔ Mention projects with impact.</li>

        </ul>

      </div>

    </motion.div>

  );

}

export default ATSCard;