import React, { Component } from 'react';
import Axios from 'axios'
import { baseURL } from '../config/Fire'
import RandomUserGenerator from './RandonUserGenerator'
import Footer from './Footer'
import moment from 'moment'

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
      On flight <h7 class='blue'>{flight.carrier}</h7> this date of <h7 class='blue'>{moment(flight.date).format("MMM Do YYYY")}</h7> from <h7 class='blue'>{flight.from} </h7>to <h7 class='blue'>{flight.to}</h7> </div>
    })
  }

  showMyPacks=() => {
    return this.state.myPacks.map((pack,i)=>{
      return <div><h7>{pack.content}</h7> for <h7 class='blue'>$ {pack.price} </h7>
      requested on <h7 class='blue'>{moment(pack.createdAt).format("MMM Do YYYY")}</h7> by <h6 class='blue'>{pack.profile.email}</h6> from <h7 class='blue'>{pack.flightData.from} </h7> to {pack.flightData.to} on a 
      {pack.flightData.carrier} flight on <h7 class='blue'>{moment(pack.flightData.date).format("MMM Do YYYY")}</h7>
      </div>
    })
  }

  showYourPacks=() => {
    return this.state.packsICarry.map((packICarry,i)=>{
      return<div><h7 class='blue'>{packICarry.content}</h7> for <h7 class='blue'>${packICarry.price} </h7>
      for <h7>{packICarry.profile.email}</h7> from <h7>{packICarry.flightData.from} </h7> 
      to <h7>{packICarry.flightData.to} </h7> on a 
      <h7> {packICarry.flightData.carrier}</h7> flight
      on <h7>{moment(packICarry.flightData.date).format("MMM Do YYYY")}</h7>
      </div>
    })
  }

  render() {
    return (
      

        <div className='flight-detail-flex profile my-profile'>
         <div className = 'login-background'></div>
          <h4>MyProfile </h4>
      
         <RandomUserGenerator />
        {this.props.email}<br></br>
        <div className='items'>
          <div className='item'><h5>My Flights:</h5><br></br>
        {this.showFlights()}</div><br></br>
        <div className='item'><h5>Packs being carried for me:</h5><br></br>
        {this.showMyPacks()}</div><br></br>
        <div className='item'><h5>Packs that I need to carry:</h5><br></br>
        {this.showYourPacks()}</div><br></br>
        </div>
        <Footer />
      </div>
    );
  }
}

export default MyProfile;