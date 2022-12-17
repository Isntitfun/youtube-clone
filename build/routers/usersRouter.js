"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _usersController = require("../controllers/usersController");
var _middleware = require("../middleware");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var usersRouter = _express["default"].Router();
usersRouter.route("/edit").all(_middleware.protectorMiddleware).get(_usersController.getEditUser).post(_middleware.avatarUpload.single("avatar"), _usersController.postEditUser);
usersRouter.route("/change-password").all(_middleware.protectorMiddleware).get(_usersController.getChangePW).post(_usersController.postChangePW);
usersRouter.get("/delete", _middleware.protectorMiddleware, _usersController.getDeleteUser);
usersRouter.get("/logout", _middleware.protectorMiddleware, _usersController.getUserLogout);
usersRouter.get("/:id([0-9a-f]{24})", _usersController.getProfile);
var _default = usersRouter;
exports["default"] = _default;