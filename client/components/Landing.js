import React from 'react';
import Search from './Search';
import StartSharingButton from './StartSharingButton';

const Landing = () => (
  <div className="landing">
    <img className="splash-image" alt="splash" src="splash.jpg" />
    <div className="wrap">
      <div className="landing-search">
        <Search />
        <StartSharingButton />
      </div>
    </div>
  </div>
);

export default Landing;

