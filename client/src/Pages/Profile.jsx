import React, { Component, Fragment } from 'react';
import Axios from 'axios';
import moment from 'moment'
import { baseURL } from '../config/Fire'
import { Redirect } from 'react-router-dom'
import Footer from './Footer'
import RandomUserGenerator from './RandonUserGenerator'

const names = [
  'Yoda',
  'Jack Sparrow',
  'Captain Kirk',
  'Spock',
  'Optimus Prime',
  'Gandalf',
  'Inigo Montoya',
  'Magneto',
  'Tony Stark',
  'Bilbo Baggins',
  'Legolas',
  'Inspector Clouseau',
  'Obi Wan'
];



class Profile extends Component {



  state = {
    name: this.getRandomName(),
    profile: {},
    flightData: {}
  }

getRandomName() {
  return names[Math.floor(Math.random() * names.length)];
}


  componentDidMount() {
    console.log('hehehehey', this.props.match.params.uid)
    Axios.get(`${baseURL}/profile/${this.props.match.params.uid}`)
      .then(profileFromServer => {
        console.log('profile', profileFromServer)
        let flightData = this.queryfie(this.props.location.search)
        console.log(flightData)
        this.setState({
          profile: profileFromServer.data,
          flightData: flightData,
          uid:this.props.uid
        })
      })
  }




  queryfie(string) {
    return string
      .slice(1)
      .replace('%20', ' ')
      .split('&')
      .map(q => q.split('='))
      .reduce((a, c) => { a[c[0]] = c[1]; return a; }, {});
  }

  savePackage = (e) => {
    e.preventDefault()
    Axios.post(`${baseURL}/profile`, this.state)
      .then(res => {
        console.log(res)
        // this.setState({

        // })
      })
  }

  addPackage = (e) => {
    console.log(e.target.value, e.target.name)
    this.setState({
      [e.target.name]: e.target.value
    })

  }

  render() {
    return (
      
      
         <div className='flight-detail-flex profile'>
         <div class = 'login-background'></div>
         <RandomUserGenerator />
        <h4>{this.state.name}</h4>

        has been a great member since {moment(this.state.profile.createdAt).format("MMM Do YYYY")} 
     

        <div class = 'request'><p>Request for {this.state.name} to carry your package on flight 
        {this.state.flightData.carrier} from {this.state.flightData.from} to  {this.state.flightData.to} on 
        {moment(this.state.flightData.date).format("MMM Do YYYY")} ?
        <br></br></p><div>

        <div className="">
          <form onSubmit={this.savePackage}>
            <div class = 'small-labels'>Contents:</div> <div class="col"><textarea onChange={this.addPackage} class="form-control request" type="text" name="content" placeholder='Tell them what it is. Hi! I have some documents I need urgently delivered to my office in Sydney.'></textarea></div>
            <div class = 'small-labels'>Price:</div> <div class="col"><input onChange={this.addPackage} class="form-control request" type="text" name="price" placeholder='How much would you like to pay? e.g.: $100'></input></div>
            <br></br>
            <div><button class = 'search-main' type="submit">Submit</button></div>
          </form>
        </div>
       </div>
       <Footer />
      </div>
      </div>

    );
  }
  
}

export default Profile;

