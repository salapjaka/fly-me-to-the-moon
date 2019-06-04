import React, { Component } from 'react';
class Description extends Component {
  render() {
    return (
      <div>
        <h2 className='description-title'>WHAT IS AIRLY?</h2>
        <div class='description'>
          <div class='description-row'>
            <div class='description-column'>
              <div class='images-column'>
              <div><img src = '/images/Map.png' alt = 'map'></img></div>
              Enter a range of dates to start your search. 
              </div>
            </div>
            <div class='description-column'>
              <div class='images-column'>
              <div><img src = '/images/People.png' alt = 'map'></img></div>

              After selecting a flight, you will be given a list of all users available to carry your package with them on the flight.

              </div>
            </div>
            <div class='description-column'>
              <div class='images-column'>
              <div><img src = '/images/Meeting.png' alt = 'map'></img></div>

              Contact a user of your choice, tell them what the package is, and negotiate the price. Bon voyage!

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Description;