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
    <div className="min-h-screen bg-surface">
      <Navbar />

      <main className="max-w-4xl mx-auto p-6 md:p-12">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent inline-block">
            Create a New Poll
          </h1>
          <p className="text-subtle">Fill in the details below to launch your real-time survey.</p>
        </header>

        <div className="bg-card p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-border">
          <div className="mb-8">
            <label className="block text-sm font-semibold text-subtle mb-2 ml-1 uppercase tracking-wider">Poll Title</label>
            <input
              type="text"
              placeholder="e.g., Weekly Team Synchronisation"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-5 rounded-2xl bg-slate-50 focus:bg-white text-xl font-bold"
            />
          </div>

          <PollForm
            questions={questions}
            setQuestions={setQuestions}
          />

          <div className="mt-12 flex justify-center">
            <button
              onClick={createPoll}
              className="bg-primary hover:bg-primary-hover text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 transition-all active:scale-95"
            >
              Launch Poll Now
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default CreatePoll