"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiRouter = void 0;
var _express = _interopRequireDefault(require("express"));
var _apiController = require("../controllers/apiController");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var apiRouter = _express["default"].Router();
exports.apiRouter = apiRouter;
apiRouter.post("/viewapi/:id([0-9a-f]{24})", _apiController.postViewAPI);
apiRouter.post("/commentapi/:id([0-9a-f]{24})", _apiController.postCommentApi);
apiRouter["delete"]("/deletecommentapi/:id([0-9a-f]{24})", _apiController.deleteCommentApi);
apiRouter.post("/editcommentapi/:id([0-9a-f]{24})", _apiController.editCommentApi);