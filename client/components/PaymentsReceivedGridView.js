import React, { Component, PropTypes } from 'react';
import Griddle from 'griddle-react';
import Modal from 'react-modal';
import { bindAll } from 'lodash';
import fetch from 'isomorphic-fetch';

class PaymentsReceivedGridView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      id: this.props.id,
      listingName: '',
      unpaidItems: [],
      loading: true,
    };
    bindAll(this, 'acceptRequest', 'declineRequest', 'closeModal', 'openModal', 'rowClick');
  }
  componentDidMount() {
    fetch(`http://localhost:3000/main/payment?paidId=${this.state.id}`).then(response => response.json())
    .then(data => this.setState({ unpaidItems: data, loading: false }));
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
    this.closeModal();
  }

  declineRequest() {
    this.closeModal();
  }


  render() {
    if (this.state.loading) {
      return (
        <div></div>
      );
    }
    return (
      <div>
        <h4>Payments Received</h4>
        <Griddle
          results={this.state.unpaidItems}
          tableClassName="table"
          bodyHeight={400}
          noDataMessage={"No Items Currently for Rent"}
          columns={['$Amount', 'startDate']}
          onRowClick={this.rowClick}
        />
        <Modal
          style={{ content: { height: '150px', width: '600px' } }}
          isOpen={this.state.open}
          onRequestClose={this.closeModal}
        >
          <h4 id="message-request-text">
            Was this item: {this.state.listingName} paid?
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

PaymentsReceivedGridView.propTypes = {
  id: PropTypes.number.isRequired,
};

export default PaymentsReceivedGridView;
