const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

// Get the User model
const User = require("../../models/User");

// @route   GET api/users
// @desc    Register new user
// @access  Public
router.post("/", (request, response) => {
  const { name, email, password } = request.body;

  // Simple validation
  if (!name || !email || !password)
    return response.status(400).json({ msg: "Please enter all fields" });

  // Check for existing user
  User.findOne({ email }).then((user) => {
    if (user) return response.status(400).json({ msg: "Email already used" });
    const newUser = new User({
      name,
      email,
      password,
    });

    // Creat a salt and hash the password
    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        newUser.password = hash;
        newUser.save().then((user) => {
          response.json({
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
          });
        });
      });
    });
  });
});

module.exports = router;
