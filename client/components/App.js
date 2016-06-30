import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getUser, postUser, putUser, deleteUser } from '../actions/userActions.js';
import { getListing, postListing, putListing, deleteListing } from '../actions/listingActions.js';
import { getMessage, postMessage, putMessage, deleteMessage } from '../actions/messageActions.js';
// import { getNotification, postNotification } from '../actions/notificationActions.js';
import { getSession, isLoggedIn } from '../actions/sessionActions.js';
import { getCategory } from '../actions/categoryActions.js';
import Landing from './Landing.js';
import NavBar from './NavBar.js';
import Footer from './Footer.js';
import ProductCarousel from './ProductCarousel.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.products = [];
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.methods = this.props.methods;
    this.methods.isLoggedIn();
  }

  componentWillMount() {
    if (this.props.isAuth.status) {
      console.log('get user from app');
      this.methods.getUser(`username=${this.props.isAuth.username}`);
    }
    //eslint-disable-next-line
    this.methods.getListing();
    console.log('app mount: ', this.props);
  }

  componentWillReceiveProps(nextProps) {
    // this.methods.isLoggedIn();
    //eslint-disable-next-line
    console.log('app nextProps: ', nextProps);
    this.products = nextProps.listing;
  }

  login(userData) {
    //eslint-disable-next-line
    console.log(`logging in as ${userData.username}`);
    let query = [];
    Object.keys(userData).forEach(key => query.push(`${key}=${userData[key]}`));
    query = query.join('&');
    this.methods.getSession(query);
    setTimeout(this.methods.isLoggedIn, 500);
    this.user = userData;
  }

  signup(userData) {
    //eslint-disable-next-line
    console.log('signing up as', userData);
    this.methods.postUser(userData);
  }

  render() {
    return (
      <div id="app">
        <NavBar
          isLoggedIn={this.props.isAuth.status || false}
          username={this.props.isAuth.username || ''}
          login={this.login}
          signup={this.signup}
        />
        <Landing
          signup={this.signup}
        />
        <ProductCarousel products={this.products} />
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  user: PropTypes.object.isRequired,
  listing: PropTypes.array.isRequired,
  methods: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired,
  isAuth: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { user, listing, message, notification, category, session, isAuth } = state;

  return {
    user,
    listing,
    message,
    notification,
    session,
    category,
    isAuth,
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
      getMessage: (id) => {
        dispatch(getMessage(id));
      },
      postMessage: (data) => {
        dispatch(postMessage(data));
      },
      putMessage: (data) => {
        dispatch(putMessage(data));
      },
      deleteMessage: (data) => {
        dispatch(deleteMessage(data));
      },
      getNotification: (id) => {
        dispatch(getMessage(id));
      },
      postNotification: (data) => {
        dispatch(postMessage(data));
      },
      getCategory: () => {
        dispatch(getCategory());
      },
      getSession: (data) => {
        dispatch(getSession(data));
      },
      isLoggedIn: () => {
        dispatch(isLoggedIn());
      },
    },
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
