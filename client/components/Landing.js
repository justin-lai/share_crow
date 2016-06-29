import React, { PropTypes } from 'react';
import Search from './Search';
import SignUpModal from './SignUpModal';

const Landing = (props) => (
  <div className="landing">
    <img className="splash-image" alt="splash" src="splash.jpg" />
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
