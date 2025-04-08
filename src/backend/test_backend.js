// Save this as src/backend/test-create-user.js

// Import required modules
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import user model
const User = require('./models/userModel');

// Function to create a test user
async function createTestUser() {
  try {
    // Connect to the MongoDB database
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('Connected to MongoDB database');
    
    // Define test user credentials
    const testUsername = 'testuser';
    const testPassword = 'password123';
    
    // Check if user already exists
    const existingUser = await User.findOne({ username: testUsername });
    
    if (existingUser) {
      console.log(`User '${testUsername}' already exists, deleting...`);
      await User.deleteOne({ username: testUsername });
      console.log(`Deleted existing user '${testUsername}'`);
    }
    
    // Generate salt and hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(testPassword, salt);
    
    console.log(`Generated hashed password: ${hashedPassword.substring(0, 20)}...`);
    
    // Create new user
    const newUser = new User({
      username: testUsername,
      password: hashedPassword,
      pantryItems: [
        { name: 'Test Item', count: 3 }
      ]
    });
    
    // Save user
    const savedUser = await newUser.save();
    
    console.log(`Successfully created test user '${testUsername}'`);
    console.log(`User ID: ${savedUser._id}`);
    console.log(`You can now login with username '${testUsername}' and password '${testPassword}'`);
    
    // Disconnect from the database
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB database');
    
  } catch (error) {
    console.error('Error creating test user:', error);
  }
}

// Execute the function
createTestUser();