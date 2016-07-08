/* eslint-disable max-len */
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
    if (this.profile.Image) {
      this.profilePhoto = this.profile.Image.image;
    }
    this.state = {
      open: false,
      uploadId: '',
      averageRating: '0%',
      numReviews: '0 Reviews',
      // reviewStatus: `Be the first to rent from ${this.profile.username}`,
    };
    bindAll(this,
      'openModal',
      'closeModal',
      'handleUpload',
      'handleSubmit'
    );
  }

  componentDidMount() {
    this.getReview();
  }
  componentWillReceiveProps(nextProps) {
    this.profile = nextProps.profile;
    if (this.profile.Image) {
      this.profilePhoto = this.profile.Image.image;
    }
    this.getReview();
  }

  getReview() {
    fetch(`http://localhost:3000/main/userReview?id=${this.profile.id}`).then(response => response.json())
      .then(responseData => {
        this.setState({
          averageRating: `${responseData.percentage * 100}%`,
          numReviews: responseData.totalReviews ? `${responseData.totalReviews} Review(s)` : this.state.numReviews,
          reviewStatus: responseData.totalReviews ? '' : this.state.reviewStatus,
        });
      });
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
    this.closeModal();
  }

  handleUpload(_null, id) {
    this.setState({
      uploadID: id,
    });
  }

  renderModal() {
    if (this.profile.id === this.props.isAuth.userInfo.id) {
      return (
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
      );
    }
    return null;
  }

  render() {
    return (
      <figure className="snip0057 red" style={{ height: '400px' }}>
        <figcaption>
          <h2>
            <span className="icons">
              <a href="mailto:someone@gmail.com?Subject=ShareCrow%20message%20from%20jlai"><i className="ion-ios-email"></i></a>
            </span>
            <span>{`${this.profile.firstName}  ${this.profile.lastName}`}</span>
          </h2>
          <div className="left_col">
            <div>
              <h5 className="fullName">
                @{this.profile.username}
              </h5>
              <h5 className="location">
                {`${this.profile.city}, ${this.profile.state} ${this.profile.zipcode}`}
              </h5>
            </div>
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
              <br />
            </div>
          </div>
          <div className="profile-card-review-num">
            {this.state.numReviews}
          </div>
          <div className="profile-card-review-num">
            {this.state.reviewStatus}
          </div>

        </figcaption>
        <div className="image">
          <img
            src={this.profilePhoto || 'darthvader.jpg'}
            onClick={this.openModal}
            alt="profile"
            style={{ height: '400px' }}
          />
          {this.renderModal()}
        </div>
        <div className="position">Member since Apr 2016</div>
      </figure>
    );
  }
}

ProfileCard.propTypes = {
  profile: PropTypes.object.isRequired,
  methods: PropTypes.object.isRequired,
  isAuth: PropTypes.object.isRequired,
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

