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
    <div className="min-h-screen bg-background p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
            Poll Results
          </h1>
          <div className="inline-flex items-center gap-2 bg-white px-6 py-2 rounded-full border border-border shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-sm font-bold text-muted uppercase tracking-widest">Final Count: {analytics.totalResponses} Responses</span>
          </div>
        </header>

        <div className="grid gap-6">
          {Object.entries(analytics.summary).map(([question, options]) => (
            <div key={question} className="bg-white p-8 rounded-3xl shadow-sm border border-border">
              <h3 className="text-xl font-bold mb-8 text-slate-800">{question}</h3>
              
              <div className="space-y-6">
                {Object.entries(options).map(([option, count]) => {
                  const percentage = analytics.totalResponses > 0 
                    ? Math.round((count / analytics.totalResponses) * 100) 
                    : 0;
                  
                  return (
                    <div key={option}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-slate-700">{option}</span>
                        <span className="text-sm font-bold text-primary">{percentage}%</span>
                      </div>
                      <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full transition-all duration-1000"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <p className="text-right text-xs text-muted mt-1 font-medium">{count} votes</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        
        <footer className="mt-20 text-center">
          <p className="text-muted text-sm italic">Thank you for participating in this poll.</p>
        </footer>

      </div>
    </div>
  )
}

export default PublishedResults