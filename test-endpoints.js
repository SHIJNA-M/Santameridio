// Test all endpoints
const axios = require('axios');

async function testEndpoints() {
    console.log('🧪 Testing WatchesTime Endpoints...\n');

    try {
        // Test health
        console.log('1. Testing health endpoint...');
        const health = await axios.get('http://localhost:5001/api/health');
        console.log('✅ Health:', health.data.status);

        // Test local watches
        console.log('\n2. Testing local watches...');
        const local = await axios.get('http://localhost:5001/api/watches/local');
        console.log('✅ Local watches:', local.data.length, 'items');

        // Test registration
        console.log('\n3. Testing registration...');
        const testUser = {
            username: 'TestUser' + Date.now(),
            email: 'test' + Date.now() + '@example.com',
            password: 'password123'
        };

        const register = await axios.post('http://localhost:5001/api/register', testUser);
        console.log('✅ Registration successful');
        const token = register.data.token;

        // Test premium watches (with token)
        console.log('\n4. Testing premium watches...');
        const premium = await axios.get('http://localhost:5001/api/watches/premium', {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log('✅ Premium watches:', premium.data.length, 'items');

        console.log('\n🎉 All endpoints working perfectly!');
        console.log('\n🌐 Your website is ready at: http://localhost:3000');

    } catch (error) {
        console.error('❌ Test failed:', error.response?.data?.message || error.message);
    }
}

testEndpoints();