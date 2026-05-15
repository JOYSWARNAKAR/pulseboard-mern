
import express from "express"
import { getAnalytics } from "../controllers/analyticsController.js"

const router = express.Router() 
router.get("/:pollId", getAnalytics)

export default router