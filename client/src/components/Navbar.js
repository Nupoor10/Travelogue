import React, { useState, useContext } from 'react'
import './css/navbar.css'
import { MdTravelExplore } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

function Navbar() {
  const navigate = useNavigate();
  const { user, setUser} = useContext(UserContext)
  const [clicked, setClicked] = useState(false);

  function handleClick() {
    setClicked(prevClicked => !prevClicked);
  };

  function handleLogout() {
    localStorage.removeItem('userData')
    setUser(null)
    alert("Logged out")
    navigate("/")
  }

  return (
    <div className='navbar-wrapper'>
      <h2><Link className='nav-link' to={"/home"}>TRAVEL<MdTravelExplore />GUE</Link></h2>
      <div className='navbar-container'>
        {user ? (
          <div className='navbar-user'>
            <span className='user-avatar'
            onClick={handleClick}><FaUserCircle /></span>
            { clicked ? <button onClick={handleLogout} className='navbar-btn'>LOGOUT</button> : ""}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Navbar