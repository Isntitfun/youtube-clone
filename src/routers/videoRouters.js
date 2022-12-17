import express from "express";
import {
  getVideo,
  getEditVideo,
  getDeleteVideo,
  getUpload,
  postUpload,
  postEditVideo,
} from "../controllers/videoController";
import { protectorMiddleware, videoUpload } from "../middleware";

const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-f]{24})", getVideo);
videoRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(protectorMiddleware)
  .get(getEditVideo)
  .post(postEditVideo);

videoRouter.get(
  "/:id([0-9a-f]{24})/delete",
  protectorMiddleware,
  getDeleteVideo
);
videoRouter
  .route("/upload")
  .all(protectorMiddleware)
  .get(getUpload)
  .post(
    videoUpload.fields([
      { name: "video", maxCount: 1 },
      { name: "thumbnail", maxCount: 1 },
    ]),
    postUpload
  );

export default videoRouter;
