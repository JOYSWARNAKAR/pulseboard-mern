
// const router = require("express").Router()
import express from "express"
import authMiddleware from "../middleware/authMiddleware.js"
import { createPoll, getPoll, publishResults } from "../controllers/pollController.js"

const router = express.Router()


router.post("/", authMiddleware, createPoll)
router.get("/:id", getPoll)
router.patch("/:id/publish", authMiddleware, publishResults)

export default router