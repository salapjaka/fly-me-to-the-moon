import React, { Component, Fragment } from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom'

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

    Axios.get(`http://localhost:5000/flightdetails/${this.props.location.search}`)
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
      return <div key={i}><button  onClick = {()=>{this.pickPassenger(passenger.uid)}}>{passenger.email}</button>
      </div>
      
      // <button onClick={() => { this.pickPassenger(passenger.name) }}>{passenger.name}</button>
    })
  }

  imTakingFlight = () => {
    console.log(this.props.user)
    Axios.post(`http://localhost:5000/flightdetails/${this.props.location.search}`, {email: this.props.user.email, uid:this.props.user.uid }).then(res => {
      console.log(res)
      this.setState({
        passengers:res.data.details.passengers
      })
      //show all the passangers by setting state
    })
 
  }
  render() {

    return (
      <Fragment>
      
        {this.props.user ?

          <div>
            Flight details:
        <br></br>
            People registered for this flight: <li>{this.showPassengers()}</li>
            <br></br>
            <button onClick={this.imTakingFlight}>I'm taking this flight</button>
          </div>

          :
          <Redirect to='/login' />
      }
    </Fragment>
    );
  }
}

export default FlightDetail;