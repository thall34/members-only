const path = require("node:path");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;

const indexRouter = require('./routes/indexRouter');

const PORT = process.env.PORT || 3000

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(session({ 
    secret: process.env.SESSION_SECRET, 
    resave: false, 
    saveUninitialized: false 
}));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.get("/", indexRouter);
app.get('/{*splat}', (req, res) => {
  res.status(404).render('errors', {
    title: 'Error 404 - Page Not Found',
    message: 'Error 404 - Page does not exist in the database',
  });
});

app.listen(PORT, (err) => {
  if (err) {
    throw err;
  };

  console.log(`Members only app - listening on port ${PORT}`);
});