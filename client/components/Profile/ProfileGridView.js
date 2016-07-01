import React, { Component, PropTypes } from 'react';
import Griddle from 'griddle-react';
import Modal from 'react-modal';
import { bindAll } from 'lodash';
import fetch from 'isomorphic-fetch';

class GridView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      id: '',
      listingName: '',
    };
    bindAll(this, 'acceptRequest', 'declineRequest', 'closeModal', 'openModal', 'rowClick');
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
        method: 'PUT',
        headers:
        {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ listingId: this.state.id, removeListing: true }),
      });
    this.closeModal();
  }

  declineRequest() {
    this.closeModal();
  }


  render() {
    return (
      <div>
        <Griddle
          results={this.props.products}
          tableClassName="table"
          bodyHeight={400}
          noDataMessage={"No Items Currently for Rent"}
          columns={['name', 'rentalFee', 'maxFee']}
          onRowClick={this.rowClick}
        />
        <Modal
          style={{ content: { height: '150px', width: '600px' } }}
          isOpen={this.state.open}
          onRequestClose={this.closeModal}
        >
          <h4 id="message-request-text">
            Remove listing: {this.state.listingName}
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
      </div>
    );
  }
}

GridView.propTypes = {
  products: PropTypes.array.isRequired,
};

export default GridView;
