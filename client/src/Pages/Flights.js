import React, { Component } from 'react';
import Axios from 'axios'
import {Link} from 'react-router-dom'
import moment from 'moment'
import Navbar from './Navbar';
import Description from './Description';
import Footer from './Footer'
// import auth0Client from '../Auth';


var t;


class Flights extends Component {

  state = {
      carriers: [],
      quotes: [],
      places: [],
      originPlace: 'MIA-sky',
      destinationPlace: 'SYDA-sky',
      outboundPartialDate: '',
      inboundPartialDate: ''
    }

  getFlights = (e) => {
    e.preventDefault()
    Axios.get(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/US/USD/en-US/${this.state.originPlace}/${this.state.destinationPlace}/${this.state.outboundPartialDate}/${this.state.inboundPartialDate}`,
      {
        'headers': {

          "X-RapidAPI-Host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
          "X-RapidAPI-Key": "d0c4641017mshad4b11d5602a271p1a76e2jsna3f0b7c7aee5"
        }
      }
    )
      .then(searchFlights => {
        console.log('where is my info?', searchFlights)
        this.setState({
          carriers: searchFlights.data.Carriers,
          quotes: searchFlights.data.Quotes,
          places: searchFlights.data.Places,
          // outboundPartialDate: searchFlights.data.Quotes[0].InboundLeg.DepartureDate,
          // inboundPartialDate: searchFlights.data.Quotes[1].InboundLeg.DepartureDate
          // inboundPartialDate: 
        })
      }).catch(err => {
        console.log(err, 'error')
      });
  }
 

  searchFlights = (e) => {
    let val = e.target.value
    let name = e.target.name
    window.clearTimeout(t)
    t = window.setTimeout(() => {
      console.log(val)
      console.log(name)
      Axios.get(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/USD/en-US/?query=${val}`,
        {
          'headers': {

            "X-RapidAPI-Host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
            "X-RapidAPI-Key": "d0c4641017mshad4b11d5602a271p1a76e2jsna3f0b7c7aee5"
          }
        }
      )
        .then(searchFlights => {
          console.log('where is my new info?', searchFlights.data)
              this.setState({
                [name]: searchFlights.data.Places[0].PlaceId,
              })
        })
    }, 1000)
  }

  showFlights = () => {
    // console.log(this.state.quotes)


    const flights = this.state.quotes.map((q,i)=>{
      let result = {

      },
      flightPlaces = {
        origin: this.state.places.find((el)=>{
          return el.PlaceId === q.OutboundLeg.OriginId}).CityName,
        destination: this.state.places.find((el)=>{
          return el.PlaceId === q.OutboundLeg.DestinationId}).CityName
      }
      
      result.quote = q
      result.carrier = this.state.carriers.find((el)=>{ 
        return el.CarrierId === q.OutboundLeg.CarrierIds[0] });
      result.date = result.quote.OutboundLeg.DepartureDate;
      result.flightPlaces = flightPlaces;
  
      return result;
    });
    // 

    // var flightTimes = this.randomTime(flights.length);
    // console.log( 'times?', flightTimes );
    return flights.map((flight, i) => {
      console.log('each', flight);
      
      return <div class='contaner'>
        <Link class = 'link' key={i}
        to={`/flightdetail/${flight.quote.QuoteId}?date=${flight.date}&to=${flight.flightPlaces.destination}&from=${flight.flightPlaces.origin}&carrier=${flight.carrier.Name}`}>
      <div></div>
      <div>{flight.quote.QuoteId} 
      - Carrier: {flight.carrier.Name} 
      - Date: {flight.date} 
      {/* - Time: {flight.flightTimes} */}
      - From {flight.flightPlaces.origin} 
      - To {flight.flightPlaces.destination}
      <div></div>
      </div>
      </Link>
      </div>
    })
}

  // randomTime = (len) => {
  //   let flightTimes = []
  //   for(let l=0;l<len;l++){
  //   // var hrs = Math.round(Math.random()*12);
  //   // var mins = Math.round(Math.random()*60);    
  //   // var hFormat = (hrs<10 ? "0" : "");
  //   // var mFormat = (mins<10 ? "0" : "");
  //   // var amPm = (hrs<12 ? "AM" : "PM");
  //   // //return String(hFormat+hrs+ ":" +mFormat+mins+ " " +amPm);
  //   //   flightTimes.push(String(hFormat+hrs+ ":" +mFormat+mins+ " " +amPm))
  //   // }
  //   var mmt = moment();
  //   var mmtMidnight = mmt.clone().startOf('day');
  //   var diff = mmt.diff(mmtMidnight);
  //   var randomTime = moment(Math.floor(Math.random()*diff) + Date.now()).format('LTS')
  //   flightTimes.push(randomTime)
  //   }
  //   console.log('flightTimes',flightTimes.sort())
  //   return flightTimes.sort()

  // }

  handleDates = (e) => {
    let val = e.target.value
    let name = e.target.name
    //clearTimeout(t)
    //t = setTimeout(() => {
      console.log(val)
      console.log(name)
      this.setState({
         [name] : val,
      })
    //},500)
  // })
  }
  
  render() {
    return (
      <div className="container-2 input">
     
      <form  onSubmit ={this.getFlights}>
        <input type="text" name="originPlace" value="Miami" onChange={this.searchFlights} placeholder="origin....." />                                                                                                                                            

        <input type="text" name="destinationPlace" value="Sydney" onChange={this.searchFlights} placeholder="destination....." />
        <br></br>
        Origin: {this.state.originPlace} 
        <br></br>
        Destination: {this.state.destinationPlace}
        <br></br>
        
        <input type="date" name="outboundPartialDate" onChange={this.handleDates} />                                                                                                                                            
        <input type="date" name="inboundPartialDate" onChange={this.handleDates} />                                                                                                                                            
        <br></br>
        From: {this.state.outboundPartialDate}
        <br></br>
        To: {this.state.inboundPartialDate}
        <br></br>
        <button type='submit'>Search</button>
        </form>
       {this.showFlights()}
       <Description/>
       <Footer/>
      </div>
     
    );
  }
}

export default Flights;