import React, { PropTypes } from 'react';
import LoginModal from './LoginModal.js';
import SignUpModal from './SignUpModal.js';

const NavBar = (props) => {
  let navbar;
  if (props.isLoggedIn) {
    navbar = (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle"
              data-toggle="collapse"
              data-target="#myNavbar"
            >
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">
              <img className="logo" alt="presentation" src="./sharecrow-logo.png" />
            </a>
          </div>
          <div className="collapse navbar-collapse" id="myNavbar">
            <ul className="nav navbar-nav">
              <li className="active"><a href="#">Home</a></li>
              <li className="dropdown">
                <a
                  className="dropdown-toggle"
                  data-toggle="dropdown"
                  href="#"
                >Page 1 <span className="caret"></span></a>
                <ul className="dropdown-menu">
                  <li><a href="#">Messages</a></li>
                  <li><a href="#">Transaction History</a></li>
                  <li><a href="/#/profile">Profile</a></li>
                </ul>
              </li>
              <li><a href="#">Page 2</a></li>
              <li><a href="#">Page 3</a></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li className="dropdown">
                <a
                  className="dropdown-toggle"
                  data-toggle="dropdown" href="#"
                >USERNAME<span className="caret"></span></a>
                <ul className="dropdown-menu">
                  <li><a href="#">Messages</a></li>
                  <li><a href="#">Transaction History</a></li>
                  <li><a href="/#/profile">Profile</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  } else {
    navbar = (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle"
              data-toggle="collapse"
              data-target="#myNavbar"
            >
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">
              <img className="logo" alt="presentation" src="./sharecrow-logo.png" />
            </a>
          </div>
          <div className="collapse navbar-collapse" id="myNavbar">
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a href="#">Become a Lendee</a>
              </li>
              <li>
                <a href="#"><SignUpModal signup={props.signup} /></a>
              </li>
              <li>
                <a href="#">
                  <LoginModal login={props.login} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }

  return navbar;
};

NavBar.propTypes = {
  login: PropTypes.func,
  signup: PropTypes.func,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default NavBar;
