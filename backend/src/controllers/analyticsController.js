
import Response from "../models/Response.js"
import express from "express"

const router = express.Router()

export const getAnalytics = async (req, res) => {
  const responses = await Response.find({
    pollId: req.params.pollId,
  })

  const totalResponses = responses.length

  const summary = {}

  responses.forEach((response) => {
    response.answers.forEach((answer) => {
      if (!summary[answer.questionId]) {
        summary[answer.questionId] = {}
      }

      if (!summary[answer.questionId][answer.selectedOption]) {
        summary[answer.questionId][answer.selectedOption] = 0
      }

      summary[answer.questionId][answer.selectedOption]++
    })
  })

  res.json({
    totalResponses,
    summary,
  })
}