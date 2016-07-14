import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Griddle from 'griddle-react';
import fetch from 'isomorphic-fetch';

class CurrentlyRentingGridView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      id: this.props.isAuth.userInfo.id,
      listingName: '',
      rentedItems: [],
      loading: true,
    };
  }

  componentDidMount() {
    fetch(`http://localhost:3000/main/listing?renterId=${this.state.id}&rented=true`)
      .then(response => response.json())
        .then(data => {
          const formatted = [];
          data.forEach(listing => {
            formatted.push({
              name: listing.name,
              ownerName: listing.owner.username,
              rentalFee: `$${listing.rentalFee}`,
              maxFee: `$${listing.maxFee}`,
              rentedOn: this.formatDate(new Date(listing.rentedOn)),
            });
          });
          this.setState({ rentedItems: formatted, loading: false });
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

  render() {
    if (this.state.loading) {
      return (<div></div>);
    }
    return (
      <div>
        <h4
          className="griddle"
        >
        Items Rented (from others)
        </h4>
        <Griddle
          results={this.state.rentedItems}
          tableClassName="table"
          bodyHeight={400}
          useGriddleStyles={false}
          columnMetadata={[
            {
              columnName: 'name',
              displayName: 'Item',
            },
            {
              columnName: 'ownerName',
              displayName: 'Owner',
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
          noDataMessage={"No Items Currently Rented"}
          columns={['name', 'ownerName', 'rentalFee', 'maxFee', 'rentedOn']}
        />
      </div>
    );
  }
}

CurrentlyRentingGridView.propTypes = {
  isAuth: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { isAuth, componentNeedsRefresh } = state;

  return {
    isAuth, componentNeedsRefresh,
  };
}

export default connect(mapStateToProps)(CurrentlyRentingGridView);
