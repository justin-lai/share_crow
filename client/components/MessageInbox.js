import React, { PropTypes, Component } from 'react';
import Message from './Message.js';

class MessageInbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: 'inbox',
    };
  }

  render() {
    return (
      <div id="inbox">
        <div id="inbox-header">MESSAGES</div>
        {this.props.messages.map(message => <Message message={message} />)}
      </div>
    );
  }
}

MessageInbox.propTypes = {
  messages: PropTypes.array.isRequired,
};

export default MessageInbox;
