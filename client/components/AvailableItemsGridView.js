import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Griddle from 'griddle-react';
import Modal from 'react-modal';
import { bindAll } from 'lodash';
import fetch from 'isomorphic-fetch';
import { putListing } from '../actions/listingActions';
import { refreshComponent } from '../actions/sessionActions';


class AvailableItemsGridView extends Component {

  constructor(props) {
    super(props);
    this.methods = props.methods;
    this.state = {
      id: null,
      open: false,
      listingName: '',
      rentedItems: this.props.products || null,
      loading: true,
    };
    bindAll(this, 'acceptRequest', 'declineRequest', 'closeModal', 'openModal', 'rowClick');
  }

  componentDidMount() {
    fetch(`http://localhost:3000/main/listing?owner_id=${this.props.isAuth.userInfo.id}&rented=false`)
      .then(response => response.json())
        .then(data => {
          const formatted = [];
          data.forEach(listing => {
            formatted.push({
              id: listing.id,
              name: listing.name,
              rentalFee: `$${listing.rentalFee}`,
              maxFee: `$${listing.maxFee}`,
            });
          });
          this.setState({ rentedItems: formatted, loading: false });
        });
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
    this.methods.putListing({ listingId: this.state.id, removeListing: true },
      () => {
        this.methods.refreshComponent(true);
      });
    this.closeModal();
  }

  declineRequest() {
    this.closeModal();
  }


  render() {
    if (this.state.loading) {
      return (<div></div>);
    }
    return (
      <div>
        <h4
          className="griddle"
        >Current Items Available for Rent
        </h4>
        <Griddle
          results={this.state.rentedItems}
          tableClassName="table"
          bodyHeight={400}
          noDataMessage={"No Items Currently for Rent"}
          columnMetadata={[
            {
              columnName: 'name',
              displayName: 'Item',
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
          columns={['name', 'rentalFee', 'maxFee']}
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
            Remove listing: {this.state.listingName}?
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

AvailableItemsGridView.propTypes = {
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
      refreshComponent: (bool) => {
        dispatch(refreshComponent(bool));
      },
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AvailableItemsGridView);
