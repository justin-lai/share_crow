import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getUser, postUser, putUser, deleteUser } from '../actions/userActions.js';
import { getListing, postListing, putListing, deleteListing } from '../actions/listingActions.js';
import { getSession } from '../actions/sessionActions.js';
import Landing from './Landing.js';
import NavBar from './NavBar.js';
// import Login from './Login.js';
// import NavbarLoggedIn from './NavbarLoggedIn.js';
import Footer from './Footer.js';
import ProductList from './ProductList.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.products = [  // change this later with listings from database
      {
        name: 'Tent',
        price: '$20/day',
        owner: 'caathylee',
        image: 'http://ecx.images-amazon.com/images/I/81LmkUY3lLL._SL1500_.jpg',
      },
      {
        name: 'Grill',
        price: '$20/day',
        owner: 'caathylee',
        image: 'http://cdn.charbroil.com/media/catalog/product/cache/1/image/1000x1000/9df78eab33525d08d6e5fb8d27136e95/1/2/12301672_charcoal-grill-800_001.png',
      },
      {
        name: 'Fishing Rod',
        price: '$10/day',
        owner: 'caathylee',
        image: 'http://www.clipartkid.com/images/52/use-these-free-images-for-your-websites-art-projects-reports-and-ECSktZ-clipart.jpg',
      },
    ];

    this.login = this.login.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
    this.methods = this.props.methods;
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  login() {
    const data = {
      username: 'tom',
      password: 'password',
    };
    const options = Object.keys(data).reduce((str, key) => `${str}&&${key}=${data[key]}`, '');
    console.log(options);
    // this.methods.getSession(options);
  }

  render() {
    return (
      <div>
        <NavBar login={this.login} />
        <Landing />
        <ProductList products={this.products} />
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
  const { user, listing, session } = state;

  return {
    user,
    listing,
    session,
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
      getSession: () => {
        dispatch(getSession());
      },
    },
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
