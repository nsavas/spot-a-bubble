import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Aggregate extends Component {
  render () {
    return (
      <h2 style={{"font-size": "20px"}}>connect your spotify account to generate an interactive<br/> infograph based on your listening data</h2>
    );
  }
}

class HomeButton extends Component {
  render () {
    return (
      <div style={{padding: "7px"}} className="home-button">
        <button type="button" className="btn btn-outline-dark btn-lg">get started</button>
      </div>
    );
  }
}

class App extends Component {
  render () {

    let headerStyle = {color: "black", "font-size": "50px", padding: "7px"}

    return (
      <div style={{padding: "200px"}} className="App">
        <h1 style={headerStyle}>hipster spotify</h1>
        <Aggregate/>
        <HomeButton/>
      </div>
    );
  }
}

export default App;
