const isAuth = (req, res, next) => {
  console.log("middelware", req.session);
  if (req.session.isAuth) {
    next();
  } else {
    return res.send({
      status: 401,
      message: "Session expired, please login again",
    });
  }
};

module.exports = isAuth;
