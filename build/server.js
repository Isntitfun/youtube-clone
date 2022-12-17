"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _expressFlash = _interopRequireDefault(require("express-flash"));
var _connectMongo = _interopRequireDefault(require("connect-mongo"));
var _morgan = _interopRequireDefault(require("morgan"));
var _middleware = require("./middleware");
var _rootRouter = _interopRequireDefault(require("./routers/rootRouter"));
var _usersRouter = _interopRequireDefault(require("./routers/usersRouter"));
var _videoRouters = _interopRequireDefault(require("./routers/videoRouters"));
var _apiRouter = require("./routers/apiRouter");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// Constants
var app = (0, _express["default"])();
var logger = (0, _morgan["default"])("dev");
// Constants ends
// ===================================================================================

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/view");
app.use(logger);
app.use((0, _expressSession["default"])({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  store: _connectMongo["default"].create({
    mongoUrl: process.env.DB_URL
  })
  // cookie: { maxAge: 10000 },
}));

app.use((0, _expressFlash["default"])());
app.use(_middleware.localsMiddleware);
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use(_express["default"].json());
app.use("/sss", _express["default"]["static"]("asset"));
app.use("/uploads", _express["default"]["static"]("uploads"));
app.use(function (req, res, next) {
  res.header("Cross-Origin-Embedder-Policy", "require-corp");
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  next();
});
app.use("/", _rootRouter["default"]);
app.use("/user", _usersRouter["default"]);
app.use("/video", _videoRouters["default"]);
app.use("/api", _apiRouter.apiRouter);
var _default = app;
exports["default"] = _default;