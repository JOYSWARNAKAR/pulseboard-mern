// const Poll = require("../models/Poll")
import Poll from "../models/Poll.js"
exports.createPoll = async (req, res) => {
    try {
    const poll = await Poll.create({
        ...req.body,
        creator: req.user.id,
    })
    

    res.status(201).json(poll)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getPoll = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id)

    if (!poll) {
      return res.status(404).json({ message: "Poll not found" })
    }

    res.json(poll)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.publishResults = async (req, res) => {
  const poll = await Poll.findById(req.params.id)

  poll.published = true

  await poll.save()

  res.json({ message: "Results published" })
}