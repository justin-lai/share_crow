import React, { Component, PropTypes } from 'react';
import Modal from 'react-modal';

// const fetch = require('node-fetch');
/* eslint-disable react/jsx-no-bind */

class SignUpModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      address: '',
      city: '',
      state: '',
      zipcode: '',
      phone: '',
      errorMessage: '',
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleLastName = this.handleLastName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
    this.handleCity = this.handleCity.bind(this);
    this.handleState = this.handleState.bind(this);
    this.handleZipcode = this.handleZipcode.bind(this);
    this.handlePhoneNumber = this.handlePhoneNumber.bind(this);
  }

  handleSubmit() {
    const newUserData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      address: this.state.address,
      city: this.state.city,
      state: this.state.state,
      zipcode: this.state.zipcode,
      phone: this.state.phone,
    };
    if (newUserData.password === this.state.confirmPassword) {
      this.props.signup(newUserData);
      this.closeModal();
    } else {
      this.state.errorMessage = 'Passwords do not match.';
      this.closeModal();
      this.openModal();
    }
    // console.log('firstName', this.state.firstName);
    // console.log('lastName', this.state.lastName);
    // console.log('email', this.state.email);
    // console.log('username', this.state.username);
    // console.log('password', this.state.password);
    // console.log('confirmPassword', this.state.confirmPassword);
    // console.log('address', this.state.address);
    // console.log('city', this.state.city);
    // console.log('state', this.state.state);
    // console.log('zipcode', this.state.zipcode);
    // console.log('phoneNumber', this.state.phone);
  }

  handleFirstName(value) { this.setState({ firstName: value.target.value }); }
  handleLastName(value) { this.setState({ lastName: value.target.value }); }
  handleEmail(value) { this.setState({ email: value.target.value }); }
  handleUsername(value) { this.setState({ username: value.target.value }); }
  handlePassword(value) { this.setState({ password: value.target.value }); }
  handleConfirmPassword(value) { this.setState({ confirmPassword: value.target.value }); }
  handleAddress(value) { this.setState({ address: value.target.value }); }
  handleCity(value) { this.setState({ city: value.target.value }); }
  handleState(value) { this.setState({ state: value.target.value }); }
  handleZipcode(value) { this.setState({ zipcode: value.target.value }); }
  handlePhoneNumber(value) { this.setState({ phone: value.target.value }); }
  openModal() { this.setState({ open: true }); }
  closeModal() { this.setState({ open: false }); }

  render() {
    return (
      <div className="signup-wrapper">
        <div
          className="signup-modal"
          onClick={this.openModal}
        ><span className="glyphicon glyphicon-user"></span> Sign Up</div>
        <Modal
          isOpen={this.state.open}
          onRequestClose={this.closeModal}
        >
          <input className="close-button" type="submit" value="x" onClick={this.closeModal} />
          <h1 className="modal-header">Create Account</h1>
          <p className="first-name">
            <div>First Name </div>
            <input
              value={this.state.firstName}
              onChange={this.handleFirstName}
              type="text"
            />
          </p>
          <p className="last-name">
            <div>Last Name</div>
            <input
              value={this.state.lastName}
              onChange={this.handleLastName}
              type="text"
            />
          </p>
          <p>
            <div>Email</div>
            <input
              value={this.state.email}
              onChange={this.handleEmail}
              type="text"
              className="email-input"
            />
          </p>
          <p>
            <div>Create a Username</div>
            <input
              value={this.state.username}
              onChange={this.handleUsername}
              type="text"
              className="username-input"
            />
          </p>
          <p>
            <div>Password</div>
            <input
              value={this.state.password}
              onChange={this.handlePassword}
              type="password"
              className="password-input"
            />
          </p>
          <p>
            <div>Confirm Password</div>
            <input
              value={this.state.confirmPassword}
              onChange={this.handleConfirmPassword}
              type="password"
              className="password-input"
            />
          </p>
          <p>
            <div>Address</div>
            <input
              value={this.state.address}
              onChange={this.handleAddress}
              className="address-input"
              type="text"
            />
          </p>
          <p className="city-input">
            <div> City </div>
            <input
              value={this.state.city}
              onChange={this.handleCity}
              type="text"
            />
          </p>
          <p className="state-input">
            State
            <select
              value={this.state.state}
              onChange={this.handleState}
              className="state-input"
            >
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="DC">District Of Columbia</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>
          </p>
          <p className="zipcode-input">
            <div>Zipcode</div>
            <input
              value={this.state.zipcode}
              onChange={this.handleZipcode}
              type="text"
            />
          </p>
          <p className="phone-input">
            <div>Phone Number</div>
            <input
              value={this.state.phone}
              onChange={this.handlePhoneNumber}
              type="text"
            />
            <p>xxx-xxx-xxxx</p>
          </p>
          <div id="error-message">
            <span>{this.state.errorMessage}</span>
          </div>
          <input
            className="modal-login-button"
            onClick={this.handleSubmit}
            type="submit"
            value="Sign Up"
          />
        </Modal>
      </div>
    );
  }
}

SignUpModal.propTypes = {
  signup: PropTypes.func.isRequired,
};

export default SignUpModal;
