const express = require('express');
const path = require('path');
const blogRoute = require('./routes/blog-route');
const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/blog', blogRoute);

app.get("/", (req, res) => {
  res.redirect("/blog");
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).send("Page not found");
});

app.listen(3000);