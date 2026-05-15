import { useState } from "react"

import API from "../api/axios"

import Navbar from "../components/Navbar"
import PollForm from "../components/PollForm"

function CreatePoll() {
  const [title, setTitle] = useState("")

  const [questions, setQuestions] =
    useState([
      {
        question: "",
        required: true,
        options: [
          { text: "" },
          { text: "" },
        ],
      },
    ])

  const createPoll = async () => {
    try {
      const res = await API.post("/polls", {
        title,
        anonymous: true,
        expiresAt: "2026-12-31",
        questions,
      })

      alert("Poll Created")

      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Navbar />

      <div className="max-w-4xl mx-auto p-10">
        <h1 className="text-4xl font-bold mb-6">
          Create Poll
        </h1>

        <input
          type="text"
          placeholder="Poll Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="w-full p-4 rounded text-black mb-6"
        />

        <PollForm
          questions={questions}
          setQuestions={setQuestions}
        />

        <button
          onClick={createPoll}
          className="mt-8 bg-purple-600 px-6 py-3 rounded"
        >
          Create Poll
        </button>
      </div>
    </div>
  )
}

export default CreatePoll