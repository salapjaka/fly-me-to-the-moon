import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import fire from 'firebase'
import { baseURL } from '../config/Fire'

class Navbar extends Component {


    componentDidMount() {
        axios.get(`${baseURL}/`)
            .then((u) => {
                console.log(u.data)
            })
    }
    logout = () => {
        fire.auth().signOut()
    }


    render() {
        return (
            <Fragment>
                <div className = 'nav-new'>
                    {this.props.user ?
                        <Fragment>
                            <Link class='airly'to="/">Airly</Link>
                            
                            <div class = 'float-right-navbar'><Link to="/myProfile"> <div class='signup-login'>You are logged in as</div><div class='signup-login'>{this.props.user.email}</div> </Link>
                            <Link className="signup-login" onClick={this.logout}>Logout</Link></div>
                        </Fragment>
                        :
                        <Fragment>
                            <Link class='signup-login' to='/signup'>SIGN UP</Link>
                            <Link class='signup-login' to='/login'>LOG IN</Link>
                        </Fragment>
                    }

                </div>
                
            </Fragment>
        );
    }
}

export default Navbar;
