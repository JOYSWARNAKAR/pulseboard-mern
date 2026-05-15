import express from "express"
import cors from "cors"

import authRoutes from "./routes/authRoutes.js"
import pollRoutes from "./routes/pollRoutes.js"
import responseRoutes from "./routes/responseRoutes.js"
import analyticsRoutes from "./routes/analyticsRoutes.js"

import User from "../models/User.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/polls", pollRoutes)
app.use("/api/responses", responseRoutes)
app.use("/api/analytics", analyticsRoutes)

export default app