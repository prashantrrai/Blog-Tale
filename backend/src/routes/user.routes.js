const express = require('express')
const userRouter = express.Router()
const {registerHandler, loginHandler} = require('../controllers/user.controllers')

userRouter.post("/register", registerHandler);
userRouter.post("/login", loginHandler);

module.exports = userRouter;