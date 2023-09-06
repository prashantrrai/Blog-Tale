const userModel = require('../models/user.models')

const registerHandler = async (req, res) => {
    try {
        // console.log(req.body)
        const { name, email, password } = req.body

        // Check if the email already exists in the database
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email already registered',
            });
        }

        // If the email doesn't exist, proceed with registration
        const registrationData = new userModel({ name: name, email: email, password: password })
        await registrationData.save()

        res.status(201).json({
            success: true,
            message: 'Registration successful',
            payload: registrationData,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error: error.message })
    }
}

const loginHandler = async (req, res) => {
    try {
        const { email, password } = req.body;
        // console.log(req.body)

        // Check if the user with the provided email exists in the database
        const user = await userModel.findOne({ email });
        // console.log("38", user)
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Email does not exists',
            });
        }

        // Compare the provided password with the stored hashed password
        // const isPasswordValid = await bcrypt.compare(password, user.password);
        const userpassword = user.password;
        // console.log("48", userpassword)
        if (password !== userpassword) {
            return res.status(401).json({
                success: false,
                message: 'Wrong or Invalid Password',
            });
        }

        
        // If both email and password are valid, consider the user logged in
        // You can generate and return a JWT (JSON Web Token) here for authentication purposes

        res.status(200).json({
            success: true,
            message: 'Login successful',
            payload: user, // You can send user data here if needed
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error: error.message })
    }
}


module.exports = { registerHandler, loginHandler };