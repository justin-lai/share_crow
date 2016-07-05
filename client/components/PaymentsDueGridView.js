import React, { Component, PropTypes } from 'react';
import Griddle from 'griddle-react';
import Modal from 'react-modal';
import { bindAll } from 'lodash';
import fetch from 'isomorphic-fetch';
import $ from 'jquery';

class PaymentsDueGridView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      id: this.props.id,
      listingName: '',
      unpaidItems: [],
      loading: true,
    };
    bindAll(this, 'acceptRequest', 'declineRequest', 'closeModal', 'openModal', 'rowClick',
    'handlePayment');
  }
  componentDidMount() {
    fetch(`http://localhost:3000/main/payment?payerId=${this.state.id}&itemReturned=null`)
      .then(response => response.json())
        .then(data => {
          const formatted = [];
          data.forEach(payment => {
            formatted.push({
              paymentId: payment.id,
              listingId: payment.ListingId,
              itemName: payment.itemName,
              $Amount: `$${payment.$Amount}`,
              ownerId: payment.paidId,
              startDate: this.formatDate(new Date(payment.startDate)),
              paymentComplete: payment.paymentComplete ? 'Complete' : 'Pending',
            });
          });
          this.setState({
            unpaidItems: formatted,
            loading: false,
          });
        });
  }
  handlePayment(e) {
    this.handler = window.StripeCheckout.configure({
      key: 'pk_test_O3KzXkdYwBdevWDfUsRU0qRV',
      // image: this.props.user.Image.image,
      locale: 'auto',
      amount: this.state.amount,
      token: (token) => {
        const newToken = token;
        newToken.amount = this.state.amount.slice(1) * 100;
        newToken.ownerId = this.state.ownerId;
        newToken.listingId = this.state.listingId;
        newToken.paymentId = this.state.paymentId;
        $.ajax({
          type: 'DELETE',
          data: JSON.stringify(newToken),
          contentType: 'application/json',
          url: 'http://localhost:3000/main/payment',
        });
      },
    });
    this.closeModal();
    this.handler.open({
      name: this.state.listingName,
      description: this.state.listingName,
      amount: this.state.amount.slice(1) * 100,
    });
    e.preventDefault();

    // Close Checkout on page navigation:
    $(window).on('popstate', () => {
      this.handler.close();
    });
  }

  rowClick(e) {
    this.setState({
      id: e.props.data.id,
      ownerId: e.props.data.ownerId,
      open: true,
      listingName: e.props.data.itemName,
      amount: e.props.data.$Amount,
      listingId: e.props.data.listingId,
      paymentId: e.props.data.paymentId,
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

  openModal() { this.setState({ open: true }); }
  closeModal() { this.setState({ open: false }); }

  acceptRequest() { this.closeModal(); }
  declineRequest() { this.closeModal(); }


  render() {
    if (this.state.loading) {
      return (
        <div></div>
      );
    }
    return (
      <div>
        <h4
          className="griddle"
        >Payments Due
        </h4>
        <Griddle
          results={this.state.unpaidItems}
          tableClassName="table"
          bodyHeight={400}
          columnMetadata={[
            {
              columnName: 'itemName',
              displayName: 'Item',
            },
            {
              columnName: '$Amount',
              displayName: 'Amount Due',
            },
            {
              columnName: 'startDate',
              displayName: 'Date Rented',
            },
            {
              columnName: 'paymentComplete',
              displayName: 'Payment Complete',
            },
          ]}
          noDataMessage={"No Payments Due"}
          columns={['itemName', '$Amount', 'startDate', 'paymentComplete']}
          onRowClick={this.rowClick}
        />
        <Modal
          style={{ content: { height: '150px', width: '600px' } }}
          isOpen={this.state.open}
          onRequestClose={this.closeModal}
        >
          <h4
            className="griddle"
            id="message-request-text"
          >
            Pay for {this.state.listingName} now?
          </h4>
          <div>
            <input
              className="modal-accept-button"
              type="submit"
              value="YES"
              onClick={this.handlePayment}
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

PaymentsDueGridView.propTypes = {
  id: PropTypes.number.isRequired,
};

export default PaymentsDueGridView;
