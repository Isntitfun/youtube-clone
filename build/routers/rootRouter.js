"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _usersController = require("../controllers/usersController");
var _videoController = require("../controllers/videoController");
var _middleware = require("../middleware");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var rootRouter = _express["default"].Router();
rootRouter.get("/", _videoController.getHome);
rootRouter.route("/join").all(_middleware.publickOnlyMiddleware).get(_usersController.getJoin).post(_usersController.postJoin);
rootRouter.route("/login").all(_middleware.publickOnlyMiddleware).get(_usersController.getLogin).post(_usersController.postLogin);
rootRouter.get("/github/auth", _middleware.publickOnlyMiddleware, _usersController.getGithubAuth);
rootRouter.get("/github/authed", _middleware.publickOnlyMiddleware, _usersController.getGithubAuthed);
rootRouter.get("/search", _videoController.getSearch);
var _default = rootRouter;
exports["default"] = _default;