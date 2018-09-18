import React, { Component } from 'react';
import '../App.css';

import Header from './Header';
import HomeButton from './HomeButton';
import HomeBackground from './HomeBackground';

class Login extends Component {
    render() {
        return (
        <div className="login">
            <Header/>
            <HomeButton/>
            <HomeBackground/>
        </div>
        )
    }
}

export default Login;