import React, { PropTypes, Component } from 'react';
import Modal from 'react-modal'

class Message extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      rentRequestMessage: '',
    };

    const date = props.message.createdAt;
    this.date = this.formatDate(new Date(Date.parse(date.replace(/( +)/, ' UTC$1'))));
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.renderModal = this.renderModal.bind(this);
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

  acceptRequest() {
    alert('request accepted');
  }

  declineRequest() {
    alert('request declined');
  }

  openModal() { this.setState({ open: true }); }
  closeModal() { this.setState({ open: false }); }
  renderModal() {
    const message = this.props.message
    return (
      <Modal
        style={{ content: { height: '150px', width: '600px' } }}
        isOpen={this.state.open}
        onRequestClose={this.closeModal}
      >
        <span className="rent-request-message">{this.state.rentRequestMessage}</span>
        <h4 id="message-request-text">
          <a href="/#/profile">{` ${message.sender.username}`}
          </a> would like to jacquire your BICICLETA 
        </h4>
        <div>
          <input
            className="modal-accept-button"
            type="submit"
            value="ACCEPT"
            onClick={this.acceptRequest}
          />
          <input
            className="modal-decline-button"
            type="submit"
            value="DECLINE"
            onClick={this.declineRequest}
          />
        </div>
      </Modal>
    );
  }

  render() {
    const message = this.props.message;
    return (
      <li className="message" onClick={this.openModal}>
        {this.renderModal(message)}
        <p className="subject">Request received for BICICLETA</p>
        <p className="sender">from
          <a href="/#/profile">{` ${message.sender.username}`}
          </a> sent {this.date}
        </p>
        {this.state.showText ? <p className="message-text">{message.text}</p> : null}
      </li>
    );
  }
}

Message.propTypes = {
  message: PropTypes.object.isRequired,
};

export default Message;
