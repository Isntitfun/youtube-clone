import bcrypt from "bcrypt";
import User from "../models/users";
import Video from "../models/videos";

//====================================================================
//Join
export const getJoin = (req, res, next) => {
  res.render("join", {
    pageTitle: "Join",
  });
};
export const postJoin = async (req, res, next) => {
  const { email, username, password, password2, name, location } = req.body;
  const notUniqueEmail = await User.exists({ email });
  const notUniqueUsername = await User.exists({ username });
  if (password !== password2) {
    req.flash("error", `Password does not match.`);
    const pwNotConfirmed = 1;
    res.status(400).render("join", {
      pageTitle: "Join",
      pwNotConfirmed,
      email,
      username,
      password,
      name,
      location,
    });
  } else if (notUniqueEmail) {
    req.flash("error", `The email already exists.`);
    res.status(400).render("join", {
      pageTitle: "Join",
      header: "Join",
      notUniqueEmail,
      username,
      password,
      name,
      location,
    });
  } else if (notUniqueUsername) {
    req.flash("error", `The username already exists.`);

    res.status(400).render("join", {
      pageTitle: "Join",
      header: "Join",
      notUniqueUsername,
      email,
      password,
      name,
      location,
    });
  } else {
    req.flash("info", `Please log in.`);

    const newUser = await User.create({
      email,
      username,
      password,
      password2,
      name,
      location,
    });
    res.redirect("/login");
  }
};

//====================================================================
//Login & Logout
export const getLogin = (req, res, next) => {
  res.render("login", { pageTitle: "Login" });
};
export const postLogin = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, socialOnly: false });
  if (!user) {
    req.flash("error", `The username does not exist`);
    return res
      .status(400)
      .render("login", { pageTitle: "Login", header: "Login" });
  }
  const pwOk = await bcrypt.compare(password, user.password);
  if (!pwOk) {
    req.flash("error", `The password is incorrect`);
    return res
      .status(400)
      .render("login", { pageTitle: "Login", header: "Login" });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  req.flash("info", `Welcome, ${user.name}.`);

  return res.redirect("/");
};
export const getUserLogout = (req, res, next) => {
  req.session.loggedIn = false;
  req.session.user = null;
  req.flash("info", `Bye.`);
  res.redirect("/");
};

//====================================================================
//Read & Edit User
export const getProfile = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id).populate({
    path: "videos",
    populate: { path: "owner" },
  });
  console.log(user);
  if (!user) {
    res.status(404).render(`user/Profile`, {
      pageTitle: "Profile",
      errorMessage: "User does not exist",
    });
  }
  res.render(`user/Profile`, {
    pageTitle: "Profile",
    user,
  });
};

export const getEditUser = (req, res, next) => {
  return res.render("user/edit-profile", {
    pageTitle: "Edit Profile",
  });
};
export const postEditUser = async (req, res, next) => {
  const {
    session: {
      user: { _id, avatar, email: sessionEmail, username: sessionUsername },
    },
    body: { email, username, name, location },
    file,
  } = req;
  const { isHeroku } = res.locals;
  const notUniqueEmail = await User.exists({ email });
  const notUniqueUsername = await User.exists({ username });

  if (
    (notUniqueEmail && email !== sessionEmail) ||
    (notUniqueUsername && username !== sessionUsername)
  ) {
    req.flash("error", `Email / username already exists`);
    return res.render("user/edit-profile", {
      pageTitle: "Edit Profile",
      header: "Edit Profile",
    });
  }

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    {
      avatar: file ? (isHeroku ? file.location : file.path) : avatar,
      email,
      username,
      name,
      location,
    },
    { new: true }
  );
  req.session.user = updatedUser;
  req.flash("info", `Profile has been updated.`);
  return res.redirect("/user/edit");
};
export const getChangePW = async (req, res, next) => {
  res.render("user/change-password", {
    pageTitle: "Change Password",
  });
};
export const postChangePW = async (req, res, next) => {
  const {
    session: {
      user: { _id },
    },
    body: { oldPW, newPW, confirmPW },
  } = req;

  const user = await User.findById(_id);

  if (!(await bcrypt.compare(oldPW, user.password))) {
    req.flash("error", `Incorrect password.`);
    return res.status(400).render("user/change-password", {
      pageTitle: "Change Password",
      header: "Change Password",
    });
  }
  if (newPW !== confirmPW) {
    req.flash("error", `Password does not match.`);
    return res.status(400).render("user/change-password", {
      pageTitle: "Change Password",
      header: "Change Password",
    });
  }
  user.password = newPW;
  await user.save();
  req.flash("info", `Password changed.`);
  return res.redirect("logout");
};
export const getDeleteUser = (req, res, next) =>
  res.send("<h1>Delete User</h1>");

//====================================================================
//Github OAuth
export const getGithubAuth = (req, res, next) => {
  const baseURL = "https://github.com/login/oauth/authorize";
  const parameterURL = {
    client_id: process.env.GITHUB_CLIENT,
    allow_signup: false,
    scope: "read:user user:email",
  };
  const configURL = new URLSearchParams(parameterURL).toString();
  const finalURL = `${baseURL}?${configURL}`;
  res.redirect(finalURL);
};
export const getGithubAuthed = async (req, res, next) => {
  const { code } = req.query;
  const baseURL = "https://github.com/login/oauth/access_token";
  const parameterURL = {
    client_id: process.env.GITHUB_CLIENT,
    client_secret: process.env.GITHUB_SECRET,
    code,
  };
  const configURL = new URLSearchParams(parameterURL);
  const finalURL = `${baseURL}?${configURL}`;
  let tokenRequest = await fetch(finalURL, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  });
  tokenRequest = await tokenRequest.json();
  const { access_token } = tokenRequest;
  if (!access_token) {
    res.redirect("/login");
  } else {
    const apiURL = "https://api.github.com";
    let userData = await fetch(`${apiURL}/user`, {
      headers: {
        Authorization: `token ${access_token}`,
      },
    });
    userData = await userData.json();
    let emailData = await fetch(`${apiURL}/user/emails`, {
      headers: {
        Authorization: `token ${access_token}`,
        Accept: "application/vnd.github+json",
      },
    });
    emailData = await emailData.json();
    emailData = await emailData.find(
      (email) => email.primary === true && email.verified === true
    ).email;
    if (emailData) {
      let targetUser = await User.findOne({ email: emailData });
      if (!targetUser) {
        const newUser = await User.create({
          email: emailData,
          username: userData.login,
          password: `githubuser${userData.id}`,
          password2: `githubuser${userData.id}`,
          name: userData.name,
          location: userData.location,
          socialOnly: true,
          avatar: userData.avatar_url,
        });
        targetUser = newUser;
      }
      req.session.loggedIn = true;
      req.session.user = targetUser;
      req.flash("info", `Welcome, ${targetUser.name}.`);
      return res.redirect("/");
    } else {
      res.redirect("/login");
    }
  }
};
