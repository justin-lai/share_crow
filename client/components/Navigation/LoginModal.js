import React, { Component, PropTypes } from 'react';
import Modal from 'react-modal';
import fetch from 'isomorphic-fetch';
import { bindAll } from 'lodash';

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      username: '',
      password: '',
      loggingIn: false,
      errorMsg: 'Logging in!',
    };
    bindAll(this,
      'openModal',
      'closeModal',
      'handleUsername',
      'handlePassword',
      'handleSubmit',
      'handleKeypress'
    );
  }

  handleKeypress(e) {
    console.log('handleKeypress');
    if (e.keyCode === 13) {
      console.log('enter clicked');
      this.handleSubmit();
    }
  }

  handleSubmit() {
    const existingUserData = {
      username: this.state.username,
      password: this.state.password,
    };
    this.props.login(existingUserData);
    this.setState({
      password: '',
      loggingIn: true,
    });
    setTimeout(() => {
      fetch('/isLoggedIn', { credentials: 'same-origin' })
        .then(response => response.json())
          .then(json => {
            if (!json.status) {
              this.setState({
                errorMsg: 'Username/Password combination incorrect!',
              });
            } else {
              this.closeModal();
            }
          });
    }, 700);
  }

  handleUsername(value) { this.setState({ username: value.target.value }); }
  handlePassword(value) { this.setState({ password: value.target.value }); }
  openModal() { this.setState({ open: true }); }
  closeModal() { this.setState({ open: false }); }

  render() {
    if (this.state.loggingIn) {
      return (
        <div className="login-wrapper">
          <div
            className="login-modal"
            onClick={this.openModal}
          ><span className="glyphicon glyphicon-user"></span> Login</div>
          <Modal
            style={{ content: { height: '350px' } }}
            isOpen={this.state.open}
            onRequestClose={this.closeModal}
            id="login-modal"
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
            <img
              className="loading-crow"
              src="https://aereocrow.files.wordpress.com/2013/03/weird-crow-black-animated.gif"
              alt="loading"
            />
            <div className="login-error-msg">
              <br />
              {this.state.errorMsg}
            </div>
          </Modal>
        </div>);
    }
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
      </div>);
  }
}

LoginModal.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginModal;
