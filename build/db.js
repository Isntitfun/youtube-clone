"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_mongoose["default"].connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var db = _mongoose["default"].connection;
var handleServerError = function handleServerError(error) {
  console.log("⛔ DB Error", error);
};
var handleServerOpen = function handleServerOpen() {
  console.log("✅ Connected to DB");
};
db.on("error", handleServerError);
db.once("open", handleServerOpen);