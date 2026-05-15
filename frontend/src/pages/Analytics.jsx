import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import API from "../api/axios"
import socket from "../socket/socket"

function Analytics() {
  const { id } = useParams()

  const [analytics, setAnalytics] = useState(null)

  useEffect(() => {
    fetchAnalytics()

    socket.on("new-response", () => {
      fetchAnalytics()
    })

    return () => {
      socket.off("new-response")
    }
  }, [])

  const fetchAnalytics = async () => {
    const res = await API.get(`/analytics/${id}`)
    setAnalytics(res.data)
  }

  if (!analytics) return <h1>Loading...</h1>

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto p-6 md:p-12">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-main mb-2">Live Analytics</h1>
            <p className="text-muted text-lg">Real-time data for your poll</p>
          </div>
          <div className="bg-white px-8 py-4 rounded-3xl shadow-sm border border-border text-center">
            <span className="block text-sm font-bold text-muted uppercase tracking-widest mb-1">Total Responses</span>
            <span className="text-4xl font-black text-primary">{analytics.totalResponses}</span>
          </div>
        </header>

        <div className="grid gap-8">
          {Object.entries(analytics.summary).map(([question, options]) => (
            <div key={question} className="bg-card p-8 rounded-3xl shadow-sm border border-border">
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
                        <span className="text-sm font-bold text-primary bg-indigo-50 px-3 py-1 rounded-full">{count} votes ({percentage}%)</span>
                      </div>
                      <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Analytics