import React, { Component } from 'react';
import Axios from 'axios'
import { baseURL } from '../config/Fire'

class MyProfile extends Component {
state = {
  myFlights: [],
  myPacks:[],
  packsICarry:[],
}

  componentDidMount(){
    console.log(this.props.uid)
    let uid = this.props.uid;
    Axios.get(`${baseURL}/allMyStuff/${uid}`).then(stuff=>{
      console.log('MyProfile', stuff)
      let {myPacks,  packsICarry,  myFlights}  = stuff.data
      this.setState({myFlights, myPacks, packsICarry})
    })
  }

  showFlights=() => {
    return this.state.myFlights.map((flight,i)=>{
      return<div>
      On {flight.carrier}-this date of {flight.date.slice(0, 10)} from {flight.from} to {flight.to} </div>
    })
  }

  showMyPacks=() => {
    return this.state.myPacks.map((pack,i)=>{
      return<div>-with {pack.content}
      -for $ {pack.price} 
      requested on {pack.createdAt.slice(0, 10)}
      by {pack.profile.email} from {pack.flightData.from} 
      to {pack.flightData.to} on a 
      {pack.flightData.carrier} flight on {pack.flightData.date.slice(0,10)}
      </div>
    })
  }

  showYourPacks=() => {
    return this.state.packsICarry.map((packICarry,i)=>{
      return<div>-{packICarry.content} for ${packICarry.price} 
      for {packICarry.profile.email} from {packICarry.flightData.from}  
      to {packICarry.flightData.to} on a 
      {packICarry.flightData.carrier} flight
      on {packICarry.flightData.date.slice(0,10)}
      </div>
    })
  }

  render() {
    return (
      <div>
        <h4>MyProfile </h4>
    
        {this.props.email}<br></br>
        <h5>MyFlights:</h5><br></br>
        {this.showFlights()}<br></br>
        <h5>Packs being carried for me:</h5><br></br>
        {this.showMyPacks()}<br></br>
        <h5>Packs that I need to carry:</h5><br></br>
        {this.showYourPacks()}<br></br>

      </div>
    );
  }
}

export default MyProfile;