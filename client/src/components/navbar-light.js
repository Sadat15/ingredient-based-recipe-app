import React from 'react'
import logoLight from '../img/logo-light.png';

function NavbarLight() {
  return (

    <nav class="navbar" style={{backgroundColor: '#a8a6a5'}}>
      <ul class="nav">
        <li class="nav-item">
          <a href="/">
            <img src={logoLight} width="50" height="50" alt="Cocktail Logo"></img>
          </a>
        </li>
        <li class="nav-item" >
          <a className="nav-link " href="/">
            <div style={{color: '#c72342'}}><h4>Less waste more taste</h4></div>
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default NavbarLight

