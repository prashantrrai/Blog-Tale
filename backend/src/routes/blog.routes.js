const express = require('express')
const blogRouter = express.Router()
const {createHandler, getHandler, updateHandler, deleteHandler } = require('../controllers/blog.controllers')
const authenticateToken = require('../middlewares/auth.middlewares')
const multer  = require('multer')
// const upload = multer({dest: "Uploads/"})
const path = require('path');
const img_path = path.join(__dirname, "../Public/Uploads");


const storage = multer.diskStorage({
  destination: function(req, file, cb){
    return cb(null, img_path)
  },
  filename: function(req, file, cb){
    return cb(null, `${Date.now()}-${file.originalname}`)
  }
})

const upload = multer({storage})


blogRouter.post("/create", upload.single('blogImage'), createHandler)
blogRouter.get("/read", getHandler);
blogRouter.put("/update/:id", upload.single('blogImage'), authenticateToken, updateHandler);
blogRouter.delete("/delete/:id", authenticateToken, deleteHandler);

module.exports = blogRouter;