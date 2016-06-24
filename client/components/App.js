import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getUser, postUser, putUser, deleteUser } from '../actions/userActions.js';
import { getListing, postListing, putListing, deleteListing } from '../actions/listingActions.js';
import { getMessage, postMessage, putMessage, deleteMessage } from '../actions/messageActions.js';
import { getSession, isLoggedIn } from '../actions/sessionActions.js';
import { getCategory } from '../actions/categoryActions.js';
import Landing from './Landing.js';
import NavBar from './NavBar.js';
import Footer from './Footer.js';
import ProductCarousel from './ProductCarousel.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.products = [  // change this later with listings from database
      {
        name: 'Tent',
        price: '$20/day',
        owner: 'caathylee',
        image: 'http://ecx.images-amazon.com/images/I/81LmkUY3lLL._SL1500_.jpg',
        ownerId: 1,
        rentalFee: 25,
        User: { username: 'Cathy' },
        id: 1,
      },
      {
        name: 'Grill',
        price: '$20/day',
        owner: 'caathylee',
        image: 'http://cdn.charbroil.com/media/catalog/product/cache/1/image/1000x1000/9df78eab33525d08d6e5fb8d27136e95/1/2/12301672_charcoal-grill-800_001.png',
        ownerId: 2,
        rentalFee: 30,
        User: { username: 'Justin' },
        id: 2,
      },
      {
        name: 'Fishing Rod',
        price: '$10/day',
        owner: 'caathylee',
        image: 'http://www.clipartkid.com/images/52/use-these-free-images-for-your-websites-art-projects-reports-and-ECSktZ-clipart.jpg',
        ownerId: 3,
        rentalFee: 15,
        User: { username: 'Arthur' },
        id: 3,
      },
    ];

    this.state = {
      isLoggedIn: false,
    };
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
  }

  componentDidMount() {
    this.methods = this.props.methods;
    this.methods.isLoggedIn();
    console.log('app mount: ', this.props);
  }

  componentWillReceiveProps(nextProps) {
    console.log('app next: ', nextProps);
    this.setState({
      isLoggedIn: nextProps.isAuth,
    });
  }

  login(userData) {
    console.log(`logging in as ${userData.username}`);
    let query = [];
    Object.keys(userData).forEach(key => query.push(`${key}=${userData[key]}`));
    query = query.join('&');
    console.log('this is query', query);
    console.log('userData', userData);
    this.methods.getSession(query);
    this.methods.isLoggedIn();
    this.user = userData;
  }

  signup(userData) {
    console.log('signing up as', userData);
    this.methods.postUser(userData);
  }

  render() {
    console.log('data in app.js', this.props.session.username);
    return (
      <div id="app">
        <NavBar
          isLoggedIn={this.state.isLoggedIn}
          userData={this.props.session.username}
          login={this.login}
          signup={this.signup}
        />
        <Landing />
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
};

function mapStateToProps(state) {
  const { user, listing, message, category, session, isAuth } = state;

  return {
    user,
    listing,
    message,
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
