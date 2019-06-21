import React from 'react';
import axios from 'axios'


class User extends React.Component {
    
  constructor(props){
      super(props);
      this.state = {
          userTicketsData: []
        };
      this.clearUsers = this.clearUsers.bind(this);
      this.requestUser = this.requestUser.bind(this);
      this.generate = this.generate.bind(this);
  }
  
  componentDidMount(){
      this.requestUser();
  }
  
  clearUsers(){
      this.setState({
          userTicketsData: []
      });
  }
  
  requestUser(){
      const self = this;
      axios.get("https://randomuser.me/api/").then(function(res){
          const data = res.data.results[0];
          const tickets = self.state.userTicketsData.slice();
          tickets.unshift(data);
          self.setState({
              userTicketsData: tickets
          });
      });
  }
  
  generate(){
      if(this.state.userTicketsData.length){
          return (
              <ul className="ticketsList">
                  <UserList
                   data = {this.state.userTicketsData}
                  />
              </ul>
          );
      }
      return <div>Please Generate User</div>
  }
  
  render(){
      const userTicket = this.generate();
      return(
          <div>
              {/* <button onClick={this.requestUser}>Generate Random User</button>
              <button onClick={this.clearUsers}>Clear User List</button> */}
              <div className="usersTicketsContainer">
                  {userTicket}
              </div>
          </div>
      );
  }
}

class UserList extends React.Component {
  render(){
  // new React 16 feature: returning an array
      return this.props.data.map(function(ticketData, ind){
              return (
                  <li key={ind}>
                      <RandomUserTicket
                      data={ticketData}
                      />
                  </li>
              )
          });
  }
}

class RandomUserTicket extends React.Component {
  constructor(props){
      super(props);
      this.state = {displayData: "name"};
      this.getIcons = this.getIcons.bind(this);
      this.getDisplayData = this.getDisplayData.bind(this);
      this.handleClick = this.handleClick.bind(this);
  }
  
  getIcons(){
      const sel = this.state.displayData;
      return (
          <ul className="iconsContainer">
                  <li onClick={this.handleClick} className={"name fa fa-user-circle " + (sel==='name'?'selected':'')}></li>
                  <li onClick={this.handleClick} className={"dob fa fa-calendar " + (sel==='dob'?'selected':'')}></li>
                  <li onClick={this.handleClick} className={"location fa fa-globe " + (sel==='location'?'selected':'')}></li>
                  <li onClick={this.handleClick} className={"contact fa fa-envelope "  + (sel==='contact'?'selected':'')}></li>
          </ul>
      );
  }
  
  
  getDisplayData(){
      const data = this.props.data;
      const key = this.state.displayData;
      switch(key){
          case "name":
              return (
                  <div className="name">
                      <div>
                          Name:
                      </div>
                      <div>
                          {data.name.first + ' ' + data.name.last}
                      </div>
                  </div>
              );
          case "dob":
              return (
                  <div className="dob">
                      <div>
                          Birthday:
                      </div>
                      <div>
                          {data.dob}
                      </div>
                  </div>
              );
          case "location":
              return (
                  <div className="location">
                      <div>
                          Location:
                      </div>
                      <div>
                          {data.location.street + ', ' + data.location.city + ', ' + data.location.state}
                      </div>
                  </div>
              );
          case "contact":
              return (
                  <div className="contact">
                      <div>
                          Contact Information:
                      </div>
                      <div>
                          E-Mail: {data.email}
                      </div>
                      <div>
                          Phone: {data.phone}
                      </div>
                      <div>
                          Mobile: {data.cell}
                      </div>
                  </div>
              );
          default:
              return (
                  <div>
                      ERROR!!!
                  </div>
              );
      }
  }
  
  handleClick(e){
      const key = e.currentTarget.className.split(' ')[0];
      this.setState({displayData: key});
  }
  
  render(){
      const data = this.props.data;
      const icons = this.getIcons();
      const displayData = this.getDisplayData();
      
      return(
          <div className="">
              <div className="">
                  <img className="picContainer" src={data.picture.large} />
              </div>
              
              {/* <div className="controlsContainer">
                  {icons}
              </div>
              
              <div className="displayDataContainer">
                  <hr />
                  {displayData}
                  <hr />
              </div> */}
          </div>
      );
  }
}
export default User