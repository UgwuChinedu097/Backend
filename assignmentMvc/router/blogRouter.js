const express = require('express')
const { createBlogUser, loginBlog, createBloggers, updateBloggers, deleteBloggers, getBlogs } = require('../blogController/blogController')
const blogRouter = express.Router()


blogRouter.post('/create', createBlogUser)
blogRouter.post('/login', loginBlog)
blogRouter.get('/:id', getBlogs)
blogRouter.post('/createBlog/:id', createBloggers)
blogRouter.patch('/:userId/blogs/:blogId', updateBloggers)
blogRouter.delete('/:userId/blogs/:blogId', deleteBloggers)

module.exports = blogRouter