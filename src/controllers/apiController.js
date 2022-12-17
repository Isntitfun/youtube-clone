import Video from "../models/videos";
import Comment from "../models/comments";
import User from "../models/users";

export const postViewAPI = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.sendStatus(404);
  }
  video.meta.views = video.meta.views + 1;
  await video.save();
  return res.sendStatus(200);
};

export const postCommentApi = async (req, res) => {
  const {
    params: { id: videoID },
    body: { text },
    session: {
      user: { _id },
    },
  } = req;
  const video = await Video.findById(videoID);
  if (!video) {
    res.sendStatus(404);
  }
  const newComment = await Comment.create({
    text,
    owner: _id,
    video: videoID,
  });

  video.comments.push(newComment.id);
  video.save();

  const user = await User.findById(_id);
  user.comments.push(newComment.id);
  user.save();

  const comment = await Comment.findById(newComment._id).populate("owner");
  return res.status(201).json({ comment });
};

export const deleteCommentApi = async (req, res) => {
  console.log(req.body);
  const {
    body: { id },
    session: {
      user: { _id },
    },
  } = req;
  const targetComment = await Comment.findById(id);

  if (!targetComment) {
    return res.sendStatus(404);
  } else if (String(_id) !== String(targetComment.owner)) {
    return res.sendStatus(401);
  } else {
    await Comment.findByIdAndDelete(id);
    return res.sendStatus(200);
  }
};

export const editCommentApi = async (req, res) => {
  const {
    body: { text },
    params: { id },
  } = req;
  const updatedComment = await Comment.findByIdAndUpdate(id, { text: text });
  if (!updatedComment) {
    res.sendStatus(406);
  }
  res.sendStatus(200);
};
