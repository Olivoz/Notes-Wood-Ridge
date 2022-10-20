const userController = require("../controllers/user.controller");
const express = require("express");
const router = express.Router();

router.get("/:id", (req, res) => {
  userController.getUser(req.params.id).then((user) => res.send(user));
});

module.exports = router;
