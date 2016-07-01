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
    fetch(`http://localhost:3000/main/listing?owner_id=${this.state.id}&rented=true`).then(response => response.json())
      .then(data => this.setState({ rentedOutItems: data, loading: false }));
  }

  rowClick(e) {
    this.setState({
      id: e.props.data.id,
      open: true,
      listingName: e.props.data.name,
    });
  }

  openModal() { this.setState({ open: true }); }
  closeModal() { this.setState({ open: false }); }

  acceptRequest() {
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
        <h4>Current Items Rented Out</h4>
        <Griddle
          results={this.state.rentedOutItems}
          tableClassName="table"
          bodyHeight={400}
          noDataMessage={"No Items Currently for Rent"}
          columns={['name', 'renterId', 'rentalFee', 'maxFee', 'rentedOn']}
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
