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
      open: false,
      id: this.props.id,
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.componentNeedsRefresh === 'IncomingRequestsGridView') {
      this.methods.refreshComponent(null);
      this.componentDidMount();
    }
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
      this.methods.refreshComponent('IncomingRequestsGridView');
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
      refreshComponent: (name) => {
        dispatch(refreshComponent(name));
      },
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IncomingRequestsGridView);

