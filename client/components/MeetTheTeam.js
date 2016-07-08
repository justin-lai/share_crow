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
      <a href="/profile/caathylee">
        <img
          src="cathy.png"
          alt="cathy" className="profile"
        />
      </a>
      <figcaption>
        <h3>Cathy Lee<span>Software Engineer</span></h3>
        <div
          className="icons"
        >
          <a href="https://github.com/caathylee"><img className="link-icons" alt="github" src="github-100.png" /></a>
          <a href="https://www.linkedin.com/in/cathyhsianglee"><img className="link-icons" alt="linkedin" src="linkedin-100.png" /></a>
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
      <a href="/profile/bboy">
        <img
          src="ben.png"
          alt="ben" className="profile"
        />
      </a>
      <figcaption>
        <h3>Ben Chou<span>Software Engineer</span></h3>
        <div
          className="icons"
        >
          <a href="https://github.com/b-chou"><img className="link-icons" alt="github" src="github-100.png" /></a>
          <a href="https://www.linkedin.com/in/bchou1"><img className="link-icons" alt="linkedin" src="linkedin-100.png" /></a>
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
      <a href="/profile/RandomAl">
        <img
          src="arthurlivingston.png"
          alt="arthur" className="profile"
        />
      </a>
      <figcaption>
        <h3>Arthur Livingston<span>Software Engineer</span></h3>
        <div
          className="icons"
        >
          <a href="https://github.com/Althecoding1"><img className="link-icons" alt="github" src="github-100.png" /></a>
          <a href="https://www.linkedin.com/in/arthur-livingston-763b5333"><img className="link-icons" alt="linkedin" src="linkedin-100.png" /></a>
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
      <a href="/profile/jlai">
        <img
          src="justin.png"
          alt="justin" className="profile"
        />
      </a>
      <figcaption>
        <h3>Justin Lai<span>Software Engineer</span></h3>
        <div
          className="icons"
        >
          <a href="https://github.com/justin-lai"><img className="link-icons" alt="github" src="github-100.png" /></a>
          <a href="https://www.linkedin.com/in/justinthlai"><img className="link-icons" alt="linkedin" src="linkedin-100.png" /></a>
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
