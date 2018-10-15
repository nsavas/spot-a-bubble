import React, { Component } from 'react';
import './App.css';
import queryString from 'query-string';
import Login from './Components/Login';
import * as d3 from "d3";

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

function ArtistCounter(props) {

  let artistCount = props.artists.length

  return (
    <h2 style={{display: "block", "text-align": "center"}}>
      from your top {artistCount} artists!
    </h2>
  )
}

class D3BubbleChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    }
    this.createBubbleChart = this.createBubbleChart.bind(this)
  }

  componentDidMount() {
    this.createBubbleChart()
  }

  componentDidUpdate() {
    this.createBubbleChart()
  }

  createBubbleChart() {

    let width = window.innerWidth - 10;
    let height = window.innerHeight - 10;
    let data = this.state.data;
    let svg = d3.select(".bubble-chart")
      .append("svg")
      .attr("height", height)
      .attr("width", width)
      .append("g")
      .attr("transform", "translate(0,0)")

    let radiusScale = d3.scaleSqrt().domain(
      d3.extent(data, function(d) {return d['count'];})
    ).range([10, 150])

    let simulation = d3.forceSimulation();

    let circles = svg.selectAll(".artist")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "artist")
      .attr("fill", function(d) {
        return d3.interpolateRdBu(Math.random())
      })
      .attr("stroke", "black")
      .attr("r", function(d) {
        return radiusScale(d['count'])
      })

    // Simulation will apply forces to each
    // data point and define how these data points
    // interact with each other
    simulation.nodes(data).on("tick", updateCircle)
      .force("x", d3.forceX(width / 2).strength(0.04))
      .force("y", d3.forceY(height / 2).strength(0.04))
      .force("collide", d3.forceCollide(function(d) {
        return radiusScale(d['count']) + 4
      }))

    function updateCircle() {
      circles
        .attr("cx", function(d) {
          return d.x = 
            Math.max(radiusScale(d['count']),
            Math.min(width - radiusScale(d['count']),
             d.x))
        })
        .attr("cy", function(d) {
          return d.y = 
            Math.max(radiusScale(d['count']),
            Math.min(height - radiusScale(d['count']),
              d.y))
        })
    }
  }

    render() {
      return (
        <div className="bubble-chart">
        </div>
      )
    }
  }

class App extends Component {
  constructor() {
    super();
    this.state = {
      serverData: {}
    }
  };

  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;

    let params = {
      limit: 50,
      time_range: 'long_term'
    };

    let esc = encodeURIComponent;
    let query = Object.keys(params)
        .map(k => esc(k) + '=' + esc(params[k]))
        .join('&');

    // Fetch user data from /me endpont
    // Access user display name, email, country, and profile picture
    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(data => {
      console.log(data)
      this.setState({
        user: {
          name: data.display_name,
          email: data.email
        }
      })
    })

    // Fetch top 50 artists
    // Requires query params: (limit, time_range)
    // 'items' contains an array of artists objects
    fetch('https://api.spotify.com/v1/me/top/artists?' + query, {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(data => {
      console.log(data)
      // Generate an array of all genres associated with each
      // of the users top genres
      let allGenres = []
      data.items.forEach(function(element) {
        element.genres.forEach(function(g) {
          allGenres.push(g)
        })
      })
      console.log(allGenres)

      // Generate an array of only unique genres
      let uniqueGenres = Array.from(new Set(allGenres))
      console.log(uniqueGenres)

      let genreList = []
      uniqueGenres.forEach(function(g) {

        let count = 0
        allGenres.forEach(function(i) {
          if (i == g) {
            count += 1
          }
        })

        genreList.push({
          genre: g,
          artists: data.items.filter(artist => {
            return artist.genres.includes(g)
          }),
          count: count
        })
      })

      this.setState({
        genres: genreList
      })
    })
  }

  render () {
    let userGenres = this.state.user && this.state.genres
    return (
      <div className="App">
      {this.state.user
      ? <div className="logged-in">
        {userGenres &&
          <div>
            <h1>
              Hi {this.state.user.name}. Here is your listening data:
              {console.log(this.state.genres)}
              <D3BubbleChart data={this.state.genres}/>
            </h1>

          </div>
        } 
        </div>

      : <Login/>
      }
      </div>
    );
  };
};

export default App;