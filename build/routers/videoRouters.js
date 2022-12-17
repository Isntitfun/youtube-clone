"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _videoController = require("../controllers/videoController");
var _middleware = require("../middleware");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var videoRouter = _express["default"].Router();
videoRouter.get("/:id([0-9a-f]{24})", _videoController.getVideo);
videoRouter.route("/:id([0-9a-f]{24})/edit").all(_middleware.protectorMiddleware).get(_videoController.getEditVideo).post(_videoController.postEditVideo);
videoRouter.get("/:id([0-9a-f]{24})/delete", _middleware.protectorMiddleware, _videoController.getDeleteVideo);
videoRouter.route("/upload").all(_middleware.protectorMiddleware).get(_videoController.getUpload).post(_middleware.videoUpload.fields([{
  name: "video",
  maxCount: 1
}, {
  name: "thumbnail",
  maxCount: 1
}]), _videoController.postUpload);
var _default = videoRouter;
exports["default"] = _default;