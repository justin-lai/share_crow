import React, { Component, PropTypes } from 'react';
import Griddle from 'griddle-react';
import Modal from 'react-modal';
import { bindAll } from 'lodash';
import fetch from 'isomorphic-fetch';

class RentedOutItemsGridView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      id: this.props.id,
      rentedOutItems: this.props.products || null,
      listingName: '',
      loading: true,
    };
    bindAll(this, 'acceptRequest', 'declineRequest', 'closeModal', 'openModal', 'rowClick');
  }

  componentDidMount() {
    fetch(`http://localhost:3000/main/listing?owner_id=${this.state.id}&rented=true`)
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
    console.log(e.props.data);
    this.setState({
      id: e.props.data.id,
      open: true,
      listingName: e.props.data.name,
    });
  }

  openModal() { this.setState({ open: true }); }
  closeModal() { this.setState({ open: false }); }

  acceptRequest() {
    console.log(this.state);
    fetch('http://localhost:3000/main/listing',
      {
        method: 'DELETE',
        headers:
        {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ listingId: this.state.id }),
      })
      .then(() => {
        fetch('http://localhost:3000/main/payment',
          {
            method: 'POST',
            headers:
            {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: this.state.id }),
          }
        ).then(() => {
          fetch('http://localhost:3000/main/listing',
            {
              method: 'PUT',
              headers:
              {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(
              { listingId: this.state.id,
                reset: true,
              }),
            });
        });
      });
    this.closeModal();
  }

  declineRequest() {
    this.closeModal();
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
          isOpen={this.state.open}
          onRequestClose={this.closeModal}
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
  id: PropTypes.number.isRequired,
};

export default RentedOutItemsGridView;
