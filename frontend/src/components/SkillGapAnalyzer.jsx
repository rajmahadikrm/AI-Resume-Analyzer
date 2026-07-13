import { useState } from "react";
import api from "../services/api";

function SkillGapAnalyzer() {

    const [jobDescription, setJobDescription] = useState("");

    const [result, setResult] = useState(null);

    const [loading, setLoading] = useState(false);

    const analyze = async () => {

        if (!jobDescription.trim()) {

            alert("Please enter Job Description.");

            return;

        }

        try {

            setLoading(true);

            const response = await api.post(

                "/skill-gap",

                {

                    job_description: jobDescription

                }

            );

            setResult(response.data.result);

        }

        catch (error) {

            console.log(error);

            alert("Analysis Failed");

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="bg-white rounded-2xl shadow-lg p-6">

            <h2 className="text-2xl font-bold mb-5">

                🎯 AI Skill Gap Analyzer

            </h2>

            <textarea

                rows={8}

                className="w-full border rounded-xl p-4 resize-none"

                placeholder="Paste Job Description..."

                value={jobDescription}

                onChange={(e)=>setJobDescription(e.target.value)}

            />

            <button

                onClick={analyze}

                className="mt-5 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl"

            >

                {

                    loading

                    ?

                    "Analyzing..."

                    :

                    "Analyze Career Match"

                }

            </button>

            {

                result && (

                    <>

                    <div className="mt-8 bg-blue-50 rounded-xl p-5">

                        <h3 className="font-bold">

                            🎯 Recommended Role

                        </h3>

                        <p className="text-3xl font-bold text-blue-600 mt-3">

                            {result.recommended_role}

                        </p>

                    </div>

                    <div className="mt-5 bg-green-50 rounded-xl p-5">

                        <h3 className="font-bold">

                            ⭐ Match Score

                        </h3>

                        <p className="text-5xl font-bold text-green-600 mt-3">

                            {result.match_score}%

                        </p>

                    </div>

                    </>

                )

            }

        </div>

    );

}

export default SkillGapAnalyzer;