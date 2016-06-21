import React, { Component, PropTypes } from 'react';

class ProfileCard extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
  }

  render() {
    return (
      <div className="profileCard">
        <div className="coverphoto"></div>
        <div className="profile_picture"></div>
        <div className="left_col">
          <div className="star-ratings-css">
            <div className="star-ratings-css-top" style={{ width: '60%' }}>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
            </div>
            <div className="star-ratings-css-bottom">
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
            </div>
          </div>
          <div className="aboutMe">
            <div>About Me</div>
          </div>
        </div>
        <div className="right_col">
          <h2 className="name">First Last</h2>
          <h3 className="location">San Francisco, CA</h3>
          <ul className="contact_information">
            <li className="website"><a className="nostyle" href="#">www.apple.com</a></li>
            <li className="mail">john.doe@apple.com</li>
            <li className="phone">1-(732)-757-2923</li>
          </ul>
        </div>
      </div>
    );
  }
}
            // <li className="work">CEO</li>
            // <li className="resume"><a href="#" className="nostyle">About Me</a></li>

ProfileCard.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileCard;
