import { motion } from "framer-motion";
import {
  BadgeCheck,
  Award,
  ShieldCheck
} from "lucide-react";

function CertificationCard({ analysis }) {

  if (!analysis) return null;

  const certifications = analysis.certifications || [];

  return (

    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6"
    >

      {/* Header */}

      <div className="flex items-center gap-3 mb-6">

        <Award
          size={28}
          className="text-amber-500"
        />

        <div>

          <h2 className="text-2xl font-bold text-slate-800">

            Certifications

          </h2>

          <p className="text-sm text-gray-500">

            Professional certifications detected by AI

          </p>

        </div>

      </div>

      {

        certifications.length > 0 ? (

          <div className="flex flex-wrap gap-3">

            {

              certifications.map((item, index) => (

                <motion.div

                  key={index}

                  whileHover={{
                    scale: 1.05
                  }}

                  whileTap={{
                    scale: 0.96
                  }}

                  className="
                    flex
                    items-center
                    gap-2
                    px-4
                    py-3
                    rounded-2xl
                    bg-gradient-to-r
                    from-green-50
                    to-emerald-50
                    border
                    border-green-200
                    shadow-sm
                  "

                >

                  <BadgeCheck
                    size={18}
                    className="text-green-600"
                  />

                  <span className="font-medium text-slate-700">

                    {item}

                  </span>

                </motion.div>

              ))

            }

          </div>

        ) : (

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center">

            <Award
              size={42}
              className="mx-auto text-gray-400 mb-3"
            />

            <p className="text-gray-500">

              No certifications found.

            </p>

          </div>

        )

      }

      {/* AI Insight */}

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-4">

        <div className="flex items-center gap-2 mb-2">

          <ShieldCheck
            size={20}
            className="text-blue-600"
          />

          <h3 className="font-semibold text-blue-700">

            AI Insight

          </h3>

        </div>

        <p className="text-sm text-gray-700 leading-6">

          Relevant certifications improve recruiter confidence
          and increase ATS visibility. Display industry-recognized
          certifications that match the target job role.

        </p>

      </div>

    </motion.div>

  );

}

export default CertificationCard;