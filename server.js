const express = require("express");
const app = express();
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");

const authRoute = require("./routes/auth.route");
const profileRoute = require("./routes/profile-route");

//set up view-engine
app.set("view engine", "ejs");

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

//connect to DB
mongoose
  .connect(keys.mongodb.dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch(err => {
    console.log(`Error: ${err}`);
  });

app.use("/auth", authRoute);
app.use("/profile", profileRoute);

app.get("/", (req, res) => {
  res.render("home", { info: req.user });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening on port no ${port}`);
});
