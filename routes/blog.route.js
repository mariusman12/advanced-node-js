const express = require("express");
const { createBlog, getBlogs } = require("../controller/blog.controller");
const { getBlogSchema } = require("../validations/blog.validation");
const validate = require("../middlewares/validate");
const router = express.Router();

router.get("/", (req, res) => {
	res.send("Salut! Serverul Node.js rulează cu succes!");
});

router.post("/blogs", validate(getBlogSchema), createBlog);
router.get("/blogs", getBlogs);

module.exports = router;
