import React, { useState } from 'react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
import './App.css';

const App = () => {
  const [x, setX] = useState('');
  const [y, setY] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [currentPage, setCurrentPage] = useState('generatePlot');

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

  const handleSubmitRelease = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://xiqing-back-1.onrender.com/generate_plot_release', {
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
      <nav className="navbar">
        <button className={currentPage === 'generatePlot' ? 'active' : ''} onClick={() => {setCurrentPage('generatePlot'); setX(''); setY(''); setImageSrc('');}}>Absorption</button>
        <button className={currentPage === 'generatePlotRelease' ? 'active' : ''} onClick={() => {setCurrentPage('generatePlotRelease'); setX(''); setY(''); setImageSrc('');}}>Desorption</button>
      </nav>
      {currentPage === 'generatePlot' ? (<><h1>Hydrogen Absorption Model Plot</h1>
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
      <div>{imageSrc && <><img src={imageSrc} alt="Plot" className="plot-image" /><div>
      <BlockMath math="y = \frac{K}{(1 + 4000e^{-Bx})^{0.3}}" />
      <BlockMath math="K = -572.872341576V - 0.89982819062T + 801.704037275 + 354.67789388V^2" />
      <BlockMath math="B = -0.33631875971V - 0.0559766169332T + 4.9467224951" />
      </div></>}</div>
      
      </>) : <><h1>Hydrogen Desorption Model Plot</h1>
      <form onSubmit={handleSubmitRelease}>
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
      <div>{imageSrc && <><img src={imageSrc} alt="Plot" className="plot-image" /><div>
      <BlockMath math="y = \frac{A}{1 + e^{-K(x-C)}}" />
      <BlockMath math="A = -467.543856173V - 2.94691441564T + 897.98773058 + 153.048114948V^2" />
      <BlockMath math="K = 0.159775370844V - 0.0970233190479T + 7.72009208192" />
      <BlockMath math="C = 0.178672195081V - 0.0550430835279T + 4.66345107942" />
      </div></>}</div></>}
    </div>
  );
};

export default App;
