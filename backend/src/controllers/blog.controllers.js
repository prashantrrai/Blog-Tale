const Blog = require('../models/blog.models')

const createHandler = async (req, res) => {
    try {
        const { title, category, description, author } = req.body

        const blogData = new Blog({ title, category, description, author })
        await blogData.save()

        res.status(201).json({
            success: true,
            message: 'Blog Added Successfully',
            blogData: blogData
        });
    } catch (error) {
        console.error(error)

        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Error Validation',
                error: error.message,
            });
        }

        res.status(500).json({
            success: false,
            message: 'Failed to create a blog',
            error: error.message,
        });
    }
}

const getHandler = async (req, res) => {
    try {
        const blogpost = await Blog.find()

        res.status(200).send(blogpost);
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error: error.message })
    }
}

const updateHandler = async (req, res) => {
    try {
        const Id = req.params.id
        console.log(Id)
        const { title, category, description, author } = req.body

        const blogData = await Blog.findByIdAndUpdate(Id, { title: title, category: category, description: description, author: author })

        res.status(200).json({
            success: true,
            message: 'Blog Updated Successfully',
            blogData: blogData
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error: error.message })
    }
}

const deleteHandler = async (req, res) => {
    try {
        const Id = req.params.id
        console.log(Id)

        const blogpost = await Blog.findByIdAndDelete(Id)


        res.status(200).json({
            success: true,
            message: 'Blog Deleted Successfully',
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error: error.message })
    }
}

module.exports = { createHandler, getHandler, updateHandler, deleteHandler };