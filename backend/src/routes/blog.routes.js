const express = require('express')
const blogRouter = express.Router()
const {createHandler, getHandler, updateHandler, deleteHandler } = require('../controllers/blog.controllers')
const authenticateToken = require('../middlewares/auth.middlewares')

blogRouter.post("/create", authenticateToken, createHandler);
blogRouter.get("/read", getHandler);
blogRouter.put("/update/:id", authenticateToken, updateHandler);
blogRouter.delete("/delete/:id", authenticateToken, deleteHandler);

module.exports = blogRouter;