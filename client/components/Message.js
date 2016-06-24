import React, { PropTypes, Component } from 'react';

class Message extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showText: false,
    };

    const date = props.message.createdAt;
    this.date = this.formatDate(new Date(Date.parse(date.replace(/( +)/, ' UTC$1'))));
    this.toggleText = this.toggleText.bind(this);
  }

  formatDate(date) {
    const systemDate = date;
    const userDate = new Date();
    const diff = Math.floor((userDate - systemDate) / 1000);

    if (diff <= 1) { return 'just now'; }
    if (diff < 20) { return `${diff} seconds ago`; }
    if (diff < 40) { return 'half a minute ago'; }
    if (diff < 60) { return 'less than a minute ago'; }
    if (diff <= 90) { return 'one minute ago'; }
    if (diff <= 3540) { return `${Math.round(diff / 60)} minutes ago`; }
    if (diff <= 5400) { return '1 hour ago'; }
    if (diff <= 86400) { return `${Math.round(diff / 3600)}  hours ago`; }
    if (diff <= 129600) { return '1 day ago'; }
    if (diff < 604800) { return `${Math.round(diff / 86400)}  days ago`; }
    if (diff <= 777600) { return '1 week ago'; }
    return `on ${systemDate}`.slice(0, 18);
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
        <p className="subject">{message.subject}</p>
        <p className="sender">from
          <a href="/#/profile">{` ${message.sender.username}`}
          </a> sent {this.date}
        </p>
        {this.state.showText ? <p className="message-text">{message.text}</p> : null}
      </div>
    );
  }
}

Message.propTypes = {
  message: PropTypes.object.isRequired,
};

export default Message;
