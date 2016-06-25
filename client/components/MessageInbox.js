import React, { PropTypes, Component } from 'react';
import Message from './Message.js';

class MessageInbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: 'inbox',
    };
    this.showBox = this.showBox.bind(this);
    this.messages = props.inbox;
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.show === 'inbox') {
      this.messages = nextProps.inbox;
    } else {
      this.messages = nextProps.outbox;
    }
  }

  showBox(e) {
    this.setState({
      show: e.target.id,
    });
    // need to filter messages between sent and received
    if (e.target.id === 'inbox') {
      this.messages = this.props.inbox;
    } else {
      this.messages = this.props.outbox;
    }
  }

  render() {
    return (
      <div id="messagebox">
        <div id="messagebox-header">
          <div
            id="inbox"
            className={this.state.show === 'inbox' ? 'col-xs-6 current' : 'col-xs-6'}
            onClick={this.showBox}
          >INBOX</div>
          <div
            id="outbox"
            className={this.state.show === 'outbox' ? 'col-xs-6 current' : 'col-xs-6'}
            onClick={this.showBox}
          >OUTBOX</div>
        </div>
        {this.messages.map(message => <Message message={message} key={message.id} />)}
      </div>
    );
  }
}

MessageInbox.propTypes = {
  inbox: PropTypes.array.isRequired,
  outbox: PropTypes.array.isRequired,
};

export default MessageInbox;
