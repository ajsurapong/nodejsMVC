const blogModel = require('../models/blog-model');

const create = (req, res) => {
    const post = req.body;
    blogModel.create(post, (result) => {
        // console.log(result.affectedRows);
        res.redirect("/blog");
    });
};

const readAll = (req, res) => {
    blogModel.readAll((result) => {
        // console.log(result);
        res.render("index", {blogs: result});
    });
};

const remove = (req, res) => {
    const id = req.params.id;
    blogModel.remove(id, (result) => {
        // console.log(result.affectedRows);
        res.redirect("/blog");
    });
};

// this is for button click to delete, return json of destination url
const removeButton = (req, res) => {
    const id = req.params.id;
    blogModel.remove(id, (result) => {
        // console.log(result.affectedRows);
        res.json({url: "/blog"});
    });
};

const updateForm = (req, res) => {
    const id = req.params.id;
    blogModel.read(id, (result) => {
        // console.log(result);
        res.render("blog-update", {blog: result});
    });
};

const update = (req, res) => {
    const id = req.params.id;
    const post = req.body;
    blogModel.update(id, post, (result) => {
        // console.log(result.affectedRows);
        res.redirect("/blog");
    });
};

module.exports = {
    create,
    readAll,
    updateForm,
    remove,
    removeButton,
    update
}