import React from 'react'

import './Footer.scss'

const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white mt-auto w-full">
          <div className="">
            {/* Text Section */}
            <div className="copyrights">
              <p className="">
                <b>Bokmålsordboka og Nynorskordboka</b>
                <br></br>
                Applikasjonen bruker data fra Bokmålsordboka og Nynorskordboka, 
                som er utviklet av Språkrådet og Universitetet i Bergen. Dataene er hentet fra <a href='https://ordbøkene.no' target='_blank'>https://ordbøkene.no</a>.
              </p>
              <p>
              <b>Norsk Scrabbleforbund (NSF)</b>
                <br></br>
                Data er hentet fra Norsk Scrabbleforbund. For mer informasjon om NSF, besøk <a href='http://www2.scrabbleforbundet.no' target='_blank' >http://www2.scrabbleforbundet.no.</a>
              </p>
            </div>
            
            
            {/* Social Links */}
            <div className="flex space-x-6">
              {/* <a 
                href="https://github.com/yourusername" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <p>teest</p>
              </a> */}
              <a 
                href="https://youtube.com/@yourchannel" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
              </a>
            </div>
          </div>
  
          {/* Copyright */}
          {/* <div className="mt-8 border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
            ? {new Date().getFullYear()} Your Name. All rights reserved.
          </div> */}
      </footer>
    );
  };

export default Footer;