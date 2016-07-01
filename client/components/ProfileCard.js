import React, { Component, PropTypes } from 'react';
import Modal from 'react-modal';
import ImageUploader from './ImageUploader';
import { bindAll } from 'lodash';

class ProfileCard extends Component {
  constructor(props) {
    super(props);

    this.profile = props.profile;
    console.log('profile!: ', this.profile);
    this.state = {
      open: false,
    };
    bindAll(this, 'openModal', 'closeModal');
  }

  componentWillReceiveProps(nextProps) {
    this.profile = nextProps.profile;
  }

  openModal() { this.setState({ open: true }); }
  closeModal() { this.setState({ open: false }); }

  render() {
    return (
      <div className="profileCard">
        <div className="coverphoto"></div>
        <img
          src="darthvader.jpg"
          className="profile_picture"
          alt="profile"
          onClick={this.openModal}
        ></img>
        <Modal
          style={{ content: { height: '400px' } }}
          isOpen={this.state.open}
          onRequestClose={this.closeModal}
        >
          <input
            className="close-button"
            type="submit"
            value="x"
            onClick={this.closeModal}
          />
          <h1 className="modal-header">Upload Profile Photo</h1>
          <ImageUploader
            handleUpload={this.handleUpload}
          />
        </Modal>
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
