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
    <div>
      <h1>Total Responses: {analytics.totalResponses}</h1>

      <pre>
        {JSON.stringify(analytics.summary, null, 2)}
      </pre>
    </div>
  )
}

export default Analytics