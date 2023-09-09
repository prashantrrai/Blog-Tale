const Blog = require('../models/blog.models')



const createHandler = async (req, res) => {
    try {
        const { title, category, description, author } = req.body

        if (!title || !category || !description) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields: title, category, description',
            });
        }

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
        const {
            page = 1,
            limit = 10,
            sortField = 'createdAt',
            sortOrder = 'desc',
            search = '',
            startDate = '',
            endDate = '',
            author = '',
            category = '',
        } = req.query;

        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);

        if (isNaN(pageNumber) || isNaN(limitNumber) || pageNumber < 1 || limitNumber < 1) {
            return res.status(400).json({
                success: false,
                message: 'Invalid pagination parameters',
            });
        }

        const filter = {};

        if (search) {
            filter.$text = { $search: search };
        }

        if (startDate || endDate) {
            filter.createdAt = {};
            if (startDate) {
                filter.createdAt.$gte = new Date(startDate);
            }
            if (endDate) {
                filter.createdAt.$lte = new Date(endDate);
            }
        }

        if (author) {
            filter.author = author;
        }

        if (category) {
            filter.category = category;
        }

        const query = Blog.find(filter)
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber)
            .sort({ [sortField]: sortOrder });

        const blogposts = await query.exec();

        res.status(200).json({
            success: true,
            message: 'Blog posts retrieved successfully',
            blogposts,
        });
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, error: error.message })
    }
}

const updateHandler = async (req, res) => {
    try {
        // const { title, category, description, author } = req.body
        const id = req.params.id
        const title = req.body.updateblogdata.title;
        const category = req.body.updateblogdata.category;
        const description = req.body.updateblogdata.description;
        const author = req.body.updateblogdata.author;

        if (!title || !category || !description) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields: title, category, description',
            });
        }

        const updatedFields = {
            title,
            category,
            description,
            author,
        };

        const updatedBlogData = await Blog.findByIdAndUpdate(id, updatedFields, { new: true });
        if (!updatedBlogData) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Blog updated successfully',
            blogData: updatedBlogData,
        });
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: 'Failed to update the blog',
            error: error.message,
        });
    }
}

const deleteHandler = async (req, res) => {
    try {
        const Id = req.params.id

        const blogpost = await Blog.findByIdAndDelete(Id)


        res.status(200).json({
            success: true,
            message: 'Blog Deleted Successfully',
            blogpost: blogpost
        });
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: 'Failed to delete the blog',
            error: error.message,
        });
    }
}

module.exports = { createHandler, getHandler, updateHandler, deleteHandler };