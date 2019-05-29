import React, { Component, Fragment } from 'react';
import firebase, { googleProvider, facebookProvider } from "../../config/Fire";
import { Link, Redirect } from 'react-router-dom'
import axios from "axios";

class Login extends Component {

    state = {
        email: "",
        password: "",
        message: null,
        loggedIn: false
    }

    componentDidMount() {
        console.log(this)
        axios.post('http://localhost:5000/login')
            .then((u) => {
                console.log(u.data)
            })
    }


    //Firebase Sign In
    login = (e) => {
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((u) => {
                console.log(u);
                console.log(this)
                //debugger
               if(this.props.location.state)
                {
                    window.setTimeout(() => this.props.history.push(this.props.location.state.prevPath),0)
                } else {
                    this.props.history.push('/')

                }
 

                //BUG
                axios.post("http://localhost:5000/login").then(res => {
                    console.log("asdasdsadsad", res.data);
                })
                    .catch(err => {
                        console.error(err)
                    })

                this.setState({
                    loggedIn: true
                })
            }
            ).catch((error) => {
                this.setState({
                    message: error.message
                })
                console.log(error)
            })
    }

    //Google Log In
    googleLogin = () => {
        firebase.auth().signInWithPopup(googleProvider)
            .then((u) => {

                console.log(u);
                axios.post("http://localhost:5000/login", { uid: u.uid, email: u.email }).then(res => {
                    console.log("asdasdsadsad", res);
                }).catch(err => { console.error(err) })

                this.setState({
                    loggedIn: true
                })

            }
            ).catch((error) => {
                console.log(error)
            })
    };


    //Facebook Log In

    facebookLogin = () => {
        firebase.auth().signInWithPopup(facebookProvider)
            .then((u) => { console.log(u) }
            ).catch((error) => {

                this.setState({
                    loggedIn: true
                })
                console.log(error)
            })
    };




    //On Change form listener
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


//http://localhost:3000/flightdetail/1?date=2019-05-30T00:00:00&to=Sydney&from=Miami&carrier=Qantas
    render() {
        return (
            <Fragment>
                {/* {this.state.loggedIn ? <Redirect to="/" /> : false} */}
                <div className="simple-login-container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 text-center text-secondary">
                            <h2>Sign In</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 form-group">
                            <input value={this.state.email} onChange={this.handleChange} className="form-control" type="email" name="email" placeholder="Enter Email" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 form-group">
                            <input value={this.state.password} onChange={this.handleChange} className="form-control" type="password" name="password" placeholder="Password" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 form-group">
                            <input onClick={this.login} type="submit" className="btn btn-block btn-login" />
                            {this.state.message}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 form-group">
                            <div className="or-box">
                                <span className="or">OR</span>
                            </div>
                            <button onClick={this.facebookLogin} className="btn btn-block btn-primary mb-3" type="button"><span><i className="fab fa-facebook-f"></i> Sign in with Facebook</span> </button>
                            <button onClick={this.googleLogin} className="btn btn-block btn-danger" type="button"><span><i className="fab fa-google-plus-g"></i> Sign in with Google+</span> </button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 form-group text-center">
                            <div className="or-box">
                                <span><Link to="/signup">Sign up now!</Link></span>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Login;


