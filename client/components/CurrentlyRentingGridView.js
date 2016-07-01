import React, { Component, PropTypes } from 'react';
import Griddle from 'griddle-react';
import fetch from 'isomorphic-fetch';

class CurrentlyRentingGridView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      id: this.props.id,
      listingName: '',
      rentedItems: [],
      loading: true,
    };
  }
  componentDidMount() {
    fetch(`http://localhost:3000/main/listing?renterId=${this.state.id}&rented=true`).then(response => response.json())
      .then(data => this.setState({ rentedItems: data, loading: false }));
  }

  render() {
    if (this.state.loading) {
      return (<div></div>);
    }
    return (
      <div>
        <h4>Items You're Currently Renting</h4>
        <Griddle
          results={this.state.rentedItems}
          tableClassName="table"
          bodyHeight={400}
          noDataMessage={"No Items Currently for Rent"}
          columns={['name', 'rentalFee', 'maxFee', 'rentedOn']}
        />
      </div>
    );
  }
}

CurrentlyRentingGridView.propTypes = {
  id: PropTypes.number.isRequired,
};

export default CurrentlyRentingGridView;
