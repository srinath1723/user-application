const User = require('../models/User');
const createUser = async (req, res) => {
    const { firstName, lastName, phone, email, address } = req.body;
    try {
        const newUser = new User({ firstName, lastName, phone, email, address });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        if (error.code === 11000) {
            // Handle duplicate key error (E11000)
            res.status(400).json({ message: 'Email already exists. Please use a different email.' });
        } else {
            res.status(400).json({ message: error.message });
        }
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    const { firstName, lastName, phone, email, address } = req.body;
    try {
        const existingUser = await User.findById(req.params.id);
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user fields
        existingUser.firstName = firstName;
        existingUser.lastName = lastName;
        existingUser.phone = phone;
        existingUser.email = email;
        existingUser.address = address;

        await existingUser.save();
        res.json(existingUser);
    } catch (error) {
        if (error.code === 11000) {
            // Handle duplicate email error
            res.status(400).json({ message: 'Email already exists. Please use a different email.' });
        } else {
            res.status(400).json({ message: error.message });
        }
    }
};

const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: "User not found" });
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};
