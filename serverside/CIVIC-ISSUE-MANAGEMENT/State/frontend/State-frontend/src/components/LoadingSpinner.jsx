import React from 'react';

const LoadingSpinner = ({ size = 'medium', message = 'Loading...' }) => {
  const sizeClasses = {
    small: 'h-8 w-8',
    medium: 'h-16 w-16',
    large: 'h-24 w-24'
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
      <div className={`animate-spin rounded-full ${sizeClasses[size]} border-t-4 border-b-4 border-blue-500`}></div>
      {message && (
        <p className="mt-4 text-gray-600 text-lg">{message}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
