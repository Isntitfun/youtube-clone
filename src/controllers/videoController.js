import User from "../models/users";
import Video from "../models/videos";

export const getHome = async (req, res, next) => {
  const videos = await Video.find({}).sort({ createdAt: -1 }).populate("owner");
  return res.render("home", {
    pageTitle: "Home",
    header: "Home",
    videos,
  });
};

export const getSearch = async (req, res, next) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: { $regex: new RegExp(keyword, "i") },
    }).populate("owner");
    console.log(videos);
  }
  res.render("search", {
    pageTitle: "Search",
    videos,
  });
};

export const getVideo = async (req, res, next) => {
  const { id } = req.params;
  const video = await Video.findById(id).populate([
    { path: "owner" },
    { path: "comments", populate: { path: "owner" } },
  ]);

  if (!video) {
    res.status(404).render("404", { pageTitle: `404 Error` });
  } else {
    res.render("video/video", {
      pageTitle: `Watching ${video.title}`,
      video,
    });
  }
};

export const getEditVideo = async (req, res, next) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  const exist = await Video.exists({ _id: id });
  console.log(String(video.owner));
  console.log(String(req.session.user._id));
  if (!exist) {
    res.status(404).render("404", { pageTitle: `404 Error` });
  }
  if (String(video.owner) !== String(req.session.user._id)) {
    return res.status(403).redirect("/");
  } else {
    res.render("video/edit", {
      pageTitle: `Editing ${video.title}`,

      video,
    });
  }
};

export const postEditVideo = async (req, res, next) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  const { title, description, hashtags } = req.body;
  if (String(video.owner) !== String(req.session.user._id)) {
    req.flash("error", `Access denied.`);
    return res.status(403).redirect("/");
  }
  const editedVideo = await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  req.flash("info", `Successfuly edited`);
  res.redirect(`/video/${id}`);
};

export const getDeleteVideo = async (req, res, next) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (String(video.owner) !== String(req.session.user._id)) {
    req.flash("error", `Acces denied.`);
    return res.status(403).redirect("/");
  }
  if (Video.exists({ _id: id })) {
    await Video.findByIdAndDelete(id);
  }
  req.flash("info", `Video is deleted.`);
  return res.redirect("/");
};

export const getUpload = (req, res, next) => {
  res.render(`video/upload`, {
    pageTitle: "Upload Video",
  });
};

export const postUpload = async (req, res, next) => {
  const {
    session: {
      user: { _id },
    },
    body: { title, description, hashtags },
    files,
  } = req;
  const { isHeroku } = res.locals;
  const video = files.video[0];
  const thumbnail = files.thumbnail[0];
  try {
    const newVideo = await Video.create({
      title,
      videoFile: isHeroku ? video.location : "/" + video.path,
      thumbnailFile: isHeroku ? thumbnail.location : "/" + thumbnail.path,
      description,
      hashtags: Video.formatHashtags(hashtags),
      owner: _id,
    });
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();
    req.flash("info", `Successfully uploaded`);
    return res.redirect("/");
  } catch (error) {
    res.render(`video/upload`, {
      pageTitle: "Upload Video",
      header: "Upload Video",
      errorMessage: "Data incomplete",
    });
  }
};
