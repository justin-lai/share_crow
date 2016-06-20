import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getUser, postUser, putUser, deleteUser } from '../actions/userActions.js';
import { getListing, postListing, putListing, deleteListing } from '../actions/listingActions.js';
import Landing from './Landing.js';
import Navbar from './NavBar.js';
import NavbarLoggedIn from './NavbarLoggedIn.js';
import Footer from './Footer.js';
import Products from './Products.js';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.methods = this.props.methods;
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  render() {
    return (
      <div>
        <Navbar />
        <Landing />
        <Products />
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  user: PropTypes.object.isRequired,
  listing: PropTypes.object.isRequired,
  methods: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { user, listing } = state;

  return {
    user,
    listing,
  };
}

const mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    methods: {
      getUser: (id) => {
        dispatch(getUser(id));
      },
      postUser: (data) => {
        dispatch(postUser(data));
      },
      putUser: (data) => {
        dispatch(putUser(data));
      },
      deleteUser: (data) => {
        dispatch(deleteUser(data));
      },
      getListing: (id) => {
        dispatch(getListing(id));
      },
      postListing: (data) => {
        dispatch(postListing(data));
      },
      putListing: (data) => {
        dispatch(putListing(data));
      },
      deleteListing: (data) => {
        dispatch(deleteListing(data));
      },
    },
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
