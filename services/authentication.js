const JWT = require("jsonwebtoken");
const secretKey = "$uperMan@123";

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    fullName: user.fullName,
    role: user.role,
    profileImageURL: user.profileImageURL,
  };
  const token = JWT.sign(payload, secretKey);
  return token;
}

function validateToken(token) {
  const verifyToken = JWT.verify(token, secretKey);
  return verifyToken;
}

module.exports = {
  createTokenForUser,
  validateToken,
};
