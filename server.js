const userController = require("./userController");
const express = require("express");
const port = 5500;
const app = express();

const index = `${__dirname}/app/dist/index.html`;

app.use(express.static("app/dist"));
app.use(express.json());

app.get("/api/v1/user/:id", (req, res) => {
  userController.getUser(req.params.id).then((user) => res.send(user));
});

//If no other route is found serve vue app
app.all("*", (req, res) => {
  res.sendFile(index);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
