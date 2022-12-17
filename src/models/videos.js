import mongoose from "mongoose";
const { Schema } = mongoose;

const videoSchema = new mongoose.Schema({
  title: { type: String, require: true, trim: true },
  videoFile: { type: String, require: true },
  thumbnailFile: { type: String, require: true },
  description: { type: String, require: true, trim: true },
  createdAt: { type: Date, default: Date.now },
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0, require: true },
    rating: { type: Number, default: 0, require: true },
  },
  owner: { type: mongoose.Schema.Types.ObjectId, require: true, ref: "User" },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

videoSchema.static("formatHashtags", function (hashtags) {
  return hashtags
    .split(",")
    .map((word) =>
      word.trim().startsWith("#") ? word.trim() : `#${word.trim()}`
    );
});

const Video = mongoose.model("Video", videoSchema);

export default Video;
