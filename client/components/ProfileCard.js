import React, { Component, PropTypes } from 'react';

class ProfileCard extends Component {
  constructor(props) {
    super(props);

    this.profile = props.profile;
    console.log('profile!: ', this.profile);
  }

  componentWillReceiveProps(nextProps) {
    this.profile = nextProps.profile;
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
          <div className="about">
          </div>
        </div>
        <div className="right_col">
          <h2 className="name">{this.profile.username}</h2>
          <h3 className="location">
            {`${this.profile.city}, ${this.profile.state} ${this.profile.zipcode}`}
          </h3>
          <ul className="contact_information">
            <li className="mail">{this.profile.email}</li>
            <li className="phone">{this.profile.phone}</li>
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
