module.exports.isLoggedIn = (req, res, next) => {
  // if (!req.isAuthenticated()) {
  //   console.log(req.isAuthenticated());
  //   return res.status(404).json({ msg: "user not found" });
  // }
  console.log("hi");
  console.log(req.isAuthenticated());
  next();
};

//Note:
// console.log(req.originalUrl); contains path to which you have requested
// Note: req.isAuthenticated is also add by passport to request it tells whether user is located or not
