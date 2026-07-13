import { useState } from "react";

import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";

import UploadResume from "../components/UploadResume";
import ATSCard from "../components/ATSCard";

import SummaryCard from "../components/SummaryCard";
import SkillsCard from "../components/SkillsCard";
import ExperienceCard from "../components/ExperienceCard";
import EducationCard from "../components/EducationCard";
import CertificationCard from "../components/CertificationCard";
import SuggestionCard from "../components/SuggestionCard";

import ChatBox from "../components/ChatBox";

function Home() {

    const [analysis, setAnalysis] = useState(null);

    return (

        <>

            <Navbar />

            <HeroSection />

            <div className="bg-slate-100 min-h-screen">

                <div className="max-w-7xl mx-auto px-6 py-10">

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* LEFT SIDEBAR */}

                        <div className="space-y-6">

                            <section id="upload">

                                <UploadResume
                                    setAnalysis={setAnalysis}
                                />

                            </section>

                            <section id="ats">

                                <ATSCard
                                    analysis={analysis}
                                />

                            </section>

                        </div>

                        {/* RIGHT CONTENT */}

                        <div className="lg:col-span-2 space-y-6">

                            <section id="summary">

                                <SummaryCard
                                    analysis={analysis}
                                />

                            </section>

                            <section id="skills">

                                <SkillsCard
                                    analysis={analysis}
                                />

                            </section>

                            <section id="experience">

                                <ExperienceCard
                                    analysis={analysis}
                                />

                            </section>

                            <section id="education">

                                <EducationCard
                                    analysis={analysis}
                                />

                            </section>

                            <section id="certifications">

                                <CertificationCard
                                    analysis={analysis}
                                />

                            </section>

                            <section id="suggestions">

                                <SuggestionCard
                                    analysis={analysis}
                                />

                            </section>

                            <section id="chat">

                                <ChatBox />

                            </section>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

}

export default Home;