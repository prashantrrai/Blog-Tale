const express = require('express')
const blogRouter = express.Router()
const {createHandler, getHandler, updateHandler, deleteHandler } = require('../controllers/blog.controllers')

blogRouter.post("/create", createHandler);
blogRouter.get("/read", getHandler);
blogRouter.put("/update/:id", updateHandler);
blogRouter.delete("/delete/:id", deleteHandler);

module.exports = blogRouter;