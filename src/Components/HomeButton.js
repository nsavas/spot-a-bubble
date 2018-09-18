import React, { Component } from 'react';
import '../App.css';

class HomeButton extends Component {
    render () {
      return (
        <div style={{padding: "7px"}} className="home-button">
          <button onClick={() => window.location='http://localhost:8888/login'} type="button" className="btn btn-outline-dark btn-lg">
          get started
          </button>
        </div>
      );
    }
}

export default HomeButton;