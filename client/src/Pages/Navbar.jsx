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

                            <Link to="/myProfile">Hello {this.props.user.email}</Link>
                            <Link className="signup-logins" onClick={this.logout}>Logout</Link>
                        </Fragment>
                        :
                        <div className="signup-logins">
                            <Link class = 'signup-login' to='/signup'>SIGN UP</Link>
                            <Link to='/login'>LOG IN</Link>
                        </div >
                    }

                </div>
            </Fragment>
        );
    }
}

export default Navbar;
