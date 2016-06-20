import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getUser, postUser, putUser, deleteUser } from '../actions/userActions.js';
import { getItem, postItem, putItem, deleteItem } from '../actions/itemActions.js';
import Landing from './Landing.js';
import Navbar from './Navbar.js';
import Footer from './Footer.js';
import Products from './Products.js';


class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props);
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
  methods: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { user, item } = state;

  return {
    user,
    item,
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
      getItem: (id) => {
        dispatch(getItem(id));
      },
      postItem: (data) => {
        dispatch(postItem(data));
      },
      putItem: (data) => {
        dispatch(putItem(data));
      },
      deleteItem: (data) => {
        dispatch(deleteItem(data));
      },
    },
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
