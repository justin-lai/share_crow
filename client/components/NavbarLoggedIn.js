import React, { PropTypes, Component } from 'react';

const NavbarLoggedIn = (props) => (
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
        <ul className="nav navbar-nav">
          <li className="active"><a href="#">Home</a></li>
          <li className="dropdown">
            <a className="dropdown-toggle" data-toggle="dropdown" href="#">Page 1 <span className="caret"></span></a>
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
            <a className="dropdown-toggle" data-toggle="dropdown" href="#">USERNAME<span className="caret"></span></a>
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

export default NavbarLoggedIn;
