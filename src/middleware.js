import multer from "multer";

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = req.session.loggedIn;
  res.locals.loggedInUser = req.session.user;
  res.locals.websiteName = "📺Wetube";
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
});
export const videoUpload = multer({
  dest: "uploads/video/",
  limits: { filesize: 100 * 1024 * 1024 },
});
