const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['Technology', 'Science', 'Travel', 'Food', 'Other'],
    },
    description: {
        type: String,
        required: true,
        minlength: 50,
    },
    author: {
        type: String,
        default: 'Anonymous',   
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

blogSchema.index({ title: 1 });

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
