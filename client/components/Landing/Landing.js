import React, { PropTypes } from 'react';
import Search from '../Marketplace/Search';
import SignUpModal from '../Navigation/SignUpModal';
import SplashCarousel from './SplashCarousel';

const Landing = (props) => (
  <div className="landing">
    <SplashCarousel />
    <div className="wrap">
      <div className="landing-search">
        <Search />
        <div className="start-sharing">
          <section className="buttons">
            <div className="sharing-button-container">
              <a className="btn btn-1">
                <SignUpModal
                  origin
                  signup={props.signup}
                />
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
);

Landing.propTypes = {
  signup: PropTypes.func,
};

export default Landing;
