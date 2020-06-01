const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

// Get the User model
const User = require("../../models/User");

// @route   GET api/auth
// @desc    Auth user
// @access  Public
router.post("/", (request, response) => {
  const { email, password } = request.body;

  // Simple validation
  if (!email || !password)
    return response.status(400).json({ msg: "Please enter all fields" });

  // Check for existing user
  User.findOne({ email }).then((user) => {
    if (!user)
      return response.status(400).json({ msg: "Invalid credentials email" });

    // Compare passwords
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch)
        return response.status(400).json({ msg: "Invalid credentials" });

      jwt.sign(
        { id: user.id },
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;

          response.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
          });
        }
      );
    });
  });
});

// @route   GET api/auth/user
// @desc    Get user details
// @access  Private
router.get("/user", auth, (request, response) => {
  User.findById(request.user.id)
    .select("-password")
    .then((user) => response.json(user));
});

module.exports = router;
