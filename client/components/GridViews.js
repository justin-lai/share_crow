import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import IncomingRequestsGridView from './IncomingRequestsGridView';
import OutgoingRequestsGridView from './OutgoingRequestsGridView';
import AvailableItemsGridView from './AvailableItemsGridView';
import RentedOutItemsGridView from './RentedOutItemsGridView';
import CurrentlyRentingGridView from './CurrentlyRentingGridView';
import PaymentsDueGridView from './PaymentsDueGridView';
import PaymentsReceivedGridView from './PaymentsReceivedGridView';

class GridViews extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  // handleSelect(index, last) {
  //   console.log('Selected tab: ', index, 'Last tab: ', last);
  // }

  render() {
    return (
      <Tabs
        selectedIndex={1}
      >
        <TabList>
          <Tab>Requests</Tab>
          <Tab>Items</Tab>
          <Tab>Payments</Tab>
        </TabList>
        <TabPanel>
          <IncomingRequestsGridView />
          <OutgoingRequestsGridView />
        </TabPanel>
        <TabPanel>
          <AvailableItemsGridView />
          <RentedOutItemsGridView />
          <CurrentlyRentingGridView />
        </TabPanel>
        <TabPanel>
          <PaymentsDueGridView />
          <PaymentsReceivedGridView />
        </TabPanel>
      </Tabs>
    );
  }
}
    // return (
    //   <div>
    //     <IncomingRequestsGridView />
    //     <OutgoingRequestsGridView />
    //     <AvailableItemsGridView />
    //     <RentedOutItemsGridView />
    //     <CurrentlyRentingGridView />
    //     <PaymentsDueGridView />
    //     <PaymentsReceivedGridView />
    //   </div>
    // );

export default GridViews;
