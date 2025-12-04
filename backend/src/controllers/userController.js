const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');

const generateToken = (email) => {
    return jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register a new user
// @route   POST /api/users/register
const createUser = async (req, res) => {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
        return res.status(400).json({ error: 'Fields cannot be empty' });
    }

    try {
        const existingUser = await userModel.getUser(email);
        
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await userModel.createUser(email, username, hashedPassword);

        res.status(201).json({
            success: "Successfully created new user",
            email: newUser.email,
            username: newUser.username,
            token: generateToken(newUser.email)
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An internal problem has occurred' });
    }
};

// @desc    Authenticate a user
// @route   POST /api/users/login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please include email and password' });
    }

    try {
        const user = await userModel.getUser(email);

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                email: user.email,
                username: user.username,
                token: generateToken(user.email)
            });
        } else {
            res.status(401).json({ message: 'Wrong username or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An internal problem has occurred' });
    }
};

// @desc    Get current user data (Protected)
// @route   GET /api/users/me
const getUser = async (req, res) => {
    // req.user is set by the authMiddleware
    res.status(200).json(req.user);
};

// @desc    Update user profile (Username only for now)
// @route   PUT /api/users/me
const updateUser = async (req, res) => {
    const { username } = req.body;
    const email = req.user.email; // Identify user from Token, not body

    try {
        const updatedUser = await userModel.updateUser(email, username);

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'User updated successfully',
            user: updatedUser
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An internal problem has occurred' });
    }
};

// @desc    Delete user account
// @route   DELETE /api/users/me
const deleteUser = async (req, res) => {
    const email = req.user.email; // Identify user from Token

    try {
        const deletedUser = await userModel.deleteUser(email);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ 
            message: 'User deleted successfully',
            id: deletedUser.email 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An internal problem has occurred' });
    }
};

module.exports = {
    createUser,
    loginUser,
    getUser,
    updateUser, 
    deleteUser  
};