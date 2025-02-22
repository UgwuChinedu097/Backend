const blogModel = require('../model/blogModel')
const bcrypt = require('bcrypt')


const createBlogUser = async (req, res) => {
    try {
        const {username, email, password, blogs} = req.body
        if (!password || !email) {
            return res.status(400).json({message: "All field is required"})
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const createUser = await blogModel.create({
           username,
           email,
           password: hashPassword,
           blogs: []
        })
        return res.status(200).json({message: "user created successfully", data: createUser})
    } catch (error) {
        return res.status(500).json({message: "an error occured", error})
    }
}

const loginBlog = async (req, res) => {
    try {
        const {email, password} = req.body
        const findBlogger = await blogModel.findOne({email})
        if(!findBlogger) {
            return res.status(404).json({message: "user not found"})
        }
        const checkpas = await bcrypt.compare(password, findBlogger.password)
        if(!checkpas){
            return res.status(404).json({message: "invalid password"})
        }
        return res.status(200).json({message: "user login successfully", data: findBlogger})
    } catch (error) {
        return res.status(500).json({message: "an error occured", error})
    }
}

const getBlogs = async (req, res) => {
    try {
      const {id} = req.params
      const user = await blogModel.findById(id);
      if (!user){
        return res.status(404).json({ error: 'User not found' });
      } 
  
      return res.status(200).json({message: 'All blogs gotten successfully', data: user.blogs});
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
};

const createBloggers = async (req, res) => {
    try {
        const {title, content} = req.body
        const {id} = req.params
        const findUser = await blogModel.findById(id)
        if(!findUser){
            return res.status(404).json({message: "user gotten successfully"})
        }
        const newBlog = {title, content, createdAt:  Date.now()}
        findUser.blogs.push(newBlog)
        await findUser.save()
        return res.status(200).json({message: "blog update successfully", data: newBlog})
    } catch (error) {
        return res.status(500).json({message: "an error occured", error})
    }
}

const updateBloggers = async (req, res) => {
    try {
        const {title, content} = req.body
        const {userId, blogId} = req.params
        const findAndUpdate = await blogModel.findById(userId)
        if(!findAndUpdate){
            return res.status(404).json({message: "user not found"})
        }
        const updateblog = findAndUpdate.blogs.id(blogId)
        if(!updateblog){
            return res.status(404).json({message: 'task not found'})
        }
        if(title) updateblog.title = title
        if(content) updateblog.content = content
        await findAndUpdate.save()
        return res.status(200).json({message: "blog updated successfully", data: findAndUpdate })
    } catch (error) {
        return res.status(500).json({message: "an error occured", error})
    }
}

const deleteBloggers = async (req, res) => {
    try {
        const {userId, blogId} = req.params
        const findAndDelete =  await blogModel.findById(userId)
        if(!findAndDelete){
            return res.status(404).json({message: "user not found"})
        }

        const findBlog = await findAndDelete.blogs.id(blogId)
        if(!findBlog){
            return res.status(404).json({message: "blog not found"})
        }
        // findAndDelete.blogs = findAndDelete.blogs.filter(blog => blog._id.toString() !== blogId);
        findAndDelete.blogs.pull(blogId)
        await findAndDelete.save()
        return res.status(200).json({message: "blog deleted successfully", data: findAndDelete})
    } catch (error) {
        return res.status(500).json({message: "an error occured", error})
    }
}

module.exports = {createBlogUser, loginBlog, getBlogs, createBloggers, updateBloggers, deleteBloggers}