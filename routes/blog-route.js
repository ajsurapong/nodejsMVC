const express = require('express');
const blogController = require('../controllers/blog-controller');

const router = express.Router();

router.get("/", blogController.readAll);

router.get('/create-form', (req, res) => {
  res.render('blog-create');
});

router.post('/create', blogController.create);

// delete a post, normally should use 'router.delete' but use 'get' because we click a link to delete
router.get("/delete/:id", blogController.remove);

// another delete using 'router.delete', this is from button click and get json in return
router.delete("/delete/:id", blogController.removeButton);

router.get("/edit/:id", blogController.updateForm);

// update a post, normally should use 'router.put' but use 'post' because we update via a form
router.post("/update/:id", blogController.update);

module.exports = router;