// Configuration pour les différents environnements
export const config = {
  // URL de l'API backend
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5107',
  
  // Timeout pour les requêtes API (en millisecondes)
  API_TIMEOUT: 30000,
  
  // Durée de session en millisecondes (2 minutes par défaut)
  SESSION_DURATION: 2 * 60 * 1000, // 2 minutes
  
  // Configuration des couleurs du thème
  THEME_COLORS: {
    primary: '#6366f1',        // Indigo principal (token button color)
    primaryHover: '#5b21b6',   // Indigo plus foncé pour hover
    primaryLight: '#8b5cf6',   // Violet pour gradients
    primaryDark: '#4f46e5',    // Indigo foncé
    success: '#10b981',        // Vert pour succès
    warning: '#f59e0b',        // Orange pour avertissements
    error: '#ef4444',          // Rouge pour erreurs
    background: '#f8f9ff',     // Fond avec teinte violette
    surface: '#ffffff',        // Surface principale
    text: '#1f2937',           // Texte principal
    textSecondary: '#6b7280',  // Texte secondaire
    border: 'rgba(99, 102, 241, 0.1)', // Bordure avec teinte violette
    shadow: 'rgba(99, 102, 241, 0.15)' // Ombre avec teinte violette
  },
  
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
  SESSION_DURATION: number;
  THEME_COLORS: {
    primary: string;
    primaryHover: string;
    primaryLight: string;
    primaryDark: string;
    success: string;
    warning: string;
    error: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    shadow: string;
  };
  CORS_CONFIG: {
    mode: RequestMode;
    credentials: RequestCredentials;
  };
}
