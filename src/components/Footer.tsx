import React from 'react'

import './Footer.scss'

const Footer = () => {
  return (
    <footer className="">
      <div className="footer-items">
        <div className="copyrights">
          <b>Bokmålsordboka og Nynorskordboka</b>
          <br></br>
          Applikasjonen bruker data fra Bokmålsordboka og Nynorskordboka,
          som er utviklet av Språkrådet og Universitetet i Bergen. Dataene er hentet fra <a href='https://ordbøkene.no' target='_blank'>https://ordbøkene.no</a>.
          <p>
            <br></br>
            <b>Norsk Scrabbleforbund (NSF)</b>
            <br></br>
            Data er hentet fra Norsk Scrabbleforbund. For mer informasjon om NSF, besøk <a href='http://www2.scrabbleforbundet.no' target='_blank' >http://www2.scrabbleforbundet.no.</a>
          </p>
        </div>
        <div className='footer-links'>
          <a
            href="https://github.com/Bendiku"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >


            <div className='footer-image'>
              <img className='github-image' src='resources/github-transperant-128x.png' />
              <div className='text-container'>
                <p id='github-text'>GitHub</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;