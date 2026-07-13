import { motion } from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  School,
  CheckCircle2
} from "lucide-react";

function EducationCard({ analysis }) {

  if (!analysis) return null;

  const education = analysis.education || [];

  return (

    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6"
    >

      {/* Header */}

      <div className="flex items-center gap-3 mb-6">

        <GraduationCap
          size={28}
          className="text-indigo-600"
        />

        <div>

          <h2 className="text-2xl font-bold text-slate-800">
            Education
          </h2>

          <p className="text-sm text-gray-500">
            AI extracted academic information
          </p>

        </div>

      </div>

      {
        education.length > 0 ? (

          <div className="space-y-4">

            {

              education.map((item, index) => (

                <motion.div

                  key={index}

                  whileHover={{
                    scale: 1.02
                  }}

                  className="
                    bg-gradient-to-r
                    from-indigo-50
                    to-blue-50
                    border
                    border-indigo-200
                    rounded-2xl
                    p-5
                  "

                >

                  <div className="flex gap-3">

                    <School
                      className="text-indigo-600 mt-1"
                      size={22}
                    />

                    <div>

                      <h3 className="font-semibold text-slate-800">

                        Academic Qualification

                      </h3>

                      <p className="mt-2 text-gray-700 leading-7">

                        {item}

                      </p>

                    </div>

                  </div>

                </motion.div>

              ))

            }

          </div>

        ) : (

          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 text-center">

            <BookOpen
              size={42}
              className="mx-auto text-gray-400 mb-3"
            />

            <p className="text-gray-500">

              No education information found.

            </p>

          </div>

        )

      }

      {/* Footer */}

      <div className="mt-6 bg-green-50 border border-green-200 rounded-2xl p-4">

        <div className="flex items-center gap-2 mb-2">

          <CheckCircle2
            size={20}
            className="text-green-600"
          />

          <h3 className="font-semibold text-green-700">

            AI Insight

          </h3>

        </div>

        <p className="text-sm text-gray-700">

          Recruiters often review education along with
          certifications and projects. Keeping academic
          details complete helps improve your overall profile.

        </p>

      </div>

    </motion.div>

  );

}

export default EducationCard;