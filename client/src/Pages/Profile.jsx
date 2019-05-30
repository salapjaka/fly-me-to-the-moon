import React, { Component } from 'react';
import Axios from 'axios';
import moment from 'moment'
import { baseURL } from '../config/Fire'
class Profile extends Component {

  state = {
    profile: {},
    flightData: {}

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
      <div>
        Profile page <br></br>

        {this.state.profile.email} has been a great member since {this.state.profile.createdAt}
        <br></br>

        <h3>Would you like
        {this.state.profile.email} to take your package from
        {this.state.flightData.from} to
        {this.state.flightData.to}  on a
        {this.state.flightData.carrier} flight on the date of
        {moment(this.state.flightData.date).format("MMM Do YYYY")} ???
        <br></br></h3>


        <div className="form-group-column">
          <form onSubmit={this.savePackage}>
            Content: <div class="col"><input onChange={this.addPackage} class="form-control" type="text" name="content"></input></div>
            Price: <div class="col"><input onChange={this.addPackage} class="form-control" type="text" name="price"></input></div>
            <br></br>
            <div><button type="submit">Submit</button></div>
          </form>
        </div>
      </div>
    );
  }
}

export default Profile;

