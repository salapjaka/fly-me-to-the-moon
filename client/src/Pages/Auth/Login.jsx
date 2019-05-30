import React, { Component, Fragment } from 'react';
import firebase, { googleProvider, facebookProvider } from "../../config/Fire";
import { Link, Redirect } from 'react-router-dom'
import axios from "axios";
import { baseURL } from '../../config/Fire'


class Login extends Component {

    state = {
        email: "",
        password: "",
        message: null,
        loggedIn: false
    }

    componentDidMount() {
        axios.post(`${baseURL}/login`)
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
                axios.post(`${baseURL}/login`).then(res => {
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
                axios.post(`${baseURL}/login`, { uid: u.uid, email: u.email }).then(res => {
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



    render() {
        return (
            <Fragment>
                {this.state.loggedIn ? <Redirect to="/" /> : false}
                <div class="container container-login">
                    <div class="logo"></div>
                            <div class="login-item">
                      <form action="" method="post" class="form form-login">
                        <div class="form-field">

                          <input value={this.state.email} onChange={this.handleChange} type="text" name="email" class="form-input" placeholder='Email'></input>
                        </div>

                        <div class="form-field">
                          <label class="lock" for="login-password"><span class="hidden">Password</span></label>

                          <input value={this.state.password} onChange={this.handleChange} type="password" name="password" placeholder="Password"id="login-password"  class="form-input" placeholder="Password" required></input>
                        </div>

                        <div class="form-field">
                        <input onClick={this.login} type="submit" value="Log in" ></input>
                        {this.state.message}  
                        </div>
                            <div className="or-box">
                                <span className="or">OR</span>
                            </div>
                        <div class="form-field">
                          <input onClick={this.facebookLogin}  className='facebook' type="button" value="Continue with Facebook"></input>
                        </div>
                        <div class="form-field">
                          <input onClick={this.googleLogin} className="google" type="button" value="Continue with Google+"></input>
                        </div>
                        <div className="row">
                            <div className="col-md-12 form-group text-center">
                                <div className="or-box">
                                    <span><Link to="/signup">Sign up now!</Link></span>
                                </div>
                            </div>
                        </div>
                      </form>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Login;


