import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import fire from 'firebase'

class LandingPage extends Component {


    componentDidMount() {
        axios.get('http://localhost:5000/')
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
                <div>
                    {this.props.user ?
                        <Link onClick={this.logout}>Logout</Link>
                        :
                        <Fragment>
                            <Link to='/signup'>SIGN UP</Link>
                            <Link to='/login'>LOG IN</Link>
                        </Fragment>
                    }

                </div>
            </Fragment>
        );
    }
}

export default LandingPage;
