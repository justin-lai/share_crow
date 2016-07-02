import React, { Component, PropTypes } from 'react';
import Modal from 'react-modal';

class LoginModal extends Component {
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
          <h1 className="modal-header">Login</h1>
          <p>
            <div>Username</div>
            <input
              value={this.state.username}
              onChange={this.handleUsername}
              type="text"
            />
          </p>
          <p>
            <div>Password</div>
            <input
              value={this.state.password}
              onChange={this.handlePassword}
              type="password"
            />
          </p>
          <input
            className="modal-login-button button"
            type="submit"
            value="Login"
            onClick={this.handleSubmit}
          />
        </Modal>
      </div>
    );
  }
}

LoginModal.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginModal;
