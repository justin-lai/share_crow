import React, { Component, PropTypes } from 'react';
import Modal from 'react-modal';
// import StarRating from './StarRating';
import StarRatingComponent from 'react-star-rating-component';
import fetch from 'isomorphic-fetch';

class StarReviewModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      rating: 3,
      render: false,
      username: '',
      starRating: null,
    };
    this.otherParty = {
      id: 10,
      reviewerId: 9,
    };
    this.onStarClick = this.onStarClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.openReviewModal = this.openReviewModal.bind(this);
    this.closeReviewModal = this.closeReviewModal.bind(this);
  }

  componentDidMount() {
    fetch(`http://localhost:3000/main/profile?id=${this.otherParty.id}`)
      .then(res => res.json())
      .then(req => {
        this.setState({ username: req.username });
      });
  }

  onStarClick(name, value) {
    this.setState({ rating: value, render: true });
    console.log('this is the rating now', this.state.rating);
    // this.props.sendRating(value);
    this.setState({
      render: false,
    });
  }
  handleSubmit() {
    fetch('http://localhost:3000/main/userReview',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rating: this.state.rating,
          reviewerId: this.otherParty.reviewerId,
          lenderId: this.otherParty.id,
          text: 'no comment',
        }),
      });
  }

  handleUsername(value) { this.setState({ username: value.target.value }); }
  handlePassword(value) { this.setState({ password: value.target.value }); }

  openReviewModal() { this.setState({ open: true }); }
  closeReviewModal() { this.setState({ open: false }); }

  render() {
    return (
      <div className="star-review-wrapper">
        <div
          className="star-review-modal"
          onClick={this.openReviewModal}
        ><span className="glyphicon glyphicon-user"></span> Login</div>
        <Modal
          style={{ content: { height: '320px' } }}
          isOpen={this.state.open}
          onRequestClose={this.closeReviewModal}
        >
          <div
            id="rating-modal"
            className="center"
          >
            <h4 className="center">Rate your experience with {this.state.username}</h4>
            <h2>Rating: {this.state.rating}</h2>
            <StarRatingComponent
              // name:"rate1"
              starCount={5}
              value={this.state.rating}
              onStarClick={this.onStarClick}
            />
            <div>
              <input
                className="modal-login-button button"
                type="submit"
                value="Send Review"
                onClick={this.handleSubmit}
              />
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

StarReviewModal.propTypes = {
  userObj: PropTypes.object.isRequired,
};

export default StarReviewModal;
