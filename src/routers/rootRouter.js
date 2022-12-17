import express from "express";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  getGithubAuth,
  getGithubAuthed,
} from "../controllers/usersController";
import { getHome, getSearch } from "../controllers/videoController";
import { publickOnlyMiddleware } from "../middleware";

const rootRouter = express.Router();

rootRouter.get("/", getHome);
rootRouter
  .route("/join")
  .all(publickOnlyMiddleware)
  .get(getJoin)
  .post(postJoin);
rootRouter
  .route("/login")
  .all(publickOnlyMiddleware)
  .get(getLogin)
  .post(postLogin);
rootRouter.get("/github/auth", publickOnlyMiddleware, getGithubAuth);
rootRouter.get("/github/authed", publickOnlyMiddleware, getGithubAuthed);
rootRouter.get("/search", getSearch);

export default rootRouter;
