// testBackend.js
// A simple script to test backend connectivity

const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function testBackendConnection() {
  console.log('Testing backend connectivity...');
  
  try {
    // Test basic endpoint
    console.log('Testing /api/test endpoint...');
    const testResponse = await axios.get(`${API_URL}/test`);
    console.log('✅ Success:', testResponse.data);
    
    // Test register endpoint with test user
    console.log('\nTesting user registration...');
    const testUser = {
      username: `test_user_${Date.now()}`,
      password: 'password123'
    };
    
    console.log(`Registering user: ${testUser.username}`);
    const registerResponse = await axios.post(`${API_URL}/users/register`, testUser);
    console.log('✅ Registration successful:', registerResponse.data);
    
    // Test login endpoint with the same user
    console.log('\nTesting user login...');
    const loginResponse = await axios.post(`${API_URL}/users/login`, testUser);
    console.log('✅ Login successful:', loginResponse.data);
    
    // Test auth-protected endpoint
    console.log('\nTesting protected endpoint...');
    const token = loginResponse.data.token;
    const profileResponse = await axios.get(`${API_URL}/users/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('✅ Profile access successful:', profileResponse.data);
    
    console.log('\n✅ All tests passed! Backend is working correctly.');
  } catch (error) {
    console.error('\n❌ Error testing backend:');
    
    if (error.response) {
      // The server responded with a status code outside the 2xx range
      console.error(`Status: ${error.response.status}`);
      console.error('Response:', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received. Is the server running?');
    } else {
      // Something happened in setting up the request
      console.error('Error message:', error.message);
    }
  }
}

testBackendConnection();