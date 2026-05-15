function PollForm({
  questions,
  setQuestions,
}) {
  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        required: true,
        options: [
          { text: "" },
          { text: "" },
        ],
      },
    ])
  }

  const updateQuestion = (index, value) => {
    const updated = [...questions]

    updated[index].question = value

    setQuestions(updated)
  }

  const updateOption = (
    qIndex,
    oIndex,
    value
  ) => {
    const updated = [...questions]

    updated[qIndex].options[oIndex].text =
      value

    setQuestions(updated)
  }

  const addOption = (qIndex) => {
    const updated = [...questions]

    updated[qIndex].options.push({
      text: "",
    })

    setQuestions(updated)
  }

  return (
    <div className="space-y-8">
      {questions.map((q, qIndex) => (
        <div
          key={qIndex}
          className="bg-white p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="mb-6">
            <label className="block text-sm font-medium text-muted mb-2 ml-1">Question {qIndex + 1}</label>
            <input
              type="text"
              placeholder="What would you like to ask?"
              value={q.question}
              onChange={(e) => updateQuestion(qIndex, e.target.value)}
              className="w-full p-4 rounded-xl bg-slate-50 focus:bg-white text-lg font-medium"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-muted mb-1 ml-1">Options</label>
            {q.options.map((opt, oIndex) => (
              <div key={oIndex} className="relative group">
                <input
                  type="text"
                  placeholder={`Option ${oIndex + 1}`}
                  value={opt.text}
                  onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                  className="w-full p-3 pl-10 rounded-xl bg-slate-50 focus:bg-white border border-transparent focus:border-primary/20 transition-all"
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-slate-300 group-focus-within:bg-primary transition-colors"></div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between items-center">
            <button
              type="button"
              onClick={() => addOption(qIndex)}
              className="text-primary hover:text-primary-hover font-semibold flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-indigo-50 transition-colors"
            >
              <span className="text-xl">+</span> Add Option
            </button>

            <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-border">
              <input
                type="checkbox"
                id={`required-${qIndex}`}
                checked={q.required}
                onChange={() => {
                  const updated = [...questions]
                  updated[qIndex].required = !updated[qIndex].required
                  setQuestions(updated)
                }}
                className="w-4 h-4 text-primary rounded border-slate-300 focus:ring-primary"
              />
              <label htmlFor={`required-${qIndex}`} className="text-sm font-medium text-muted cursor-pointer">Required</label>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addQuestion}
        className="w-full py-4 rounded-2xl border-2 border-dashed border-slate-200 text-slate-500 font-bold hover:border-primary hover:text-primary hover:bg-indigo-50 transition-all flex items-center justify-center gap-2"
      >
        <span className="text-2xl">+</span> Add Question
      </button>
    </div>
  )
}

export default PollForm