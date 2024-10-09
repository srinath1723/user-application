// Importing the express library
const express = require("express");
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
// Creating an express application
const app = express();

app.use(cors());
app.use(express.json());  // Middleware to parse JSON

// API routes
app.use('/users', userRoutes);

// Export the express app
module.exports = app;
