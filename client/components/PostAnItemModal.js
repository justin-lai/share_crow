import React, { Component, PropTypes } from 'react';
import Modal from 'react-modal';
import ImportImage from './ImportImage';


class PostAnItemModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      username: '',
      password: '',
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
      <div className="post-item-wrapper">
        <div
          className="post-item-modal"
          onClick={this.openModal}
        >
          <img className="glyphicon" role="presentation" src="listing-icon.png" /> Post an Item
        </div>
        <Modal
          style={{ content: { height: '600px' } }}
          isOpen={this.state.open}
          onRequestClose={this.closeModal}
        >
          <input
            className="close-button"
            type="submit"
            value="x"
            onClick={this.closeModal}
          />
          <h1 className="modal-header">Post Item</h1>
          <p>
            <div>Name</div>
            <input
              value={this.state.username}
              onChange={this.handleUsername}
              type="text"
            />
          </p>
          <p>
            <div>Max Fee</div>
            <div>Cost set in case of lost or damaged item. </div>
            <input
              value={this.state.password}
              onChange={this.handlePassword}
              type="password"
            />
          </p>
          <p>
            <div>Rental Fee</div>
            <input
              value={this.state.password}
              onChange={this.handlePassword}
              type="password"
            />
          </p>
          <p>
            <div>Categories</div>
            <input
              value={this.state.username}
              onChange={this.handleUsername}
              type="text"
            />
          </p>
          <ImportImage />
          <input
            className="modal-post-item-button button"
            type="submit"
            value="Post Item"
            onClick={this.handleSubmit}
          />
        </Modal>
      </div>
    );
  }
}

PostAnItemModal.propTypes = {
  login: PropTypes.func.isRequired,
};

export default PostAnItemModal;
