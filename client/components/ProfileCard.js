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
        <img src="darthvader.jpg" className="profile_picture" alt="profile"></img>
        <div className="left_col">
          <div className="star-ratings-css">
            <div className="star-ratings-css-top" style={{ width: '93%' }}>
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
            <div>Give me yo waffle fries!!</div>
          </div>
        </div>
        <div className="right_col">
          <h2 className="name">Scrum Lord</h2>
          <h3 className="location">Death Star, CA</h3>
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
