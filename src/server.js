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
  res.header("Cross-Origin-Embedder-Policy", "require-corp");
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  next();
});
app.use("/", rootRouter);
app.use("/user", usersRouter);
app.use("/video", videoRouter);
app.use("/api", apiRouter);

export default app;
