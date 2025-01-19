import React from 'react'

import './Footer.scss'

const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white mt-auto w-full">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Text Section */}
            <div className="mb-6 md:mb-0 max-w-xl">
              <p className="text-gray-300 text-sm leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do 
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim 
                ad minim veniam, quis nostrud exercitation ullamco laboris.
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
                <p>teest</p>
              </a>
            </div>
          </div>
  
          {/* Copyright */}
          <div className="mt-8 border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
            ? {new Date().getFullYear()} Your Name. All rights reserved.
          </div>
        </div>
      </footer>
    );
  };

export default Footer;