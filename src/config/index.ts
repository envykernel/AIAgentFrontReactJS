// Configuration pour les différents environnements
export const config = {
  // URL de l'API backend
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5107',
  
  // Timeout pour les requêtes API (en millisecondes)
  API_TIMEOUT: 30000,
  
  // Configuration CORS
  CORS_CONFIG: {
    mode: 'cors' as RequestMode,
    credentials: 'omit' as RequestCredentials,
  }
};

// Types pour la configuration
export interface ApiConfig {
  API_BASE_URL: string;
  API_TIMEOUT: number;
  CORS_CONFIG: {
    mode: RequestMode;
    credentials: RequestCredentials;
  };
}
