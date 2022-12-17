import mongoose from "mongoose";
const { Schema } = mongoose;

const commentSchema = new Schema({
  text: { type: String, require: true },
  owner: { type: Schema.Types.ObjectId, require: true, ref: "User" },
  video: { type: Schema.Types.ObjectId, require: true, ref: "Video" },
  createdAt: { type: Date, default: Date.now },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
