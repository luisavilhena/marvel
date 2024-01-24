import React from 'react';
import './Loading.css';  // Estilo CSS para o componente de carregamento

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Carregando...</p>
    </div>
  );
};

export default Loading;