const express = require('express');
const path = require('path');
const db = require('./config/db');

const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.get("/", (req, res) => {
    res.redirect("/blog");
});

// --- blog route ---
// --- get all posts ---
app.get("/blog", (req, res) => {
    const sql = "SELECT * FROM post";
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Server error");
        };
        res.render("index", { blogs: result });
    });
});

// --- show form for create new post ---
app.get('/blog/create-form', (req, res) => {
    res.render('blog-create');
});

// --- create new post ---
app.post('/blog/create', (req, res) => {
    const post = req.body;
    const sql = "INSERT INTO post(title, detail) VALUES(?, ?)";
    db.query(sql, [post.title, post.detail], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Server error");
        };
        res.redirect("/blog");
    });
});

// --- delete a post ---
app.get('/blog/delete/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM post WHERE id = ?";
    db.query(sql, id, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Server error");
        };
        res.redirect("/blog");
    });
});

// --- delete a post, using a button ---
app.delete('/blog/delete/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM post WHERE id = ?";
    db.query(sql, id, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Server error");
        };
        // res.redirect("/blog");
        // cannot use redirect due to the call is from front-end function
        // send back destination instead
        res.json({url: "/blog"});
    });
});

//  --- edit a post ---
app.get('/blog/edit/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM post WHERE id = ?";
    db.query(sql, id, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Server error");
        };
        // be careful, we must return result[0] because this is a single query
        res.render("blog-update", {blog: result[0]});
    });
});

//  --- update a post ---
app.post("/blog/update/:id", (req, res) => {
    const id = req.params.id;
    const post = req.body;
    const sql = "UPDATE post SET title=?, detail=? WHERE id = ?";
    db.query(sql, [post.title, post.detail, id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Server error");
        };
        res.redirect("/blog");
    });
});

// catch 404 and forward to error handler
app.use(function (req, res) {
    res.status(404).send("Page not found");
});

app.listen(3000);