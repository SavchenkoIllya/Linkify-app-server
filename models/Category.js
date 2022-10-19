import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      default: "",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    color: {
      type: String,
      default: "#007AFF",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Cathegory", categorySchema);
