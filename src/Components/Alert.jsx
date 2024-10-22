// Alert.js
import React from 'react';

const Alert = ({ message, onClose }) => {
  return (
    <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
      <span>{message}</span>
      <button className="ml-4 text-white" onClick={onClose}>×</button>
    </div>
  );
};

export default Alert;
