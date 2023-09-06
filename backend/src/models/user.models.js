const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: validator.isEmail,
            message: 'Invalid email address',
        },
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Hashing the password before saving it to the database
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        const saltRounds = 10;
        user.password = await bcrypt.hash(user.password, saltRounds);
    }
    next();
});

// Creating index on the 'email' field for faster queries
userSchema.index({ email: 1 });

const User = mongoose.model('User', userSchema);

module.exports = User;
