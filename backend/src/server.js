import dotenv from "dotenv"
dotenv.config()

import http from "http"
import { Server } from "socket.io"

import app from "./app.js"
import connectDB from "./config/db.js"

import socketHandler from "./socket/socket.js"


const PORT = process.env.PORT || 5000;
connectDB()

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "*",
    // methods: ["GET", "POST"],
  },
})

app.use((req, res, next) => {
  req.io = io
  next()
})

// app.get("/", (req, res) => {
//   res.send("API is running...")
// })

socketHandler(io)

// io.on("connection", (socket) => {
//   console.log("New client connected")
//   socket.on("disconnect", () => {
//     console.log("Client disconnected")
//   })
// })


server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

