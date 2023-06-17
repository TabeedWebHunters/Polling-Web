import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <footer>
      <p>&copy; {new Date().getFullYear()} My App. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
