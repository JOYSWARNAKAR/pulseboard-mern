import { useEffect, useState } from "react"

import { useParams } from "react-router-dom"

import API from "../api/axios"

function PublishedResults() {
  const { id } = useParams()

  const [analytics, setAnalytics] =
    useState(null)

  useEffect(() => {
    fetchResults()
  }, [])

  const fetchResults = async () => {
    try {
      const res = await API.get(
        `/analytics/${id}`
      )

      setAnalytics(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  if (!analytics) {
    return (
      <h1 className="text-center mt-10">
        Loading...
      </h1>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-10">
      <h1 className="text-4xl font-bold mb-8">
        Published Results
      </h1>

      <h2 className="text-2xl mb-6">
        Total Responses:
        {analytics.totalResponses}
      </h2>

      <div className="space-y-6">
        {Object.entries(
          analytics.summary
        ).map(([questionId, options]) => (
          <div
            key={questionId}
            className="bg-slate-800 p-5 rounded-xl"
          >
            <h3 className="font-bold mb-4">
              Question ID:
              {questionId}
            </h3>

            {Object.entries(options).map(
              ([option, count]) => (
                <div
                  key={option}
                  className="flex justify-between mb-2"
                >
                  <span>{option}</span>

                  <span>{count} votes</span>
                </div>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default PublishedResults