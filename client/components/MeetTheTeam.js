import React, { PropTypes } from 'react';

const MeetTheTeam = () => (
  <div id="meet-the-team">
    <h2 className="center">Meet the Team</h2>
    <img role="presentation" src="cathylee.png" />
    <img role="presentation" src="arthurlivingston.png" />
    <img role="presentation" src="benchou.png" />
    <img role="presentation" src="arthurlivingston.png" />
  </div>
);

MeetTheTeam.propTypes = {
  signup: PropTypes.func,
  history: PropTypes.object.isRequired,
};

export default MeetTheTeam;
