const connectedUsers = new Map()

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`)

    // Join poll room
    socket.on("join-poll", (pollId) => {
      socket.join(pollId)

      console.log(`Socket ${socket.id} joined poll ${pollId}`)
    })

    // Leave poll room
    socket.on("leave-poll", (pollId) => {
      socket.leave(pollId)

      console.log(`Socket ${socket.id} left poll ${pollId}`)
    })

    // Track active users
    connectedUsers.set(socket.id, true)

    io.emit("active-users", connectedUsers.size)

    // Disconnect
    socket.on("disconnect", () => {
      console.log(`Disconnected: ${socket.id}`)

      connectedUsers.delete(socket.id)

      io.emit("active-users", connectedUsers.size)
    })
  })
}

export default socketHandler