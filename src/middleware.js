import AWS from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_KEY,
  },
});

const imageS3 = multerS3({
  s3: s3,
  bucket: "wetubeeeeeebucket",
});

const videoS3 = multerS3({
  s3: s3,
  bucket: "wetubeeeeeebucket",
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
  storage: imageS3,
});
export const videoUpload = multer({
  dest: "uploads/video/",
  limits: { filesize: 100 * 1024 * 1024 },
  storage: videoS3,
});
