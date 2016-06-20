import React, { PropTypes, Component } from 'react';

const Landing = (props) => (
  <div className="landing">
    <img className="splash-image" alt="splash" src="splash.jpg" />
    <form className="landing-form">
      <input type="text" placeholder="San Francisco, CA" />
      <input type="text" placeholder="Rental Period" />
      <input type="submit" value="Search" />
    </form>
  </div>
);

export default Landing;
