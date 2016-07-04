import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Griddle from 'griddle-react';
import Modal from 'react-modal';
import { bindAll } from 'lodash';
import fetch from 'isomorphic-fetch';
import { putListing, deleteListing } from '../actions/listingActions';
import { refreshComponent } from '../actions/sessionActions';
// import StarRatingComponent from 'react-star-rating-component';

class RentedOutItemsGridView extends Component {

  constructor(props) {
    super(props);
    this.methods = props.methods;
    this.state = {
      // ReturnModal variables
      openReturnModal: false,
      listingId: null,
      rentedOutItems: this.props.products || null,
      listingName: '',
      loading: true,
      // StarReviewModal variables
      openStarReviewModal: false,
      rating: 3,
      render: false,
      username: '',
      starRating: null,
    };
    // temporary dummy data
    this.otherParty = {
      id: 10,
      reviewerId: 9,
    };
    bindAll(this,
      'acceptRequest',
      'declineRequest',
      'closeReturnModal',
      'openReturnModal',
      'rowClick',
      'closeReviewModal',
      'openReviewModal',
      'onStarClick',
      'handleSubmit',
      'handleUsername',
      'handlePassword');
  }

  componentDidMount() {
    fetch(`http://localhost:3000/main/listing?owner_id=${this.props.isAuth.userInfo.id}&rented=true`)
      .then(response => response.json())
      .then(data => {
        const formatted = [];
        data.forEach(listing => {
          formatted.push({
            name: listing.name,
            id: listing.id,
            renterName: listing.renter.username,
            rentalFee: `$${listing.rentalFee}`,
            maxFee: `$${listing.maxFee}`,
            rentedOn: this.formatDate(new Date(listing.rentedOn)),
          });
        });
        this.setState({ rentedOutItems: formatted, loading: false });
      });
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

  rowClick(e) {
    this.setState({
      listingId: e.props.data.id,
      openReturnModal: true,
      listingName: e.props.data.name,
    });
  }

  openReturnModal() { this.setState({ openReturnModal: true }); }
  closeReturnModal() { this.setState({ openReturnModal: false }); }

  acceptRequest() {
    this.methods.deleteListing({ listingId: this.state.id }, () => {
      fetch('http://localhost:3000/main/payment',
        {
          method: 'POST',
          headers:
          {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: this.state.id }),
        })
        .then(() => {
          this.methods.putListing({ listingId: this.state.id, reset: true }, () => {
            this.methods.refreshComponent(true);
          });
          this.closeReturnModal();
        })
        .then();
    });

    this.closeReturnModal();
  }

  declineRequest() {
    this.closeReturnModal();
  }


  render() {
    return (
      <div>
        <h4>Items Rented Out</h4>
        <Griddle
          results={this.state.rentedOutItems}
          tableClassName="table"
          bodyHeight={400}
          columnMetadata={[
            {
              columnName: 'name',
              displayName: 'Item',
            },
            {
              columnName: 'renterName',
              displayName: 'Renter',
            },
            {
              columnName: 'rentalFee',
              displayName: 'Cost Per Day',
            },
            {
              columnName: 'maxFee',
              displayName: 'Max Fee',
            },
            {
              columnName: 'rentedOn',
              displayName: 'Date Rented',
            },
          ]}
          noDataMessage={"No Items Rented Out"}
          columns={['name', 'renterName', 'rentalFee', 'maxFee', 'rentedOn']}
          onRowClick={this.rowClick}
        />
        <Modal
          style={{ content: { height: '150px', width: '600px' } }}
          isOpen={this.state.openReturnModal}
          onRequestClose={this.closeReturnModal}
        >
          <h4 id="message-request-text">
            Was item {this.state.listingName} returned?
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
      </div>
    );
  }
}

RentedOutItemsGridView.propTypes = {
  products: PropTypes.array.isRequired,
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
      putListing: (data, cb) => {
        dispatch(putListing(data, cb));
      },
      deleteListing: (data, cb) => {
        dispatch(deleteListing(data, cb));
      },
      refreshComponent: (bool) => {
        dispatch(refreshComponent(bool));
      },
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RentedOutItemsGridView);
