import React, { Component } from 'react';
import '../App.css';

class Header extends Component {
    render () {
  
      let headerStyle = {color: "black", "font-size": "70px", padding: "7px"}
  
      return (
        <div className="header">
          <h1 style={headerStyle}>
            spot a bubble.
          </h1>
          <h2 style={{"font-size": "20px", "font-weight": "normal"}}>
            connect your spotify account to generate an interactive 
          <br/>
            bubble chart based on your listening data
          </h2>
        </div>
      );
    }
  }

export default Header;