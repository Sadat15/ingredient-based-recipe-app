import React from 'react'
import logoDark from '../img/logo-dark.png';

function NavbarDark() {

  return (
    <nav class="navbar" style={{backgroundColor: '#130c13'}}>
      <ul class="nav">
        <li class="nav-item">
          <a href="/">
            <img src={logoDark} width="65" height="65" alt="Cocktail Logo"></img>
          </a>
        </li>
        <li class="nav-item" >
          <a className="nav-link " href="/">
            <div style={{color: '#be1045'}}><h2>Less Waste More Taste</h2></div>
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default NavbarDark