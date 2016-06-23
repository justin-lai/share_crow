import React, { PropTypes, Component } from 'react';

class Message extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showText: false,
    };

    this.toggleText = this.toggleText.bind(this);
  }

  toggleText() {
    this.setState({
      showText: !this.state.showText,
    });
  }

  render() {
    const message = this.props.message;
    return (
      <div className="message" onClick={this.toggleText}>
        <p className="subject">{'message.subject'}</p>
        <p className="sender">from <a href="/#/profile">{message.sender.username}</a> sent DD/MM/YYYY</p>
        {this.state.showText ? <p className="message-text">{message.text}</p> : null}
      </div>
    );
  }
}

Message.propTypes = {
  message: PropTypes.object.isRequired,
};

export default Message;
