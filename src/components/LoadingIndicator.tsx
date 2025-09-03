import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

interface LoadingIndicatorProps {
  message?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ message = "The assistant is thinking..." }) => {
  return (
    <div className="loading-indicator">
      <CircularProgress size={20} color="primary" />
      <span className="loading-text">{message}</span>
    </div>
  );
};

export default LoadingIndicator;

