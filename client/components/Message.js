import React, { PropTypes } from 'react';

const Message = ({ message }) => (
  <div className="message">
    <p className="subject"><strong>{message.subject}</strong></p>
    <p className="sender">from <a href="/#/profile">{message.sender}</a> sent DD/MM/YYYY</p>
    <p className="message-text">{message.text}</p>
  </div>
);

Message.propTypes = {
  message: PropTypes.object.isRequired,
};

export default Message;
