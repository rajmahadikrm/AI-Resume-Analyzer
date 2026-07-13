function QuickActions() {
  const handleClick = (feature) => {
    alert(
      `${feature} feature will be connected to the AI chat in the next upgrade.`
    );
  };

  return (
    <div className="card">
      <h2>⚡ Quick Actions</h2>

      <div className="quick-actions">
        <button onClick={() => handleClick("Summary")}>
          📝 Summary
        </button>

        <button onClick={() => handleClick("Skills")}>
          🛠 Skills
        </button>

        <button onClick={() => handleClick("Projects")}>
          💼 Projects
        </button>

        <button onClick={() => handleClick("Education")}>
          🎓 Education
        </button>

        <button onClick={() => handleClick("Certifications")}>
          📜 Certifications
        </button>

        <button onClick={() => handleClick("ATS Score")}>
          ⭐ ATS Score
        </button>
      </div>
    </div>
  );
}

export default QuickActions;