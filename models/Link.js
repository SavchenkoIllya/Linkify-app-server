import mongoose from "mongoose";

const linkSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    url: {
      type: String,
      default: "",
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cathegory",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Link", linkSchema);
