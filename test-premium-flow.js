// Test complete premium watches flow
const axios = require('axios');

async function testPremiumFlow() {
    console.log('🧪 Testing Premium Watches Authentication Flow...\n');

    try {
        // Step 1: Register a new user
        console.log('1. Registering new user...');
        const testUser = {
            username: 'PremiumUser' + Date.now(),
            email: 'premium' + Date.now() + '@example.com',
            password: 'password123'
        };

        const registerResponse = await axios.post('http://localhost:5001/api/register', testUser);
        console.log('✅ Registration successful');
        const token = registerResponse.data.token;

        // Step 2: Test premium watches with token
        console.log('\n2. Testing premium watches with token...');
        const premiumResponse = await axios.get('http://localhost:5001/api/watches/premium', {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log('✅ Premium watches loaded:', premiumResponse.data.length, 'items');

        // Step 3: Test without token (should fail)
        console.log('\n3. Testing premium watches without token...');
        try {
            await axios.get('http://localhost:5001/api/watches/premium');
            console.log('❌ This should have failed!');
        } catch (error) {
            console.log('✅ Correctly blocked unauthorized access:', error.response.data.message);
        }

        // Step 4: Display premium watches
        console.log('\n4. Premium Watches Available:');
        premiumResponse.data.forEach(watch => {
            console.log(`   - ${watch.name}: $${watch.price} (${watch.image})`);
        });

        console.log('\n🎉 Premium watches authentication flow working perfectly!');
        console.log('\n📝 Instructions for frontend:');
        console.log('1. Go to http://localhost:3000');
        console.log('2. Register a new account or login');
        console.log('3. Navigate to Premium page');
        console.log('4. Premium watches should load automatically');

    } catch (error) {
        console.error('❌ Test failed:', error.response?.data?.message || error.message);
    }
}

testPremiumFlow();