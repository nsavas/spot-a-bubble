import React, { Component } from 'react';
import video from './background.mp4';
import '../App.css';

class HomeBackground extends Component {
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

export default HomeBackground;