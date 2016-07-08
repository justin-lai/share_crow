import React, { PropTypes } from 'react';
import LandingSearch from '../Landing/LandingSearch';
import SplashCarousel from './SplashCarousel';

const Landing = (props) => (
  <div id="landing">
    <SplashCarousel />
    <div id="slogan-with-search" className="wrap">
      <div className="landing-search">
        <div id="big-logo">
          <img
            className="middle-logo"
            alt="logo"
            src="sharecrow-clear-bg.png"
          />
        </div>
        <div id="slogan">
          <h2
            id="slogan-phrase"
            data-shadow="Make Some Money. Start Sharing."
            className="basic white"
          >
            Share Ill Crow.
          </h2>
        </div>
        <LandingSearch history={props.history} />
        <div className="start-sharing">
          <section className="buttons">
            <div className="sharing-button-container">
              <div className="signup-wrapper">
                <a
                  className="btn btn-1"
                  href="/marketplace"
                > See what's new
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
);

Landing.propTypes = {
  signup: PropTypes.func,
  history: PropTypes.object.isRequired,
};

export default Landing;
