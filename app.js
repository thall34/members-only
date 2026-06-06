const path = require("node:path");
const express = require("express");
const session = require("express-session");
const passport = require("passport");

const indexRouter = require('./routes/indexRouter');
const errorHandler = require('./middleware/errorHandler');

const PORT = process.env.PORT || 3000

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

require('./config/passport');
app.use(session({ 
    secret: process.env.SESSION_SECRET, 
    resave: false, 
    saveUninitialized: false 
}));
app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);
app.get('/{*splat}', (req, res) => {
  res.status(404).render('errors', {
    title: 'Error 404 - Page Not Found',
    message: 'Error 404 - Page does not exist in the database',
  });
});
app.use(errorHandler);

app.listen(PORT, (err) => {
  if (err) {
    throw err;
  };

  console.log(`Members only app - listening on port ${PORT}`);
});