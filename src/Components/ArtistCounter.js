import React, { Component } from 'react';

class ArtistCounter extends Component {
    render() {
      return (
        <div>
          <div>
            <h2 style={{display: "block", "text-align": "center"}}>
              {this.props.artists} Artists
            </h2>
          </div>
        </div>
      )
    }
  }

export default ArtistCounter;