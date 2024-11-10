const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      reuired: true,
    },
    image: {
      type: [String],
    },
    body: {
      type: String,
      requqired: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Health & Wellness",
        "Yoga Spirituality",
        "Travel & Friendship",
        "Food & Drink",
        "Video games",
        "Software & Technology",
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
