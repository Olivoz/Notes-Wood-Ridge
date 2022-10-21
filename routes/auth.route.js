const express = require("express");
const passport = require("passport");
const router = express.Router();
const userController = require("../controllers/user.controller");
const bcrypt = require("bcrypt");

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});

router.post("/signup", (req, res) => {
  let username = req.body?.username;
  const email = req.body?.email;
  const password = req.body?.password;
  if (!email || !password) {
    res.sendStatus(400);
    return;
  }

  if (!username) username = email;

  userController
    .getUser(email)
    .then((user) => {
      if (user) {
        res.sendStatus(400);
        return;
      }

      const hashedPassword = bcrypt.hashSync(password, 10);
      userController
        .createUser(username, email, hashedPassword)
        .then(() => res.sendStatus(200))
        .catch(() => res.sendStatus(400));
    })
    .catch(() => res.sendStatus(400));
});

module.exports = router;
