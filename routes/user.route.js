const userController = require("../controllers/user.controller");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const user = req.user;
  if (!user) {
    res.sendStatus(401);
    return;
  }

  const visibleUser = user;
  delete visibleUser.password;
  res.send(visibleUser);
});

module.exports = router;
