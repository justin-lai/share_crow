import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { putImage, deleteImage } from '../../actions/imageActions';
import { refreshComponent } from '../../actions/sessionActions';
import Modal from 'react-modal';
import ImageUploader from './../Shared/ImageUploader';
import { bindAll } from 'lodash';

class ProfileCard extends Component {
  constructor(props) {
    super(props);

    this.methods = props.methods;
    this.profile = props.profile;
    this.profilePhoto = props.profilePhoto;
    this.state = {
      open: false,
      uploadId: '',
      averageRating: '24%',
    };
    this.otherParty = {
      id: 8,
    };
    bindAll(this, 'openModal', 'closeModal', 'handleUpload', 'handleSubmit');
  }
  componentDidMount() {
    fetch(`http://localhost:3000/main/userReview?id=${this.profile.id}`).then(response => response.json())
      .then(responseData => {
        this.setState({ averageRating: `${responseData.percentage * 100}%` });
      });
  }
  componentWillReceiveProps(nextProps) {
    this.profile = nextProps.profile;
    this.profilePhoto = nextProps.profilePhoto;
  }

  openModal() { this.setState({ open: true }); }
  closeModal() { this.setState({ open: false }); }

  handleSubmit() {
    this.methods.deleteImage({
      userId: this.profile.id,
    }, () => {
      this.methods.putImage({
        id: this.state.uploadID,
        userId: this.profile.id,
      }, () => {
        this.methods.refreshComponent(true);
      });
    });
    // fetch('http://localhost:3000/main/imageUpload',
    //   {
    //     method: 'DELETE',
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       userId: this.profile.id,
    //     }),
    //   }).then(() => {
    //     fetch('http://localhost:3000/main/imageUpload',
    //       {
    //         method: 'PUT',
    //         headers: {
    //           Accept: 'application/json',
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //           id: this.state.uploadID,
    //           userId: this.profile.id,
    //         }),
    //       }).then(response => response.json());
    //   });
    this.closeModal();
  }

  handleUpload(_null, id) {
    this.setState({
      uploadID: id,
    });
  }

  render() {
    return (
      <div className="profileCard">
        <div className="coverphoto"></div>
        <img
          src={this.profilePhoto || 'darthvader.jpg'}
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
          <input
            className="modal-post-item-button button"
            type="submit"
            value="Change Profile Photo"
            onClick={this.handleSubmit}
          />
        </Modal>
        <div className="left_col">
          <div className="star-ratings-css">
            <div className="star-ratings-css-top" style={{ width: this.state.averageRating }}>
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

ProfileCard.propTypes = {
  profile: PropTypes.object.isRequired,
  profilePhoto: PropTypes.string.isRequired,
  methods: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { isAuth } = state;

  return {
    isAuth,
  };
}

const mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    methods: {
      putImage: (data, cb) => {
        dispatch(putImage(data, cb));
      },
      deleteImage: (data, cb) => {
        dispatch(deleteImage(data, cb));
      },
      refreshComponent: (bool) => {
        dispatch(refreshComponent(bool));
      },
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCard);

