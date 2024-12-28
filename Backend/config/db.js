const mongoose = require('mongoose');
const mongoURI='mongodb://127.0.0.1:27017/internship'
const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
    }
};

module.exports = connectDB;