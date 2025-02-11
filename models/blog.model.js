const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		createdBy: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{ timestamps: true },
);

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
