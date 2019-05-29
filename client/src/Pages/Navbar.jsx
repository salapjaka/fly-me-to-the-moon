import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import fire from 'firebase'
import { baseURL } from '../config/Fire'
class Navbar extends Component {


    componentDidMount() {
        axios.get(`${baseURL}`)
            .then((u) => {
                console.log(u.data)
            })
    }
    logout = () => {
        fire.auth().signOut()
    }
    classToggle=() =>{  
        const navs = document.querySelectorAll('.Navbar__Items')    
        navs.forEach(nav => nav.classList.toggle('Navbar__ToggleShow'));
    }

    // document.querySelector('.Navbar__Link-toggle').addEventListener('click', classToggle)



    render() {
        return (
        <div>  
             {this.props.user ?
                 <Link to='./' onClick={this.logout}>LOGOUT</Link>
                 :
                 <Fragment>
                     <div><Link  to='/signup'>SIGN UP</Link></div>
                     <div><Link  to='/login'>LOG IN</Link></div>
                 </Fragment>
             }  
        </div>    
    
        );
    }
}

export default Navbar;


// {/* <div class="Navbar">   
//          <div class="Navbar__Link Navbar__Link-brand">      
//              Website title    
//          </div>
//          <div class="Navbar__Link Navbar__Link-toggle">      
//              <i class="fas fa-bars"></i>    
//          </div>  
//          <nav class="Navbar__Items">    
//              <div class="Navbar__Link">      
//                  Longer Link    
//              </div>    
//              <div class="Navbar__Link">      
//                  Longer Link
//              </div>    
//              <div class="Navbar__Link">      
//                   Link    
//              </div>  
//          </nav>  

//     <nav class="Navbar__Items Navbar__Items--right">    
//          <div class="Navbar__Link">      
//               Link    
//          </div>    
//          <div class="Navbar__Link">      
//               Link    
//          </div>  
//     </nav>
//    </div> */}