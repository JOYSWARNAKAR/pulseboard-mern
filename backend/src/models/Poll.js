
import mongoose from "mongoose"

const optionSchema = new mongoose.Schema({
  text: String,
})

const questionSchema = new mongoose.Schema({
  question: String,
  required: Boolean,
  options: [optionSchema],
})

const pollSchema = new mongoose.Schema(
  {
    title: String,

    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    anonymous: {
      type: Boolean,
      default: true,
    },

    expiresAt: Date,

    published: {
      type: Boolean,
      default: false,
    },

    questions: [questionSchema],
  },
  { timestamps: true }
)

export default mongoose.model("Poll", pollSchema)
