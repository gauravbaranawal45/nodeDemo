const jwt = require("jsonwebtoken");
const config = require("../config/config");
function verifyToken(req, res, next) {
  const bearerToken = req.headers["authorization"].split(" ");
  const token = bearerToken[1];
  if (!token)
    return res.status(403).send({ auth: false, message: "No token provided." });
  jwt.verify(token, config.secretKey, function (err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    req.userData = decoded;
    next();
  });
}

module.exports = verifyToken;
