"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Schema = _mongoose["default"].Schema;
var videoSchema = new _mongoose["default"].Schema({
  title: {
    type: String,
    require: true,
    trim: true
  },
  videoFile: {
    type: String,
    require: true
  },
  thumbnailFile: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true,
    trim: true
  },
  createdAt: {
    type: Date,
    "default": Date.now
  },
  hashtags: [{
    type: String,
    trim: true
  }],
  meta: {
    views: {
      type: Number,
      "default": 0,
      require: true
    },
    rating: {
      type: Number,
      "default": 0,
      require: true
    }
  },
  owner: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    require: true,
    ref: "User"
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }]
});
videoSchema["static"]("formatHashtags", function (hashtags) {
  return hashtags.split(",").map(function (word) {
    return word.trim().startsWith("#") ? word.trim() : "#".concat(word.trim());
  });
});
var Video = _mongoose["default"].model("Video", videoSchema);
var _default = Video;
exports["default"] = _default;