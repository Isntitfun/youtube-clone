"use strict";

require("dotenv/config");
require("./db.js");
var _videos = _interopRequireDefault(require("./models/videos"));
var _users = _interopRequireDefault(require("./models/users"));
var _comments = _interopRequireDefault(require("./models/comments.js"));
var _server = _interopRequireDefault(require("./server.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var PORT = 4000;
var handleAppListen = function handleAppListen() {
  console.log("\u2705 Listening on localhost:".concat(PORT, " :: No Error"));
};
_server["default"].listen(PORT, handleAppListen);