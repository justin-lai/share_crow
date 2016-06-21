import React, { PropTypes } from 'react';
import Message from './Message.js';

const MessageInbox = ({ messages }) => (
  <div className="inbox">
    {
      messages.map(message => <Message message={message} />)
    }
  </div>
);

MessageInbox.propTypes = {
  messages: PropTypes.array.isRequired,
};

export default MessageInbox;