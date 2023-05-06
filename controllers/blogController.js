const blogModel = require('../model/blogmodel');
const userModel = require('../model/models');
const mongoose = require("mongoose");
exports.getAllBlogsController = async (req,res) => {
    try {
        const blogs = await blogModel.find({}).populate('user');
        if(!blogs){
            return res.status(200).send({
                success:false,
                message:"No blogs found"
            })
        }
        return res.status(200).send({
            success:true,
            blogCount: blogs.length,
            message:"All Blogs lists",
            blogs
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error while getting blogs",
            error
        })
    }
}

exports.createBlogsController =  async (req,res) => {
    try {
        const {title,description,image,user}=req.body;
        if(!title || !description || !image || !user){
            return res.status(400).send({
                success:false,
                message:"Please provide all fields",
            })
        }
        const existingUser = await userModel.findById(user);
        if(!existingUser){
            return res.status(404).send({
                success:false,
                message:"Unable to find user",
            })
        }

        const newBlog = await blogModel({title,description,image,user});
        const session = await mongoose.startSession();
        session.startTransaction();
        await newBlog.save({session});
        existingUser.blogs.push(newBlog);
        await existingUser.save({session});
        await session.commitTransaction();
        await newBlog.save();
        return res.status(201).send({
            success:true,
            message:"Blog created successfully",
            newBlog
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success:false,
            message:"Error while creating Blog",
            error
        });
    }
};

exports.updateBlogsController =  async (req,res) => {
    try {
        const {id} = req.params 
        const {title,description,image} = req.body
        const blog = await blogModel.findByIdAndUpdate(id,{...req.body},{new:true})
        return res.status(200).send({
            success:true,
            message:"updated Blog",
            blog
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success:false,
            message:"Error while updating Blog",
            error
        })
    }
}

exports.getBYIdBlogsController = async (req,res) => {
    try {
        const {id} = req.params
        const blog = await blogModel.findById(id)
        if(!blog){
            return res.status(404).send({
                success:false,
                message:"blog not found with this id"
            })
        }
        return res.status(200).send({
            success:false,
            message:"fetch single blog",
            blog
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success:false,
            message:"Error while getting single Blog",
            error
        })
    }
}

exports.deleteBlogsController =  async (req,res) => {
    try {
       const blog = await blogModel.findOneAndDelete(req.params.id).populate("user");
        await blog.user.blogs.pull(blog)
        await blog.user.save();
        return res.status(200).send({
            success:true,
            message:"Blog Deleted"
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success:false,
            message:"Error while deleting  Blog",
            error
        })
    }
}
exports.userBlogController = async(req,res) => {
    try {
        const userBlog = await userModel.findById(req.params.id).populate("blogs")
        if(!userBlog){
            return res.status(404).send({
                success:false,
                message:"blogs not found with this id",
            })
        }
        return res.status(200).send({
            success:true,
            message:"user blogs",
            userBlog,
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success:false,
            message:'error in user blog',
            error
        })
    }
}