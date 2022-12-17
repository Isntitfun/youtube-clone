import express from "express";
import session from "express-session";
import flash from "express-flash";
import MongoStore from "connect-mongo";
import morgan from "morgan";
import { localsMiddleware } from "./middleware";

import rootRouter from "./routers/rootRouter";
import usersRouter from "./routers/usersRouter";
import videoRouter from "./routers/videoRouters";
import { apiRouter } from "./routers/apiRouter";

// Constants
const app = express();
const logger = morgan("dev");
// Constants ends
// ===================================================================================

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/view");
app.use(logger);
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
    }),
    // cookie: { maxAge: 10000 },
  })
);
app.use(flash());

app.use(localsMiddleware);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/sss", express.static("asset"));
app.use("/uploads", express.static("uploads"));

app.use((req, res, next) => {
  const allowedOrigins = [
    "https://wetubeeeeeebucket.s3.ap-northeast-1.amazonaws.com",
    "https://avatars.githubusercontent.com/",
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
  res.header("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Cross-Origin-Embedder-Policy", "same-origin");
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  res.header("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});
app.use("/", rootRouter);
app.use("/user", usersRouter);
app.use("/video", videoRouter);
app.use("/api", apiRouter);

export default app;
