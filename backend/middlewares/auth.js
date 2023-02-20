const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];
  if (token) {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (decoded) {
      const ID = decoded.id;
      req.body.userID = ID;
      next();
    } else {
      res.status(400).send({ msg: "Login Required" });
    }
  } else {
    res.status(400).send({ msg: "Login Required" });
  }
};

module.exports = { auth };
