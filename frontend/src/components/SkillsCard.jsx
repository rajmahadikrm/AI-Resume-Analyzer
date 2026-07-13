import { motion } from "framer-motion";
import {
  Brain,
  Code2,
  Database,
  Cpu,
  Wrench
} from "lucide-react";

function SkillsCard({ analysis }) {

  if (!analysis) return null;

  const getIcon = (skill) => {

    const text = skill.toLowerCase();

    if (text.includes("python")) return <Code2 size={18} />;
    if (text.includes("react")) return <Code2 size={18} />;
    if (text.includes("fastapi")) return <Cpu size={18} />;
    if (text.includes("sql")) return <Database size={18} />;
    if (text.includes("mysql")) return <Database size={18} />;
    if (text.includes("mongodb")) return <Database size={18} />;
    if (text.includes("machine")) return <Brain size={18} />;
    if (text.includes("deep")) return <Brain size={18} />;
    if (text.includes("ai")) return <Brain size={18} />;
    if (text.includes("langchain")) return <Brain size={18} />;

    return <Wrench size={18} />;
  };

  return (

    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .4 }}
      className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6"
    >

      {/* Header */}

      <div className="flex items-center gap-3 mb-6">

        <Brain
          className="text-indigo-600"
          size={28}
        />

        <div>

          <h2 className="text-2xl font-bold text-slate-800">

            Technical Skills

          </h2>

          <p className="text-sm text-gray-500">

            Skills extracted by AI

          </p>

        </div>

      </div>

      {/* Skills */}

      <div className="flex flex-wrap gap-3">

        {
          analysis.skills?.length > 0
            ? analysis.skills.map((skill, index) => (

                <motion.div
                  key={index}
                  whileHover={{
                    scale: 1.05
                  }}
                  whileTap={{
                    scale: .95
                  }}
                  className="
                    flex
                    items-center
                    gap-2
                    px-4
                    py-3
                    rounded-2xl
                    bg-gradient-to-r
                    from-blue-50
                    to-indigo-50
                    border
                    border-blue-200
                    shadow-sm
                  "
                >

                  {getIcon(skill)}

                  <span className="font-medium text-slate-700">

                    {skill}

                  </span>

                </motion.div>

              ))

            : (

                <div className="text-gray-500">

                  No skills detected.

                </div>

              )
        }

      </div>

      {/* Footer */}

      <div className="mt-8 bg-slate-50 rounded-2xl p-4 border">

        <p className="text-sm text-gray-600">

          <strong>Total Skills Detected:</strong>{" "}

          {analysis.skills?.length || 0}

        </p>

      </div>

    </motion.div>

  );

}

export default SkillsCard;