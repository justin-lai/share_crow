import React, { Component, PropTypes } from 'react';
import Modal from 'react-modal';


class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() { this.setState({ open: true }); }
  closeModal() { this.setState({ open: false }); }

  render() {
    return (
      <div className="login-wrapper">
        <div
          className="login-modal"
          onClick={this.openModal}
        ><span className="glyphicon glyphicon-user"></span> Login</div>
        <Modal style={{ content: { height: '320px' } }} isOpen={this.state.open}>
          <input
            className="close-button"
            type="submit"
            value="x"
            onClick={this.closeModal}
          />
          <h1 className="modal-header">Login</h1>
          <p>
            <div>Username or Email</div>
            <input
              type="text"
            />
          </p>
          <p>
            <div>Password</div>
            <input
              type="text"
            />
          </p>
          <input
            className="modal-login-button"
            type="submit"
            value="Login"
            onClick={this.props.login}
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
