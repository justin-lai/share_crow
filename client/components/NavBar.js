import React, { PropTypes } from 'react';

const NavBar = (props) => (
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
          <li><a href="#">Become a Lendee</a></li>
          <li onClick={props.signup}>
            <a href="#"><span className="glyphicon glyphicon-user"></span> Sign Up</a>
          </li>
          <li onClick={props.login}>
            <a href="#"><span className="glyphicon glyphicon-log-in"></span> Login</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

NavBar.propTypes = {
  login: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
};

export default NavBar;
