import React, { Component } from 'react';
import './App.css';

import Header from './Components/Header';
import HomeButton from './Components/HomeButton';
import HomeBackground from './Components/HomeBackground';

class App extends Component {
  render () {
    return (
      <div className="App">
        <Header/>
        <HomeButton/>
        <HomeBackground/>
      </div>
    );
  }
}

export default App;
