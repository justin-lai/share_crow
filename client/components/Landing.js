import React from 'react';

const Landing = () => (
  <div className="landing">
    <img className="splash-image" alt="splash" src="splash.jpg" />
    <form className="landing-form">
      <input className="landing-input" type="text" placeholder="San Francisco, CA" />
      <input className="landing-input" type="text" placeholder="Rental Period" />
      <input className="landing-button" type="submit" value="Search" />
    </form>
  </div>
);

export default Landing;
