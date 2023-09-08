const express = require('express')
const userRouter = express.Router()
const {registerHandler, loginHandler, userdataHandler} = require('../controllers/user.controllers')
const authenticateToken = require('../middlewares/auth.middlewares')

userRouter.post("/register", registerHandler);
userRouter.post("/login", loginHandler);
userRouter.get("/userdata", authenticateToken, userdataHandler);

module.exports = userRouter;