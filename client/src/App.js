import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
// import ReactLoading from "react-loading";
import Profile from './Pages/Profile'
//Pages
import Login from './Pages/Auth/Login'
import Signup from './Pages/Auth/Signup'
// import Home from './Pages/Home'
import Navbar from './Pages/Navbar'
import { baseURL } from './config/Fire'
//Firebase Settings
import firebase from './config/Fire';
import axios from 'axios';
import Flights from './Pages/Flights';
import FlightDetail from './Pages/FlightDetail';
import MyProfile from './Pages/MyProfile'
import Footer from './Pages/Footer';



class App extends Component {
    state = {
        user: {}
    }


    componentDidMount() {
        this.authListener();
    }

    //Checking if user is logged in
    authListener() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user }, () => {
                    axios.post(`${baseURL}/api/newUser`, {
                        email: this.state.user.email,
                        uid: this.state.user.uid
                    }).then((res) => {
                        console.log(res)
                    }).catch((err) => {
                        console.log(err)
                    })
                })
            } else {
                this.setState({ user: false })
            }
        });
    }

    render() {
        
        console.log("THIS IS FROM APP.JS=============", this.state.user.email)
        return (
            <div>
                        <Navbar {...this.props} user={this.state.user}/>
                        <Switch>
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/signup" component={Signup} />
                            <Route exact path="/" component={ (props) => <Flights {...props} user={this.state.user} /> } />
                            <Route exact path="/flightdetail/:id" component={ (props) => <FlightDetail {...props} user={this.state.user} />} />
                            <Route exact path="/profile/:uid" component={ (props) => <Profile {...props} uid={this.state.user.uid} />} />
                            <Route exact path="/myProfile" component={ (props) => <MyProfile {...props} uid={this.state.user.uid} />} />

                        </Switch>
                       
                        </div>
        );
    }
}


export default App;