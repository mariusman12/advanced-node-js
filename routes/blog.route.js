const express = require('express')
const {createBlog,getBlogs} = require('../controller/blog.controller');
const {createBlogSchema} = require('../validations/blog.validation');
const validate = require('../middlewares/validate');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Salut! Serverul Node.js rulează cu succes!');
});

router.post('/blogs',validate(createBlogSchema),createBlog);
router.get('/blogs',getBlogs);


module.exports = router;