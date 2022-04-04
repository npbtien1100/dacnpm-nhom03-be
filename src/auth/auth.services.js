import passport from "passport";
import jwt from "jsonwebtoken";
// const { findOneById } = require("../admins/admin.service");

export const authenticateByJwt = passport.authenticate("jwt", {
  session: false,
});

export const createJWT = (obj) => {
  const JWT = jwt.sign({ ...obj }, process.env.JWT_SECRET, {
    expiresIn: 10000000, //
  });
  return JWT;
};

// exports.customAuthenticateByJwt = (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   const parseAuthHeader = authHeader ? authHeader.split(" ") : null;
//   if (!(parseAuthHeader && parseAuthHeader[0] === "Bearer")) {
//     return res.sendStatus(400);
//   }
//   const token = parseAuthHeader[1];
//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     findOneById(user.id).then((admin) => {
//       req.user = admin;
//       next();
//     });
//   });
// };