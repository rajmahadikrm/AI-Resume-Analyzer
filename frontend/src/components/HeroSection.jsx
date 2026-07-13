function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 rounded-3xl text-white p-10 shadow-xl mb-8">

      <div className="max-w-5xl">

        <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
          🚀 AI Powered Resume Analysis Platform
        </span>

        <h1 className="text-5xl font-bold mt-6 leading-tight">
          Analyze Your Resume
          <br />
          Using Artificial Intelligence
        </h1>

        <p className="mt-6 text-lg text-blue-100 max-w-3xl">
          Upload your resume and instantly get an ATS score, AI-powered resume
          analysis, skill extraction, career suggestions, resume-vs-job matching,
          and an intelligent chatbot built with RAG.
        </p>

        <div className="flex flex-wrap gap-4 mt-8">

          <span className="bg-green-500 px-4 py-2 rounded-full">
            ⭐ ATS Score
          </span>

          <span className="bg-green-500 px-4 py-2 rounded-full">
            💬 AI Chat
          </span>

          <span className="bg-green-500 px-4 py-2 rounded-full">
            📄 Resume Summary
          </span>

          <span className="bg-green-500 px-4 py-2 rounded-full">
            🎯 Resume vs JD
          </span>

          <span className="bg-green-500 px-4 py-2 rounded-full">
            📥 PDF Report
          </span>

        </div>

      </div>

    </section>
  );
}

export default HeroSection;