import React, { Component } from 'react';
import './App.css';
import queryString from '../node_modules/query-string';
import Login from './Components/Login';
import * as d3 from "d3";

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
    let width = window.innerWidth;
    let height = window.innerHeight;
    let data = this.state.data;
    let svg = d3.select(".bubble-chart")
      .append("svg")
      .attr("height", height)
      .attr("width", width)
      .attr("display", "block")
      .append("g")
      .attr("transform", "translate(7,10)")

    // Scales genre frequency based on count attribute
    let radiusScale = d3.scaleSqrt().domain(
      d3.extent(data, function(d) {return d['count'];})
    ).range([15, 140])

    // Simulation object used to apply forces to each bubble
    let simulation = d3.forceSimulation();

    // Div element will be used to display bubble data on mouseover
    d3.select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0.5)

    // Append a circle to SVG for each genre
    let circles = svg.selectAll(".artist")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "artist")
      .attr("fill", function(d) {
        return d3.interpolateRainbow(Math.random()) // Randomize bubble color
      })
      .attr("stroke", "black")
      .attr("r", function(d) {
        return radiusScale(d['count']) // Use scale to determine bubble radius
      })
      .style("opacity", 0.7)
      .on("mouseover", function(d) {
        d3.select(this).attr("r", function(d) {
          return radiusScale(d['count']) + 10; // On mouseover, increase radius by 10
        })

        d3.select(this)
          .transition()
          .duration(200)
          .attr("x", function(d) {
            return d.x - 30
        })
          .style("cursor", "pointer")
          .attr("width", 60)

        d3.select(".tooltip").transition()
          .duration(500)
          .style("opacity", 0.9)
          .style("display", "block")

        // Create an array of artists associated with bubbles genre
        let artistList = []

        d.artists.forEach(artist => {
          artistList.push(artist.name)
        })

        d3.select(".tooltip").html("<b>Genre: </b></br>" 
          + d['genre'] + "</br>"
          + "<b>Artists: </b></br>" 
          + artistList.join("</br>")) // Makes artistList a string joined with a breakline
          .style("left", "1290px")
          .style("top", "240px")
      })
      .on("mouseout", function(d) { // On mouseout, reduce bubble radius back to original
        d3.select(this).attr("r", function(d) {
          return radiusScale(d['count']);
        })
      })

    // Simulation will apply forces to each
    // data point and define how these data points
    // interact with each other
    simulation.nodes(data).on("tick", updateCircle)
      .force("x", d3.forceX(width / 2).strength(0.04))
      .force("y", d3.forceY(height / 2).strength(0.04))
      .force("collide", d3.forceCollide(function(d) {
        return radiusScale(d['count']) + 8
      }))

    // On each tick, update bubbles location
    function updateCircle() {
      circles
        .attr("cx", function(d) {
          return d.x = // Keeps bubbles within width bounds
            Math.max(radiusScale(d['count']),
            Math.min(width - 290 - radiusScale(d['count']),
             d.x))
        })
        .attr("cy", function(d) {
          return d.y = // Keeps bubbles within height bounds
            Math.max(radiusScale(d['count']),
            Math.min(height - radiusScale(d['count'] + 20),
              d.y))
        })
    }
  }
    render() {
      return (<div className="bubble-chart"></div>)
    }
  }

// Main app component. Formats and fetches data to be sent to D3BubbleChart
// Renders login page and application
class App extends Component {
  constructor() {
    super();
    this.state = {}
  };

  componentDidMount() {
    // Grab access token from url
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    console.log(accessToken);

    // Query params to be passed to API endpoint
    let params = {
      limit: 50,
      time_range: 'long_term'
    };

    // Encode each query paramater 
    let esc = encodeURIComponent;
    let query = Object.keys(params)
        .map(k => esc(k) + '=' + esc(params[k]))
        .join('&');

    // Fetch user data from /me endpont
    // Access user display name, email, country, and profile picture
    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json()).then(data => {
      console.log(data);
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
    }).then(response => response.json()).then(data => {
      console.log(data);

      // Generate an array of all genres associated with each artist object
      let allGenres = []
      let artistCount = data.items.length
      data.items.forEach(function(element) {
        element.genres.forEach(function(g) {
          allGenres.push(g)
        })
      })

      // Generate an array of only unique genres
      let uniqueGenres = Array.from(new Set(allGenres))
      console.log(uniqueGenres)

      let genreList = []
      uniqueGenres.forEach(function(g) {

        // Count frequency of each genre
        let count = 0
        allGenres.forEach(function(i) {
          if (i === g) {
            count += 1
          }
        })

        // For each unique genre, create a genre object containing
        // its name, associated artists, and genre frequency
        // Push each object to GenreList array

        // GenreList will be the data used for d3 visualization
        genreList.push({
          genre: g,
          artists: data.items.filter(artist => {
            return artist.genres.includes(g)
          }),
          count: count
        })
      })

      let genreCount = genreList.length;

      this.setState({
        genres: genreList,
        genreCount: genreCount,
        artistCount: artistCount
      })
    })

    let date = new Date();

    // Format the current time to AMPM
    // This will be displayed upon user login
    function formatTimeToAMPM(date) {
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let ampm = hours >= 12 ? 'PM' : 'AM';

      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes < 10 ? '0' + minutes : minutes;

      let timeInAMPM = hours + ":" + minutes + " " + ampm
      return timeInAMPM
    }

    let currentTime = formatTimeToAMPM(date);

    this.setState({
      date: {
        time: currentTime
      }
    })

  }

  render () {
    // If user exists, set userGenres to genreList
    let userGenres = this.state.user && this.state.genres
    return (
      <div className="App">
      {this.state.genres // If user is logged in, display visualization. If not, display login screen
      ? <div className="logged-in">
        {userGenres &&
          <div>
            <h1 style={{color: "white", "textAlign": "inline", "fontFamily": "Armata, sans-serif"}}>
              <b>Logged in as:</b> {this.state.user.name} @ {this.state.date.time}
              <br/>
              <b>Email:</b> {this.state.user.email}
            </h1>
            <h1 style={{color: "white", "textAlign": "center", "fontFamily": "Armata, sans-serif"}}>
              <b>{this.state.genreCount}</b> genre bubbles representing your top <b>{this.state.artistCount}</b> artists
              <br/><br/>
              Hover your mouse over a bubble to see what genre it represents and its corresponding artists.
              <br/><br/>
              The larger the bubble, the higher its listening frequency!
            </h1>
              {console.log(this.state.genres)}
              <D3BubbleChart data={this.state.genres}/>
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