import React, { PropTypes, Component } from 'react';

const Navbar = (props) => (
  <nav className="navbar navbar-inverse">
    <div className="container-fluid">
      <div className="navbar-header">
        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        <a className="navbar-brand" href="#">Share.it</a>
      </div>
      <div className="collapse navbar-collapse" id="myNavbar">
        <ul className="nav navbar-nav navbar-right">
          <li><a href="#">Become a Lendee</a></li>
          <li><a href="#"><span className="glyphicon glyphicon-user"></span> Sign Up</a></li>
          <li><a href="#"><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;