import React from 'react'
import { Link } from 'react-router-dom'

export default function Heder() {
  return (
    <div>
      <nav className="navbar">
  <div className="container-fluid">
    <div className="row">
        <h5>Left Menu</h5>
      <ul className="navbar-nav">
       <li className='nav-item'><Link to="/" className="nav-link">Home</Link></li>
       <li className='nav-item'><Link to="/Userdata" className="nav-link">Post List</Link></li>
      </ul>
      
    </div>
  </div>
</nav>
    </div>
  )
}
