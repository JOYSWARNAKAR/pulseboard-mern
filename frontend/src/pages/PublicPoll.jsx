import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import API from "../api/axios"

function PublicPoll() {
  const { id } = useParams()

  const [poll, setPoll] = useState(null)
  const [answers, setAnswers] = useState([])

  useEffect(() => {
    fetchPoll()
  }, [])

  const fetchPoll = async () => {
    const res = await API.get(`/polls/${id}`)
    setPoll(res.data)
  }

  const submitResponse = async () => {
    await API.post(`/responses/${id}`, {
      answers,
    })

    alert("Submitted")
  }

  if (!poll) return <h1>Loading...</h1>

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 flex justify-center">
      <div className="max-w-2xl w-full">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold text-main mb-2">
            {poll.title}
          </h1>
          <p className="text-muted">Please answer the questions below</p>
        </header>

        <div className="space-y-6">
          {poll.questions.map((q, qIdx) => (
            <div key={q._id} className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-border">
              <h3 className="text-xl font-bold mb-6 text-slate-800 flex gap-3">
                <span className="text-primary opacity-50">{qIdx + 1}.</span>
                {q.question}
              </h3>

              <div className="grid gap-3">
                {q.options.map((opt) => {
                  const isSelected = answers.find(a => a.questionId === q._id)?.selectedOption === opt.text;
                  return (
                    <label 
                      key={opt._id}
                      className={`
                        relative flex items-center p-4 rounded-2xl border-2 cursor-pointer transition-all
                        ${isSelected 
                          ? 'border-primary bg-indigo-50 ring-1 ring-primary' 
                          : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                        }
                      `}
                    >
                      <input
                        type="radio"
                        name={q._id}
                        value={opt.text}
                        className="sr-only" // Hide default radio
                        onChange={() => {
                          setAnswers((prev) => [
                            ...prev.filter((a) => a.questionId !== q._id),
                            {
                              questionId: q._id,
                              selectedOption: opt.text,
                            },
                          ])
                        }}
                      />
                      <div className={`
                        w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center transition-all
                        ${isSelected ? 'border-primary bg-primary' : 'border-slate-300 bg-white'}
                      `}>
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white"></div>}
                      </div>
                      <span className={`font-medium ${isSelected ? 'text-primary' : 'text-slate-600'}`}>
                        {opt.text}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center pb-20">
          <button 
            onClick={submitResponse}
            className="bg-primary hover:bg-primary-hover text-white px-12 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 transition-all active:scale-95"
          >
            Submit Responses
          </button>
        </div>
      </div>
    </div>
  )
}

export default PublicPoll