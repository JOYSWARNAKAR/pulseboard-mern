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
    <div>
      <h1>{poll.title}</h1>

      {poll.questions.map((q) => (
        <div key={q._id}>
          <h3>{q.question}</h3>

          {q.options.map((opt) => (
            <div key={opt._id}>
              <input
                type="radio"
                name={q._id}
                value={opt.text}
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

              {opt.text}
            </div>
          ))}
        </div>
      ))}

      <button onClick={submitResponse}>
        Submit
      </button>
    </div>
  )
}

export default PublicPoll