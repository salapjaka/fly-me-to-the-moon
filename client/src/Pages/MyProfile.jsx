import React, { Component } from 'react';
import Axios from 'axios'


class MyProfile extends Component {
  componentDidMount(){
    console.log(this.props.uid)
    let uid = this.props.uid;
    Axios.get(`http://localhost:5000/allMyStuff/${uid}`).then(stuff=>{
      console.log('MyProfile', stuff)
    })
  }

  render() {
    return (
      <div>
        MyProfile 
        use {this.props.uid}  to go to the database adn find all my packages and all the packages that i'm conncectd to
        {this.props.email}

      </div>
    );
  }
}

export default MyProfile;