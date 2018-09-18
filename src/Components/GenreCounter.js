import React, { Component } from 'react';

class GenreCounter extends Component {
    render() {
      return (
        <div>
          <h2 style={{display: "block", "text-align": "center"}}>
            {this.props.genreCount} Genres
          </h2>
        </div>
      )
    }
  }

export default GenreCounter;