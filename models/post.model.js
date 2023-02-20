const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    device: {
      type: String,
      required: true,
    },
    no_if_comments: {
      type: Number,
      required: true,
    },
    userID: String,
  },
  {
    timestamps: true, 
  }
);

const PostModel = mongoose.model("Posts", postSchema);

module.exports = { PostModel };

// title ==> String
// body ==> String
// device ==> String
// no_if_comments ==> Number
