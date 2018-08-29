import React, { Component } from 'react';
import './App.css';
import video from './background.mp4';

class Aggregate extends Component {
  render () {
    return (
      <h2 style={{"font-size": "20px"}}>
        connect your spotify account to generate an interactive 
      <br/>
        infograph based on your listening data
      </h2>
    );
  }
}

class HomeButton extends Component {
  render () {
    return (
      <div style={{padding: "7px"}} className="home-button">
        <a href="http://localhost:8888/login" className="btn btn-outline-dark btn-lg" role="button">
        get started
        </a>
      </div>
    );
  }
}

class App extends Component {
  render () {

    let headerStyle = {color: "black", "font-size": "50px", padding: "7px"}

    return (
      <div style={{padding: "220px"}} className="App">
        <h1 style={headerStyle}>spot a bubble.</h1>
        <Aggregate/>
        <HomeButton/>
        <Background/>
      </div>
    );
  }
}

class Background extends Component {
  render () {
    return (
      <div className="background-video">
        <video style={{display: "block"}} autoPlay muted loop>
          <source src={video} type="video/mp4" />
          <source src={video} type="video/ogg" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }
}

class Menu extends Component {
  render () {
    return (
      <div className="menu-list">

      </div>
    )
  }
}

export default App;
