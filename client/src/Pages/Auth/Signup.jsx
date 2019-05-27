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
                <div className="simple-login-container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 text-center text-secondary">
                            <h2>Create an account</h2>
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
                            <input value={this.state.confirmPassword} onChange={this.handleChange} className="form-control" type="password" name="confirmPassword" placeholder="Verify Password" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 form-group">
                            <input onClick={this.signup} type="submit" className="btn btn-block btn-login" placeholder="Enter your Password" />
                            {this.state.message}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 form-group">
                            <div className="or-box">
                                <span className="or">OR</span>
                            </div>
                            <button onClick={this.facebookLogin} className="btn btn-block btn-primary mb-3" type="button"><span><i className="fab fa-facebook-f"></i> Create with Facebook</span> </button>
                            <button onClick={this.googleLogin} className="btn btn-block btn-danger" type="button"><span><i className="fab fa-google-plus-g"></i> Create with Google+</span> </button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 form-group text-center">
                            <div className="or-box">
                                <span>Have an account? <Link to="/login">Sign in now!</Link></span>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Signup;
