import React, { Component } from 'react';

function GenreCounter(props) {

  let genreCount = 0;

  props.artists.forEach( (artist) => {
    genreCount += artist.genres.length
  })

  return (
    <h2 style={{display: "block", "text-align": "center"}}>
      {genreCount} Genres
    </h2>
  )
}

export default GenreCounter;