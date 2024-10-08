const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },  // unique: true ensures no duplicate emails
    address: { type: String }
});

module.exports = mongoose.model('User', userSchema);

