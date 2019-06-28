import React, { Component, Fragment } from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom'
import { baseURL } from '../config/Fire'
import Footer from './Footer'


class FlightDetail extends Component {

  state = {
    passengers: [
      { 'name': 'chris' },
      { 'name': 'niko' },
      { 'name': 'parker' }
    ]
  }
  queryfie(string) {
    return string
      .slice(1)
      .split('&')
      .map(q => q.split('='))
      .reduce((a, c) => { a[c[0]] = c[1]; return a; }, {});
  }

  componentDidMount() {
    console.log('where is it?', this, this.props.user)
    let query = this.queryfie(this.props.location.search);
    console.log(query)

    Axios.get(`${baseURL}/flightdetails${this.props.location.search}`)
    .then(res => {
      console.log('anything?',res.data)
    
      //show all the passangers by setting state
      this.setState({
        passengers:res.data.details.passengers
      })
  })
  }

  pickPassenger = ((id, i) => {
    console.log(' i picked ', id)
    this.props.history.push(`/profile/${id}${this.props.location.search}`)
  })

  showPassengers = () => {
    return this.state.passengers.map((passenger,i) => {
      return <div><button  className= 'button-carrier passenger-list-title' 
      onClick = {()=>{this.pickPassenger(passenger.uid)}}>{passenger.email}</button>
      </div>
      
      // <button onClick={() => { this.pickPassenger(passenger.name) }}>{passenger.name}</button>
    })
  }

  imTakingFlight = () => {
    console.log(this.props.user)
    Axios.post(`${baseURL}/flightdetails/${this.props.location.search}`, {email: this.props.user.email, uid:this.props.user.uid }).then(res => {
      console.log(res)
      this.setState({
        passengers:res.data.details.passengers
      })
      //show all the passangers by setting state
    })
 
  }
  render() {

    return (
     
     <div className='flight-detail-flex'>
      <Fragment>
    
    {this.props.user ?
          <div class = 'login-background'>
            <div class='button-taking-flight'><button class='taking-flight' onClick={this.imTakingFlight}>I'm taking this flight</button></div>
            <div class='passenger-list-title'>Users registered for this flight who will be able to carry your package: </div>
            {this.showPassengers()}
            <Footer />
          </div>
          :
          <Redirect to={{pathname: '/login', state: { prevPath: window.location.pathname + window.location.search }}}/>
          // <Redirect to='/login' />
          // http://localhost:3000/flightdetail/1?date=2019-05-30T00:00:00&to=Sydney&from=Miami&carrier=Qantas
          
      }
  
    </Fragment>

    </div>
  
   
    );
    
  }
  
}

export default FlightDetail;