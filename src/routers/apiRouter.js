import express from "express";
import {
  deleteCommentApi,
  editCommentApi,
  postCommentApi,
  postViewAPI,
} from "../controllers/apiController";

export const apiRouter = express.Router();

apiRouter.post("/viewapi/:id([0-9a-f]{24})", postViewAPI);
apiRouter.post("/commentapi/:id([0-9a-f]{24})", postCommentApi);
apiRouter.delete("/deletecommentapi/:id([0-9a-f]{24})", deleteCommentApi);
apiRouter.post("/editcommentapi/:id([0-9a-f]{24})", editCommentApi);
