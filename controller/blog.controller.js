const Blog = require("../models/blog.model");
const catchAsync = require("../utils/catchAsync");

const createBlog = catchAsync (async (req, res) => {
         await Blog.create(req.body);
        res.send({ success: true, message: "Blog created successfully" });
  })


const getBlogs = async (req,res)=>{
    try{
        const blogs = await Blog.find();
        res.json(blogs);
    }catch(error){
        res.send({error:true,message:error.message})
    }
}

module.exports={
    createBlog,
    getBlogs
}