const express = require('express')
const userRouter = express.Router()
const {registerHandler} = require('../controllers/user.controllers')

userRouter.post("/register", registerHandler);

module.exports = userRouter;