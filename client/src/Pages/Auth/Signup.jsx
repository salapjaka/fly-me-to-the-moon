import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom'
import firebase, { googleProvider, facebookProvider } from "../../config/Fire";

class Signup extends Component {

    state = {
        email: '',
        password: '',
        confirmPassword: '',
        message: null,
        signedUp: false
    }



    //Firebase Sign Up
    signup = (e) => {
        e.preventDefault();
        if (this.state.password === this.state.confirmPassword) {
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then((res) => {
                    this.setState({
                        signedUp: true
                    })
                }).catch((error) => {
                    this.setState({
                        message: error.message
                    })
                    console.log(error)
                })
        } else {
            this.setState({
                message: "Passwords do not match."
            })
        }
    }


    //Google Log In
    googleLogin = () => {
        firebase.auth().signInWithPopup(googleProvider)
            .then((res) => {
                this.setState({
                    signedUp: true
                })
            }
            ).catch((error) => {
                console.log(error)
            })
    };


    //Facebook Log In

    facebookLogin = () => {
        firebase.auth().signInWithPopup(facebookProvider)
            .then((res) => {
                this.setState({
                    signedUp: true
                })
            }
            ).catch((error) => {
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
                {this.state.signedUp ? <Redirect to="/" /> : false}
            
                <div class="container container-login">
                    <div class="logo"></div>
                            <div class="login-item">
                      <form action="" method="post" class="form form-login">
                        <div class="form-field">
                          <input value={this.state.email} onChange={this.handleChange} type="text" name="email" className="form-input" placeholder='Email'></input>
                        </div>

                        <div class="form-field">
                          <label class="lock" for="login-password"><span class="hidden">Password</span></label>
                          <input value={this.state.password} onChange={this.handleChange} type="password" name="password"  class="form-input" placeholder="Password"></input>
                        </div>

                        <div class="form-field">
                          <label class="lock" for="login-password"><span class="hidden">Password</span></label>
                          <input value={this.state.confirmPassword} onChange={this.handleChange} type="password" name="confirmPassword"   class="form-input" placeholder="Verify password"></input>
                        </div>

                        <div class="form-field">
                        <input onClick={this.signup} type="submit" ></input>
                        {this.state.message}  

                         {/* <input onClick={this.signup} type="submit" className="btn btn-block btn-login" placeholder="Enter your Password" />
                            {this.state.message} */}
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
                        {/* <div className="row">
                            <div className="col-md-12 form-group text-center">
                                <div className="or-box">
                                    <span><Link to="/signup">Sign up now!</Link></span>
                                </div>
                            </div>
                        </div> */}
                        <div className="row">
                            <div className="col-md-12 form-group text-center">
                             <div className="or-box">
                                <span><Link to="/login">Sign in now!</Link></span>
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

export default Signup;
