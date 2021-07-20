const jwt = require("jsonwebtoken");

const verifytoken = (req, res, next) => {
  const token = req.header("auth-token");

  if(!token) {
    res.status(400).json("Token Not Provied in auth-token headrer");
  }

  try {
    const jwtTokenVerify = jwt.verify(token, "secret");
    req.user = jwtTokenVerify;
  } catch (err) {
    res.status(400).json("Remember we have security in place, Go away, Wrong Token");
  }

  next();
};

exports.module = verifyToken;
