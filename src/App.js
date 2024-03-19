import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [x, setX] = useState('');
  const [y, setY] = useState('');
  const [imageSrc, setImageSrc] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://xiqing-back-1.onrender.com/generate_plot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ x, y }),
      });
      const data = await response.json();
      setImageSrc(`data:image/png;base64,${data.plotBase64}`);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <h1>Hydrogen Absorption Model Plot</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="x">Enter Velocity Value:</label>
          <input
            type="text"
            id="x"
            value={x}
            onChange={(e) => setX(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="y">Enter Temperature Value:</label>
          <input
            type="text"
            id="y"
            value={y}
            onChange={(e) => setY(e.target.value)}
            required
          />
        </div>
        <button type="submit">Generate Plot</button>
      </form>
      <div>{imageSrc && <img src={imageSrc} alt="Plot" className="plot-image" />}</div>
    </div>
  );
};

export default App;
