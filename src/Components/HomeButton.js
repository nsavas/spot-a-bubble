import React, { Component } from 'react';

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

export default HomeButton;