import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch}
from 'react-router-dom';
import './App.css';

import Login from './Components/Login';

class App extends Component {
  constructor() {
    super();
    this.state = {
        fakeServerData: {
          genres: {},
          artists: {}
        }
      }
    }

  ComponentDidMount() {
    this.setState = {
      genres: {},
      artists: {}
    }
  }

  render () {
    return (
      <Router>
        <div className="App">
          <Login/>
      </div>
      </Router>
    );
  }
};

export default App;
