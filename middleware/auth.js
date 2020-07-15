const config = require("config");
const jwt = require("jsonwebtoken");

function auth(request, response, next) {
  const token = request.header("x-auth-token");

  // Check for token
  if (!token)
    return response.status(401).json({ msg: "No token, authorization denied" });

  try {
    // Verify token
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    // Add user from payload
    request.user = decoded;
    next();
  } catch (error) {
    response.status(400).json({ msg: "Token is not valid" });
  }
}

module.exports = auth;
