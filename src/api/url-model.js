import mongoose from "mongoose";

const URLSchema = mongoose.Schema({
  longUrl: {
    type: String,
    required: true,
  },
});

export const URLs = mongoose.models.urls || mongoose.model("urls", URLSchema);
