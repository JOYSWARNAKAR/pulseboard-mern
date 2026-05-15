// const router = require("express").Router()
import express from "express"
import authMiddleware from "../middleware/authMiddleware.js"
import { submitResponse } from "../controllers/responseController.js"

const router = express.Router()

router.post("/:pollId", authMiddleware, submitResponse)

export default router