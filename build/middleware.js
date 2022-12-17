"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.videoUpload = exports.publickOnlyMiddleware = exports.protectorMiddleware = exports.localsMiddleware = exports.avatarUpload = void 0;
var _multer = _interopRequireDefault(require("multer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var localsMiddleware = function localsMiddleware(req, res, next) {
  res.locals.loggedIn = req.session.loggedIn;
  res.locals.loggedInUser = req.session.user;
  res.locals.websiteName = "📺Wetube";
  next();
};
exports.localsMiddleware = localsMiddleware;
var protectorMiddleware = function protectorMiddleware(req, res, next) {
  var loggedIn = req.session.loggedIn;
  if (loggedIn) {
    next();
  } else {
    req.flash("error", "Log in required.");
    res.redirect("/login");
  }
};
exports.protectorMiddleware = protectorMiddleware;
var publickOnlyMiddleware = function publickOnlyMiddleware(req, res, next) {
  var loggedIn = req.session.loggedIn;
  if (!loggedIn) {
    next();
  } else {
    req.flash("error", "Access denied.");
    res.redirect("/");
  }
};
exports.publickOnlyMiddleware = publickOnlyMiddleware;
var avatarUpload = (0, _multer["default"])({
  dest: "uploads/avatar/",
  limits: {
    filesize: 5 * 1024 * 1024
  }
});
exports.avatarUpload = avatarUpload;
var videoUpload = (0, _multer["default"])({
  dest: "uploads/video/",
  limits: {
    filesize: 100 * 1024 * 1024
  }
});
exports.videoUpload = videoUpload;