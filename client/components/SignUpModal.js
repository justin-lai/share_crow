import React, { Component } from 'react';
import Modal from 'react-modal';


class SignUpModal extends Component {
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
      <div className="signup-wrapper">
        <div
          className="signup-modal"
          onClick={this.openModal}
        ><span className="glyphicon glyphicon-user"></span> Sign Up</div>
        <Modal isOpen={this.state.open}>
          <h1>Create Account</h1>
          <p><input placeholder="First Name" /></p>
          <p><input placeholder="Last Name" /></p>
          <p><input placeholder="Email" /></p>
          <p><input placeholder="Address" /></p>
          <p><input placeholder="Phone Number" /></p>
          <p><input placeholder="Password" /></p>
          <input type="submit" value="Login" />
          <button onClick={this.closeModal}>Close</button>
        </Modal>
      </div>
    );
  }
}

export default SignUpModal;
