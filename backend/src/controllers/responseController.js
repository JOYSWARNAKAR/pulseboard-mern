import Poll from "../models/Poll.js"

import Response from "../models/Response.js"



export const submitResponse = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.pollId)

    if (!poll) {
      return res.status(404).json({ message: "Poll not found" })
    }

    if (new Date() > poll.expiresAt) {
      return res.status(400).json({ message: "Poll expired" })
    }

    const response = await Response.create({
      pollId: poll._id,
      userId: poll.anonymous ? null : req.user?.id,
      answers: req.body.answers,
    })

    req.io.emit("new-response", {
      pollId: poll._id,
    })

    res.status(201).json(response)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}