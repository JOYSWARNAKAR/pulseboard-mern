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
    <div className="space-y-6">
      {questions.map((q, qIndex) => (
        <div
          key={qIndex}
          className="bg-slate-800 p-5 rounded-xl"
        >
          <input
            type="text"
            placeholder="Question"
            value={q.question}
            onChange={(e) =>
              updateQuestion(
                qIndex,
                e.target.value
              )
            }
            className="w-full p-3 rounded text-black mb-4"
          />

          <div className="space-y-2">
            {q.options.map((opt, oIndex) => (
              <input
                key={oIndex}
                type="text"
                placeholder={`Option ${
                  oIndex + 1
                }`}
                value={opt.text}
                onChange={(e) =>
                  updateOption(
                    qIndex,
                    oIndex,
                    e.target.value
                  )
                }
                className="w-full p-3 rounded text-black"
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => addOption(qIndex)}
            className="mt-3 bg-blue-600 px-4 py-2 rounded"
          >
            Add Option
          </button>

          <div className="mt-4 flex items-center gap-2">
            <input
              type="checkbox"
              checked={q.required}
              onChange={() => {
                const updated = [...questions]

                updated[qIndex].required =
                  !updated[qIndex].required

                setQuestions(updated)
              }}
            />

            <label>Required</label>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addQuestion}
        className="bg-green-600 px-5 py-3 rounded"
      >
        Add Question
      </button>
    </div>
  )
}

export default PollForm