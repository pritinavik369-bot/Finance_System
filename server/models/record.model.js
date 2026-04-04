import mongoose from "mongoose";

const financialSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  amount: {
    type: Number,
    required: true,
  },

  type: {
    type: String,
    enum: ["income", "expense"],
    required: true,
  },

  category: String,

  date: {
    type: Date,
    default: Date.now,
  },

  notes: String,
});

const Financial = mongoose.model("Financial", financialSchema);
export default Financial;