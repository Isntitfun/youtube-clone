"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Schema = _mongoose["default"].Schema;
var commentSchema = new Schema({
  text: {
    type: String,
    require: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: "User"
  },
  video: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: "Video"
  },
  createdAt: {
    type: Date,
    "default": Date.now
  }
});
var Comment = _mongoose["default"].model("Comment", commentSchema);
var _default = Comment;
exports["default"] = _default;