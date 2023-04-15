import React from 'react'
import './css/footer.css'
import { Link } from 'react-router-dom';
import { AiFillInstagram, AiFillYoutube, AiFillTwitterCircle, AiFillLinkedin } from "react-icons/ai";

function Footer() {
  return (
    <div className='footer-container'>
      <div className='footer-details'>
        <div className='footer-about'>
          <h1>ABOUT</h1>
          <p>Travelogue is your virtual travel diary. We designed this awesome product for all the travellers out
            there to help them document their memorable journeys and revisit their adventures! 
            You can add, edit and delete entries in our app. We support Markdown too!
            </p>
        </div>
        <div className='footer-links'>
          <Link className='nav-link' to='www.youtube.com'><AiFillInstagram /></Link>
          <Link className='nav-link' to='www.youtube.com'><AiFillLinkedin /></Link>
          <Link className='nav-link' to='www.youtube.com'><AiFillTwitterCircle /></Link>
          <Link className='nav-link' to='www.youtube.com'><AiFillYoutube /></Link>
        </div>
      </div>
      <hr />
      <div className='footer-copyright'>
        <h3>Copyright @ {new Date().getFullYear()} All Rights Reserved by Travelogue</h3>
      </div>
    </div>
  )
}

export default Footer