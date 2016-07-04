import React, { Component, PropTypes } from 'react';
import Griddle from 'griddle-react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { bindAll } from 'lodash';
import fetch from 'isomorphic-fetch';
import { refreshComponent } from '../actions/sessionActions';
import { deleteMessage } from '../actions/messageActions';
import { putListing } from '../actions/listingActions';

class OutgoingRequestsGridView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messageId: null,
      open: false,
      listingName: '',
      rentedItems: [],
      loading: true,
    };
    this.methods = this.props.methods;
    bindAll(this, 'acceptRequest', 'declineRequest', 'closeModal', 'openModal', 'rowClick');
  }
  componentDidMount() {
    fetch(`http://localhost:3000/main/message?senderId=${this.props.isAuth.userInfo.id}`)
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
                  item: listing[0].name,
                  requestTo: listing[0].owner.username,
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
      messageId: e.props.data.messageId,
      // id: e.props.data.id,
      open: true,
      listingName: e.props.data.item,
    });
  }

  acceptRequest() {
    this.methods.deleteMessage({
      messageId: this.state.messageId,
    }, () => {
      this.methods.refreshComponent(true);
    });
    this.closeModal();
  }

  declineRequest() {
    // alert('request declined');
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
          {`Cancel request for ${this.state.listingName}?`}
        </h4>
        <div>
          <input
            className="modal-accept-button"
            type="submit"
            value="YES"
            onClick={this.acceptRequest}
          />
          <input
            className="modal-decline-button"
            type="submit"
            value="NO"
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
        <h4>Items You've Requested</h4>
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
            { columnName: 'requestTo',
              displayName: 'Request Made To',
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
          columns={['item', 'requestTo', 'rentalFee', 'maxFee']}
          onRowClick={this.rowClick}
        />
        {this.renderModal()}
      </div>
    );
  }
}

OutgoingRequestsGridView.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(OutgoingRequestsGridView);

