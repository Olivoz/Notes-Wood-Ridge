const express = require("express");
const port = 5500;
const app = express();
const index = `${__dirname}/app/dist/index.html`;

app.use(express.static("app/dist"));
app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ hello: "world" });
});

//If no other route is found serve vue app
app.all("*", (req, res) => {
  res.sendFile(index);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
