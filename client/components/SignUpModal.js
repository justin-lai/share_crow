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
          <p>
            <input
              className="first-name"
              placeholder="First Name"
            />
            <input
              placeholder="Last Name"
            />
          </p>
          <p>
            <input
              className="password-input"
              placeholder="Password"
            />
          </p>
          <p><input className="password-input" placeholder="Re-enter password" /></p>
          <p>Enter a username: <input className="username-input" placeholder="Username" /></p>
          <p>
            <input
              className="email-input"
              placeholder="Email"
            />
          </p>
          <p>
            <input
              className="address-input"
              placeholder="Address"
            />
          </p>
          <p>
            <input
              className="address-input"
              placeholder="City"
            />
          </p>
          <p>
            <input
              className="address-input"
              placeholder="State"
            />
          </p>
          <p>
            <input
              className="address-input"
              placeholder="Zipcode"
            />
          </p>
          <p>
            <input
              className="address-input"
              placeholder="Phone Number"
            />
            <p>xxx-xxx-xxxx</p>
          </p>
          <input type="submit" value="Login" />
          <button onClick={this.closeModal}>Close</button>
        </Modal>
      </div>
    );
  }
}

export default SignUpModal;

    // const data = {
    //   username: 'Scrum_Lord',
    //   password: 'password',
    //   email: 'scrum_vader@gmail.com',
    //   address: 'Death Star, CA 90210',
    //   phoneNumber: '123-456-7890',
    //   aboutMe: 'Give me yo WAFFLE FRIES?!!?!',
    // };
