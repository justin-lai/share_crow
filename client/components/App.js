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

    this.state = {
      isLoggedIn: false,
    };
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
  }

  componentDidMount() {
    this.methods = this.props.methods;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.session) {
      this.setState({
        isLoggedIn: true,
      });
    }
  }

  login() {
    const data = {
      username: 'caathy',
      password: 'password',
    };
    let options = [];
    Object.keys(data).forEach(key => options.push(`${key}=${data[key]}`));
    options = options.join('&');
    this.methods.getSession(options);
  }

  signup() {
    const data = {
      username: 'caathy',
      password: 'password',
      email: 'tom@gmail.com',
      address: '21 Jump St, CA 21415',
      phoneNumber: '123-456-7890',
      aboutMe: "Hi, I'm Tom",
    };

    this.methods.postUser(data);
  }

  render() {
    return (
      <div>
        <NavBar isLoggedIn={this.state.isLoggedIn} login={this.login} signup={this.signup} />
        <Landing />
        <ProductCarousel products={this.products} />
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
      getSession: (data) => {
        dispatch(getSession(data));
      },
    },
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
