const Blog = require("../models/blog.model");
const catchAsync = require("../utils/catchAsync");
const { blogService } = require("../services/");
const httpStatus = require("http-status").default || require("http-status");
const createBlog = catchAsync(async (req, res) => {
	await blogService.createBlog(req.body, req.user.id);
	res.status(httpStatus.CREATED).send({ success: true, message: "Blog created successfully" });
});

const getBlogs = catchAsync(async (req, res) => {
	const blogs = await blogService.getBlogs(req.body.userId);

	res.status(httpStatus.OK).json(blogs);
});

module.exports = {
	createBlog,
	getBlogs,
};
