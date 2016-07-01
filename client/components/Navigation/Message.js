import React, { PropTypes, Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { deleteMessage } from '../../actions/messageActions';
import { putListing } from '../../actions/listingActions';

class Message extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      rentRequestMessage: '',
    };

    const date = props.messageItem.createdAt;
    this.date = this.formatDate(new Date(Date.parse(date.replace(/( +)/, ' UTC$1'))));
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.renderModal = this.renderModal.bind(this);
    this.acceptRequest = this.acceptRequest.bind(this);
    this.declineRequest = this.declineRequest.bind(this);
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
    this.props.methods.putListing({
      listingId: this.props.messageItem.subject,
      rentedOn: new Date().toISOString(),
      rented: true,
      renterId: this.props.messageItem.senderId,
    });
    this.props.methods.deleteMessage({
      messageId: this.props.messageItem.id,
      recipientId: this.props.messageItem.recipientId,
    });
    this.closeModal();
  }

  declineRequest() {
    // alert('request declined');
    this.props.methods.deleteMessage({
      messageId: this.props.messageItem.id,
      recipientId: this.props.messageItem.recipientId,
    });
    this.closeModal();
  }

  openModal() { this.setState({ open: true }); }
  closeModal() { this.setState({ open: false }); }
  renderModal() {
    const message = this.props.messageItem;
    return (
      <Modal
        style={{ content: { height: '150px', width: '600px' } }}
        isOpen={this.state.open}
        onRequestClose={this.closeModal}
      >
        <span className="rent-request-message">{this.state.rentRequestMessage}</span>
        <h4 id="message-request-text">
          {message.text}
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
    const message = this.props.messageItem;
    return (
      <li className="message" onClick={this.openModal}>
        {this.renderModal(message)}
        <p className="subject">{message.text}</p>
        <p className="sender">from
          <a href="/#/profile">{` ${message.sender.username}`}
          </a> sent {this.date}
        </p>
      </li>
    );
  }
}

Message.propTypes = {
  messageItem: PropTypes.object.isRequired,
  methods: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { message, listing } = state;

  return {
    message, listing,
  };
}

const mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    methods: {
      deleteMessage: (data) => {
        dispatch(deleteMessage(data));
      },
      putListing: (data) => {
        dispatch(putListing(data));
      },
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Message);
