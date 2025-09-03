// Test file to verify API integration
// This can be run in the browser console to test the API

import { apiService } from '../services/api';

// Test function to verify API connection
export async function testApiConnection() {
  try {
    console.log('Testing API connection...');
    
    // Test health check
    const health = await apiService.healthCheck();
    console.log('Health check:', health);
    
    // Test CORS
    const cors = await apiService.testCors();
    console.log('CORS test:', cors);
    
    // Test chat message (new session)
    const chatResponse = await apiService.sendChatMessage({
      message: 'Hello, this is a test message!'
    });
    console.log('Chat response:', chatResponse);
    
    return {
      success: true,
      health,
      cors,
      chatResponse
    };
  } catch (error) {
    console.error('API test failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Export for use in browser console
if (typeof window !== 'undefined') {
  (window as any).testApiConnection = testApiConnection;
}
