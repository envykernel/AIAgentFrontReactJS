import React, { useState } from 'react';
import { apiService } from '../services/api';

const ApiTestComponent: React.FC = () => {
  const [testResult, setTestResult] = useState<string>('');
  const [isTesting, setIsTesting] = useState(false);

  const testApiConnection = async () => {
    setIsTesting(true);
    setTestResult('Test en cours...');
    
    try {
      // Test 1: Health check
      const health = await apiService.healthCheck();
      setTestResult(`✅ Health check réussi: ${health.status}`);
      
      // Test 2: CORS
      const cors = await apiService.testCors();
      setTestResult(prev => `${prev}\n✅ CORS test réussi: ${cors.message}`);
      
      // Test 3: Chat message
      const chatResponse = await apiService.sendChatMessage({
        message: 'Test de connexion API'
      });
      setTestResult(prev => `${prev}\n✅ Chat test réussi: Session ${chatResponse.sessionId}`);
      
    } catch (error) {
      setTestResult(`❌ Erreur: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div style={{ 
      position: 'fixed', 
      top: '10px', 
      right: '10px', 
      background: 'white', 
      padding: '10px', 
      border: '1px solid #ccc', 
      borderRadius: '5px',
      zIndex: 1000,
      maxWidth: '300px'
    }}>
      <h4>Test API</h4>
      <button 
        onClick={testApiConnection} 
        disabled={isTesting}
        style={{ marginBottom: '10px' }}
      >
        {isTesting ? 'Test en cours...' : 'Tester la connexion API'}
      </button>
      <pre style={{ 
        fontSize: '12px', 
        whiteSpace: 'pre-wrap', 
        wordBreak: 'break-word',
        background: '#f5f5f5',
        padding: '5px',
        borderRadius: '3px'
      }}>
        {testResult}
      </pre>
    </div>
  );
};

export default ApiTestComponent;
