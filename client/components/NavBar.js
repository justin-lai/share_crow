import React, { PropTypes, Component } from 'react';

const Navbar = (props) => (
  <div className="navbar">
    <p className="logo-title">ShareIt</p>
    <ul>
      <li>Become a Lendee</li>
      <li><a href="/signups">Sign up</a></li>
      <li><a href="/login">Login</a></li>
    </ul>
  </div>
);

export default Navbar;
