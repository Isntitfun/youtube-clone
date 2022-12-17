import express from "express";
import {
  getProfile,
  getEditUser,
  getDeleteUser,
  getUserLogout,
  postEditUser,
  getChangePW,
  postChangePW,
} from "../controllers/usersController";
import { protectorMiddleware, avatarUpload } from "../middleware";

const usersRouter = express.Router();

usersRouter
  .route("/edit")
  .all(protectorMiddleware)
  .get(getEditUser)
  .post(avatarUpload.single("avatar"), postEditUser);
usersRouter
  .route("/change-password")
  .all(protectorMiddleware)
  .get(getChangePW)
  .post(postChangePW);
usersRouter.get("/delete", protectorMiddleware, getDeleteUser);
usersRouter.get("/logout", protectorMiddleware, getUserLogout);
usersRouter.get("/:id([0-9a-f]{24})", getProfile);

export default usersRouter;
