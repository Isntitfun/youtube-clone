import AWS from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";

const isHeroku = process.env.NODE_ENV === "production";

AWS.config.update({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_KEY,
  region: "ap-northeast-2",
});
const s3 = new AWS.S3();

const imageS3 = multerS3({
  s3: s3,
  bucket: "wetubeeeeeebucket/images",
});

const videoS3 = multerS3({
  s3: s3,
  bucket: "wetubeeeeeebucket/videos",
});

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = req.session.loggedIn;
  res.locals.loggedInUser = req.session.user;
  res.locals.websiteName = "📺Wetube";
  res.locals.isHeroku = process.env.NODE_ENV === "production";
  next();
};

export const protectorMiddleware = (req, res, next) => {
  const loggedIn = req.session.loggedIn;
  if (loggedIn) {
    next();
  } else {
    req.flash("error", "Log in required.");
    res.redirect("/login");
  }
};

export const publickOnlyMiddleware = (req, res, next) => {
  const loggedIn = req.session.loggedIn;
  if (!loggedIn) {
    next();
  } else {
    req.flash("error", "Access denied.");
    res.redirect("/");
  }
};

export const avatarUpload = multer({
  dest: "uploads/avatar/",
  limits: { filesize: 5 * 1024 * 1024 },
  storage: isHeroku ? imageS3 : undefined,
});
export const videoUpload = multer({
  dest: "uploads/video/",
  limits: { filesize: 100 * 1024 * 1024 },
  storage: isHeroku ? videoS3 : undefined,
});
