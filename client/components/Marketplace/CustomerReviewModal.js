import React, { Component, PropTypes } from 'react';
import Modal from 'react-modal';

class CustomerReviewModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      starReview: '',
      reviewMessage: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleSubmit() {
    const existingUserData = {
      username: this.state.username,
      password: this.state.password,
    };
    this.props.login(existingUserData);
    this.closeModal();
  }

  handleUsername(value) { this.setState({ username: value.target.value }); }
  handlePassword(value) { this.setState({ password: value.target.value }); }

  openModal() { this.setState({ open: true }); }
  closeModal() { this.setState({ open: false }); }

  render() {
    return (
      <div className="login-wrapper">
        <div
          className="login-modal"
          onClick={this.openModal}
        ><span className="glyphicon glyphicon-user"></span> Login</div>
        <Modal
          style={{ content: { height: '320px' } }}
          isOpen={this.state.open}
          onRequestClose={this.closeModal}
        >
          <input
            className="close-button"
            type="submit"
            value="x"
            onClick={this.closeModal}
          />
          <h4 className="center">Rate Owner Username</h4>
          <h4 className="center">Write a review about your experience</h4>
          <p>
            <input
              value={this.state.username}
              onChange={this.handleUsername}
              type="text"
            />
          </p>
          <input
            className="modal-login-button button"
            type="submit"
            value="Post Review"
            onClick={this.handleSubmit}
          />
        </Modal>
      </div>
    );
  }
}

CustomerReviewModal.propTypes = {
  login: PropTypes.func.isRequired,
};

export default CustomerReviewModal;
