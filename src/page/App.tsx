import React from 'react';
import logo from '../asset/logo.svg';
import '../style/App.css';
import { BrowserRouter, Link } from 'react-router-dom';

function App() {
  return (
    <nav>
      <div className='wrapper'>
        <table>
          <tr>
            <a href='/game'><div className='navButton'>Play!</div></a>
          </tr>
          <tr>
            <a href='/score'><div className='navButton' id='nonFirstButton'>Scoreboard!</div></a>
          </tr>
        </table>
      </div>
    </nav>
  );
}

export default App;
