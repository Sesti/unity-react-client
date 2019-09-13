import React from 'react';
import './App.css';
import WeatherModule from './WeatherModule';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Unity dashboard</h1>  
      </header>
      <main className="App-Body">  
        <WeatherModule />
      </main>
    </div>
  );
}

export default App;
