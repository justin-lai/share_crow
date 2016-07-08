/* eslint-disable max-len */
import React, { PropTypes } from 'react';

const MeetTheTeam = () => (
  <div id="meet-the-team">
    <figure
      className="snip1344"
      style={{ 'margin-left': '100px' }}
    >
      <img
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample1.jpg"
        alt="profile-sample1"
        className="background"
      />
      <img
        src="cathy.png"
        alt="cathy" className="profile"
      />
      <figcaption>
        <h3>Cathy Lee<span>Software Engineer</span></h3>
        <div
          className="icons"
        >
          <a href="https://github.com/caathylee"><i className="ion-social-github-outline ion"></i></a>
          <a href="https://www.linkedin.com/in/cathyhsianglee"><i className="ion-social-linkedin-outline"></i></a>
        </div>
      </figcaption>
    </figure>
    <figure
      className="snip1344"
    >
      <img
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample1.jpg"
        alt="profile-sample1"
        className="background"
      />
      <img
        src="ben.png"
        alt="ben" className="profile"
      />
      <figcaption>
        <h3>Ben Chou<span>Software Engineer</span></h3>
        <div
          className="icons"
        >
          <a href="https://github.com/b-chou"><i className="ion-social-github-outline"></i></a>
          <a href="https://www.linkedin.com/in/bchou1"><i className="ion-social-linkedin-outline"></i></a>
        </div>
      </figcaption>
    </figure>
    <figure
      className="snip1344"
    >
      <img
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample1.jpg"
        alt="profile-sample1"
        className="background"
      />
      <img
        src="arthurlivingston.png"
        alt="arthur" className="profile"
      />
      <figcaption>
        <h3>Arthur Livingston<span>Software Engineer</span></h3>
        <div
          className="icons"
        >
          <a href="https://github.com/Althecoding1"><i className="ion-social-github-outline"></i></a>
          <a href="https://www.linkedin.com/in/arthur-livingston-763b5333"><i className="ion-social-linkedin-outline"></i></a>
        </div>
      </figcaption>
    </figure>
    <figure
      className="snip1344"
    >
      <img
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample1.jpg"
        alt="profile-sample1"
        className="background"
      />
      <img
        src="justin.png"
        alt="justin" className="profile"
      />
      <figcaption>
        <h3>Justin Lai<span>Software Engineer</span></h3>
        <div
          className="icons"
        >
          <a href="https://github.com/justin-lai"><i className="ion-social-github-outline"></i></a>
          <a href="https://www.linkedin.com/in/justinthlai"><i className="ion-social-linkedin-outline"></i></a>
        </div>
      </figcaption>
    </figure>
  </div>
);

MeetTheTeam.propTypes = {
  signup: PropTypes.func,
  history: PropTypes.object.isRequired,
};

export default MeetTheTeam;
