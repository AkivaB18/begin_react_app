// backend/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Build connection string from env variables
    const MONGO_URI = process.env.MONGO_URI;
    
    if (!MONGO_URI) {
      throw new Error('MongoDB connection string not found in environment variables');
    }
    
    console.log('Connecting to MongoDB...');
    
    // Connect with improved options
    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of 30
      heartbeatFrequencyMS: 30000, // Default is 10000
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Add event listeners for connection issues
    mongoose.connection.on('error', err => {
      console.error('MongoDB connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected. Attempting to reconnect...');
    });
    
    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB reconnected');
    });
    
    return conn;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    // Print more details if available
    if (error.name === 'MongoParseError') {
      console.error('Invalid MongoDB connection string format');
    } else if (error.name === 'MongoServerSelectionError') {
      console.error('Could not connect to any MongoDB servers');
      console.error('Please check your network connection and MongoDB URI');
    }
    // Exit with failure
    process.exit(1);
  }
};

module.exports = connectDB;