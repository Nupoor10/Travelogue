import React from 'react'
import './css/footer.css'
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
          <a className='nav-link' target='_blank' rel='noreferrer' href='https://www.instagram.com/'><AiFillInstagram /></a>
          <a className='nav-link' target='_blank' rel='noreferrer' href='https://in.linkedin.com/'><AiFillLinkedin /></a>
          <a className='nav-link' target='_blank' rel='noreferrer' href='https://twitter.com/'><AiFillTwitterCircle /></a>
          <a className='nav-link' target='_blank' rel='noreferrer' href='https://www.youtube.com/'><AiFillYoutube /></a>
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