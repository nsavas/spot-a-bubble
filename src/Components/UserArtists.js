import React, { Component } from 'react';

class UserArtists extends Component {
    render() {
      const allArtists = this.props.artists.reduce((genres, eachGenre) => {
        return genres.concat(eachGenre.artists)}, []) 
      return (
        <div>
          <h2>
            Here are the artists: {allArtists}
          </h2>
        </div>
      )
    }
  }

export default UserArtists;