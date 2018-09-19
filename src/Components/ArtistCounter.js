import React, { Component } from 'react';

class ArtistCounter extends Component {
    render() {
      return (
        <h2 style={{display: "block", "text-align": "center"}}>
          {this.props.artists} Artists
        </h2>
      )
    }
  }

export default ArtistCounter;