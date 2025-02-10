const Blog = require('../models/blog.model');
const catchAsync = require('../utils/catchAsync');
const { blogService } = require('../services/');
const httpStatus = require('http-status').default || require('http-status');
const createBlog = catchAsync(async (req, res) => {
	await blogService.createBlog(req.body);
	res.status(httpStatus.CREATED).send({ success: true, message: 'Blog created successfully' });
});

const getBlogs = async (req, res) => {
	const blogs = await blogService.getBlogs();

	res.status(httpStatus.OK).send({ error: true, message: error.message });
};

module.exports = {
	createBlog,
	getBlogs,
};
