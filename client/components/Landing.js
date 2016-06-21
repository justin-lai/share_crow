import React from 'react';

const Landing = () => (
  <div className="landing">
    <img className="splash-image" alt="splash" src="splash.jpg" />
    <div className="wrap">
      <div className="search">
        <input type="text" className="searchTerm" placeholder="What are you looking for?" />
        <button type="submit" className="searchButton">
          <i className="glyphicon glyphicon-search"></i>
        </button>
      </div>
    </div>
  </div>
);

export default Landing;

    // <form className="landing-form">
    //   <input className="landing-input" type="text" placeholder="San Francisco, CA" />
    //   <input className="landing-input" type="text" placeholder="Rental Period" />
    //   <input className="landing-button" type="submit" value="Search" />
    // </form>
