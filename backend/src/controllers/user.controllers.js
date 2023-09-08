const bcrypt = require('bcrypt');
const userModel = require('../models/user.models')
const jwt = require('jsonwebtoken');
require("dotenv").config();
const jwtSecretKey = process.env.MySecretkey;


const registerHandler = async (req, res) => {
    try {
        const { fname, lname, email, password } = req.body
        console.log(req.body)

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email already registered',
            });
        }

        const registrationData = new userModel({ fname, lname, email, password })
        await registrationData.save()

        const token = jwt.sign({ RegId: registrationData._id }, jwtSecretKey, { expiresIn: '1h' });

        res.status(201).json({
            success: true,
            message: 'Registration successful',
            registrationData: registrationData,
            token: token,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error: error.message })
    }
}




const loginHandler = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Email does not exists',
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Wrong or Invalid Password',
            });
        }

        const token = jwt.sign({ userId: user._id }, jwtSecretKey, { expiresIn: '1h' });

        res.status(200).json({
            success: true,
            message: 'Authentication successful',
            loginData: user,
            token: token,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error: error.message })
    }
}


module.exports = { registerHandler, loginHandler };