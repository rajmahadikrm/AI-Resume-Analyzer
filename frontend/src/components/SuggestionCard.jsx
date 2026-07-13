function SuggestionCard({ analysis }) {

  if (!analysis) return null;

  return (

    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-xl font-bold mb-5">

        💡 AI Suggestions

      </h2>

      <ul className="space-y-3">

        {
          analysis.suggestions?.map((item, index) => (

            <li
              key={index}
              className="bg-gray-100 rounded-xl p-3"
            >

              ✅ {item}

            </li>

          ))
        }

      </ul>

    </div>

  );

}

export default SuggestionCard;