"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postLogin = exports.postJoin = exports.postEditUser = exports.postChangePW = exports.getUserLogout = exports.getProfile = exports.getLogin = exports.getJoin = exports.getGithubAuthed = exports.getGithubAuth = exports.getEditUser = exports.getDeleteUser = exports.getChangePW = void 0;
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _users = _interopRequireDefault(require("../models/users"));
var _videos = _interopRequireDefault(require("../models/videos"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
//====================================================================
//Join
var getJoin = function getJoin(req, res, next) {
  res.render("join", {
    pageTitle: "Join"
  });
};
exports.getJoin = getJoin;
var postJoin = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res, next) {
    var _req$body, email, username, password, password2, name, location, notUniqueEmail, notUniqueUsername, pwNotConfirmed, newUser;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, email = _req$body.email, username = _req$body.username, password = _req$body.password, password2 = _req$body.password2, name = _req$body.name, location = _req$body.location;
            _context.next = 3;
            return _users["default"].exists({
              email: email
            });
          case 3:
            notUniqueEmail = _context.sent;
            _context.next = 6;
            return _users["default"].exists({
              username: username
            });
          case 6:
            notUniqueUsername = _context.sent;
            if (!(password !== password2)) {
              _context.next = 13;
              break;
            }
            req.flash("error", "Password does not match.");
            pwNotConfirmed = 1;
            res.status(400).render("join", {
              pageTitle: "Join",
              pwNotConfirmed: pwNotConfirmed,
              email: email,
              username: username,
              password: password,
              name: name,
              location: location
            });
            _context.next = 28;
            break;
          case 13:
            if (!notUniqueEmail) {
              _context.next = 18;
              break;
            }
            req.flash("error", "The email already exists.");
            res.status(400).render("join", {
              pageTitle: "Join",
              header: "Join",
              notUniqueEmail: notUniqueEmail,
              username: username,
              password: password,
              name: name,
              location: location
            });
            _context.next = 28;
            break;
          case 18:
            if (!notUniqueUsername) {
              _context.next = 23;
              break;
            }
            req.flash("error", "The username already exists.");
            res.status(400).render("join", {
              pageTitle: "Join",
              header: "Join",
              notUniqueUsername: notUniqueUsername,
              email: email,
              password: password,
              name: name,
              location: location
            });
            _context.next = 28;
            break;
          case 23:
            req.flash("info", "Please log in.");
            _context.next = 26;
            return _users["default"].create({
              email: email,
              username: username,
              password: password,
              password2: password2,
              name: name,
              location: location
            });
          case 26:
            newUser = _context.sent;
            res.redirect("/login");
          case 28:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return function postJoin(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

//====================================================================
//Login & Logout
exports.postJoin = postJoin;
var getLogin = function getLogin(req, res, next) {
  res.render("login", {
    pageTitle: "Login"
  });
};
exports.getLogin = getLogin;
var postLogin = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res, next) {
    var _req$body2, username, password, user, pwOk;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body2 = req.body, username = _req$body2.username, password = _req$body2.password;
            _context2.next = 3;
            return _users["default"].findOne({
              username: username,
              socialOnly: false
            });
          case 3:
            user = _context2.sent;
            if (user) {
              _context2.next = 7;
              break;
            }
            req.flash("error", "The username does not exist");
            return _context2.abrupt("return", res.status(400).render("login", {
              pageTitle: "Login",
              header: "Login"
            }));
          case 7:
            _context2.next = 9;
            return _bcrypt["default"].compare(password, user.password);
          case 9:
            pwOk = _context2.sent;
            if (pwOk) {
              _context2.next = 13;
              break;
            }
            req.flash("error", "The password is incorrect");
            return _context2.abrupt("return", res.status(400).render("login", {
              pageTitle: "Login",
              header: "Login"
            }));
          case 13:
            req.session.loggedIn = true;
            req.session.user = user;
            req.flash("info", "Welcome, ".concat(user.name, "."));
            return _context2.abrupt("return", res.redirect("/"));
          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return function postLogin(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
exports.postLogin = postLogin;
var getUserLogout = function getUserLogout(req, res, next) {
  req.session.loggedIn = false;
  req.session.user = null;
  req.flash("info", "Bye.");
  res.redirect("/");
};

//====================================================================
//Read & Edit User
exports.getUserLogout = getUserLogout;
var getProfile = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res, next) {
    var id, user;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.params.id;
            _context3.next = 3;
            return _users["default"].findById(id).populate({
              path: "videos",
              populate: {
                path: "owner"
              }
            });
          case 3:
            user = _context3.sent;
            console.log(user);
            if (!user) {
              res.status(404).render("user/Profile", {
                pageTitle: "Profile",
                errorMessage: "User does not exist"
              });
            }
            res.render("user/Profile", {
              pageTitle: "Profile",
              user: user
            });
          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return function getProfile(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
exports.getProfile = getProfile;
var getEditUser = function getEditUser(req, res, next) {
  return res.render("user/edit-profile", {
    pageTitle: "Edit Profile"
  });
};
exports.getEditUser = getEditUser;
var postEditUser = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res, next) {
    var _req$session$user, _id, avatar, sessionEmail, sessionUsername, _req$body3, email, username, name, location, file, notUniqueEmail, notUniqueUsername, updatedUser;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$session$user = req.session.user, _id = _req$session$user._id, avatar = _req$session$user.avatar, sessionEmail = _req$session$user.email, sessionUsername = _req$session$user.username, _req$body3 = req.body, email = _req$body3.email, username = _req$body3.username, name = _req$body3.name, location = _req$body3.location, file = req.file;
            _context4.next = 3;
            return _users["default"].exists({
              email: email
            });
          case 3:
            notUniqueEmail = _context4.sent;
            _context4.next = 6;
            return _users["default"].exists({
              username: username
            });
          case 6:
            notUniqueUsername = _context4.sent;
            if (!(notUniqueEmail && email !== sessionEmail || notUniqueUsername && username !== sessionUsername)) {
              _context4.next = 10;
              break;
            }
            req.flash("error", "Email / username already exists");
            return _context4.abrupt("return", res.render("user/edit-profile", {
              pageTitle: "Edit Profile",
              header: "Edit Profile"
            }));
          case 10:
            _context4.next = 12;
            return _users["default"].findByIdAndUpdate(_id, {
              avatar: file ? file.path : avatar,
              email: email,
              username: username,
              name: name,
              location: location
            }, {
              "new": true
            });
          case 12:
            updatedUser = _context4.sent;
            req.session.user = updatedUser;
            req.flash("info", "Profile has been updated.");
            return _context4.abrupt("return", res.redirect("/user/edit"));
          case 16:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return function postEditUser(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();
exports.postEditUser = postEditUser;
var getChangePW = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res, next) {
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            res.render("user/change-password", {
              pageTitle: "Change Password"
            });
          case 1:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return function getChangePW(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();
exports.getChangePW = getChangePW;
var postChangePW = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res, next) {
    var _id, _req$body4, oldPW, newPW, confirmPW, user;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _id = req.session.user._id, _req$body4 = req.body, oldPW = _req$body4.oldPW, newPW = _req$body4.newPW, confirmPW = _req$body4.confirmPW;
            _context6.next = 3;
            return _users["default"].findById(_id);
          case 3:
            user = _context6.sent;
            _context6.next = 6;
            return _bcrypt["default"].compare(oldPW, user.password);
          case 6:
            if (_context6.sent) {
              _context6.next = 9;
              break;
            }
            req.flash("error", "Incorrect password.");
            return _context6.abrupt("return", res.status(400).render("user/change-password", {
              pageTitle: "Change Password",
              header: "Change Password"
            }));
          case 9:
            if (!(newPW !== confirmPW)) {
              _context6.next = 12;
              break;
            }
            req.flash("error", "Password does not match.");
            return _context6.abrupt("return", res.status(400).render("user/change-password", {
              pageTitle: "Change Password",
              header: "Change Password"
            }));
          case 12:
            user.password = newPW;
            _context6.next = 15;
            return user.save();
          case 15:
            req.flash("info", "Password changed.");
            return _context6.abrupt("return", res.redirect("logout"));
          case 17:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return function postChangePW(_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();
exports.postChangePW = postChangePW;
var getDeleteUser = function getDeleteUser(req, res, next) {
  return res.send("<h1>Delete User</h1>");
};

//====================================================================
//Github OAuth
exports.getDeleteUser = getDeleteUser;
var getGithubAuth = function getGithubAuth(req, res, next) {
  var baseURL = "https://github.com/login/oauth/authorize";
  var parameterURL = {
    client_id: process.env.GITHUB_CLIENT,
    allow_signup: false,
    scope: "read:user user:email"
  };
  var configURL = new URLSearchParams(parameterURL).toString();
  var finalURL = "".concat(baseURL, "?").concat(configURL);
  res.redirect(finalURL);
};
exports.getGithubAuth = getGithubAuth;
var getGithubAuthed = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res, next) {
    var code, baseURL, parameterURL, configURL, finalURL, tokenRequest, _tokenRequest, access_token, apiURL, userData, emailData, targetUser, newUser;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            code = req.query.code;
            baseURL = "https://github.com/login/oauth/access_token";
            parameterURL = {
              client_id: process.env.GITHUB_CLIENT,
              client_secret: process.env.GITHUB_SECRET,
              code: code
            };
            configURL = new URLSearchParams(parameterURL);
            finalURL = "".concat(baseURL, "?").concat(configURL);
            _context7.next = 7;
            return fetch(finalURL, {
              method: "POST",
              headers: {
                Accept: "application/json"
              }
            });
          case 7:
            tokenRequest = _context7.sent;
            _context7.next = 10;
            return tokenRequest.json();
          case 10:
            tokenRequest = _context7.sent;
            _tokenRequest = tokenRequest, access_token = _tokenRequest.access_token;
            if (access_token) {
              _context7.next = 16;
              break;
            }
            res.redirect("/login");
            _context7.next = 48;
            break;
          case 16:
            apiURL = "https://api.github.com";
            _context7.next = 19;
            return fetch("".concat(apiURL, "/user"), {
              headers: {
                Authorization: "token ".concat(access_token)
              }
            });
          case 19:
            userData = _context7.sent;
            _context7.next = 22;
            return userData.json();
          case 22:
            userData = _context7.sent;
            _context7.next = 25;
            return fetch("".concat(apiURL, "/user/emails"), {
              headers: {
                Authorization: "token ".concat(access_token),
                Accept: "application/vnd.github+json"
              }
            });
          case 25:
            emailData = _context7.sent;
            _context7.next = 28;
            return emailData.json();
          case 28:
            emailData = _context7.sent;
            _context7.next = 31;
            return emailData.find(function (email) {
              return email.primary === true && email.verified === true;
            }).email;
          case 31:
            emailData = _context7.sent;
            if (!emailData) {
              _context7.next = 47;
              break;
            }
            _context7.next = 35;
            return _users["default"].findOne({
              email: emailData
            });
          case 35:
            targetUser = _context7.sent;
            if (targetUser) {
              _context7.next = 41;
              break;
            }
            _context7.next = 39;
            return _users["default"].create({
              email: emailData,
              username: userData.login,
              password: "githubuser".concat(userData.id),
              password2: "githubuser".concat(userData.id),
              name: userData.name,
              location: userData.location,
              socialOnly: true,
              avatar: userData.avatar_url
            });
          case 39:
            newUser = _context7.sent;
            targetUser = newUser;
          case 41:
            req.session.loggedIn = true;
            req.session.user = targetUser;
            req.flash("info", "Welcome, ".concat(targetUser.name, "."));
            return _context7.abrupt("return", res.redirect("/"));
          case 47:
            res.redirect("/login");
          case 48:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return function getGithubAuthed(_x19, _x20, _x21) {
    return _ref7.apply(this, arguments);
  };
}();
exports.getGithubAuthed = getGithubAuthed;