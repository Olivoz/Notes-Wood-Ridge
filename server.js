const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const noteRoute = require("./routes/note.route");

require("./strategies/local.strategy");

const express = require("express");
const session = require("express-session");
const passport = require("passport");

const port = 5500;
const app = express();
const store = new session.MemoryStore();

const index = `${__dirname}/app/dist/index.html`;

app.use(express.static("app/dist"));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      secure: false, // We are not using HTTPS so we cannot use secure cookies.
      maxAge: 60 * 60 * 1000, // 1 hours in ms
      sameSite: "strict",
    },
    store: store,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/note", noteRoute);

//If no other route is found serve vue app
app.all("*", (req, res) => {
  res.sendFile(index);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
