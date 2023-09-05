const userModel = require('../models/user.models')

const registerHandler = async (req, res) => {
    try {
        console.log(req.body)
        const {name, email, password} = req.body

        const registrationData = new userModel({name: name, email: email, password: password})
        await registrationData.save()
        res.status(200).json({success: true, message: "Registration Successfull", registrationData})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, error: error.message})
    }
}

module.exports = {registerHandler};