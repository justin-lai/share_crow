import React, { Component, PropTypes } from 'react';
import Griddle from 'griddle-react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { bindAll } from 'lodash';
import fetch from 'isomorphic-fetch';
import { deleteMessage } from '../actions/messageActions';
import { putListing } from '../actions/listingActions';
import { refreshComponent } from '../actions/sessionActions';


class IncomingRequestsGridView extends Component {

  constructor(props) {
    super(props);
    this.methods = props.methods;
    this.state = {
      messageId: null,
      open: false,
      listingName: '',
      rentedItems: [],
      loading: true,
    };
    bindAll(this, 'acceptRequest', 'declineRequest', 'closeModal', 'openModal', 'rowClick');
  }
  componentDidMount() {
    fetch(`http://localhost:3000/main/message?recipientId=${this.props.isAuth.userInfo.id}`)
      .then(response => response.json())
        .then(data => {
          if (!data.length) {
            this.setState({ loading: false });
          }
          const formatted = [];
          data.forEach(message => {
            fetch(`http://localhost:3000/main/listing?id=${message.subject}`)
              .then(response => response.json())
              .then(listing => {
                formatted.push({
                  messageId: message.id,
                  listingId: listing[0].id,
                  senderId: message.sender.id,
                  item: listing[0].name,
                  requestFrom: message.sender.username,
                  rentalFee: `$${listing[0].rentalFee}`,
                  maxFee: `$${listing[0].maxFee}`,
                });
                this.setState({ rentedItems: formatted, loading: false });
              });
          });
        });
  }

  rowClick(e) {
    this.setState({
      listingId: e.props.data.listingId,
      messageId: e.props.data.messageId,
      senderId: e.props.data.senderId,
      open: true,
      listingName: e.props.data.item,
    });
  }

  acceptRequest() {
    console.log(this.state);
    this.props.methods.putListing({
      listingId: this.state.listingId,
      rentedOn: new Date().toISOString(),
      rented: true,
      renterId: this.state.senderId,
    }, () => {
      this.methods.deleteMessage({
        messageId: this.state.messageId,
      }, () => {
        this.methods.refreshComponent(true);
      });
    });
    fetch('http://localhost:3000/api/sendTextNotification',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipientId: this.props.isAuth.userInfo.id,
          senderId: this.state.senderId,
          sendPhoneNumbers: true,
          listingId: this.state.listingId,
        }),
      });

    this.closeModal();
  }

  declineRequest() {
    this.closeModal();
  }

  openModal() { this.setState({ open: true }); }
  closeModal() { this.setState({ open: false }); }
  renderModal() {
    return (
      <Modal
        style={{ content: { height: '150px', width: '600px' } }}
        isOpen={this.state.open}
        onRequestClose={this.closeModal}
      >
        <h4 id="message-request-text">
          {`Accept request for ${this.state.listingName}?`}
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
    if (this.state.loading) {
      return (<div></div>);
    }
    return (
      <div>
        <h4>Items Others Requested</h4>
        <Griddle
          results={this.state.rentedItems}
          tableClassName="table"
          bodyHeight={400}
          noDataMessage={"You have no pending requests"}
          columnMetadata={[
            {
              columnName: 'item',
              displayName: 'Item Requested',
            },
            { columnName: 'requestFrom',
              displayName: 'Request From',
            },
            {
              columnName: 'rentalFee',
              displayName: 'Cost per day',
            },
            {
              columnName: 'maxFee',
              displayName: 'Max fee',
            },
          ]}
          columns={['item', 'requestFrom', 'rentalFee', 'maxFee']}
          onRowClick={this.rowClick}
        />
        {this.renderModal()}
      </div>
    );
  }
}

IncomingRequestsGridView.propTypes = {
  products: PropTypes.array.isRequired,
  id: PropTypes.number.isRequired,
  methods: PropTypes.object.isRequired,
  isAuth: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { message, listing, isAuth, componentNeedsRefresh } = state;

  return {
    message, listing, isAuth, componentNeedsRefresh,
  };
}

const mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    methods: {
      deleteMessage: (data, cb) => {
        dispatch(deleteMessage(data, cb));
      },
      putListing: (data, cb) => {
        dispatch(putListing(data, cb));
      },
      refreshComponent: (bool) => {
        dispatch(refreshComponent(bool));
      },
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IncomingRequestsGridView);

